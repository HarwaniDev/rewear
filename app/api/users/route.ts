import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateSwapStatusSchema } from "@/lib/validations/swap"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const swapId = params.id

    const swap = await prisma.swap.findUnique({
      where: { id: swapId },
      include: {
        requester: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        requestedItem: {
          include: {
            images: {
              orderBy: { sortOrder: "asc" },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    if (!swap) {
      return NextResponse.json({ error: "Swap not found" }, { status: 404 })
    }

    // Check if user is involved in the swap
    const isParticipant = swap.requesterId === session.user.id || swap.receiverId === session.user.id

    if (!isParticipant) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(swap)
  } catch (error) {
    console.error("Error fetching swap:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const swapId = params.id
    const body = await request.json()
    const { status } = updateSwapStatusSchema.parse(body)

    const existingSwap = await prisma.swap.findUnique({
      where: { id: swapId },
      include: {
        requestedItem: {
          select: {
            id: true,
            title: true,
            pointValue: true,
          },
        },
        requester: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          },
        },
        receiver: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    if (!existingSwap) {
      return NextResponse.json({ error: "Swap not found" }, { status: 404 })
    }

    // Check permissions based on status change
    const isRequester = existingSwap.requesterId === session.user.id
    const isReceiver = existingSwap.receiverId === session.user.id

    if (status === "ACCEPTED" && !isReceiver) {
      return NextResponse.json({ error: "Only the receiver can accept a swap" }, { status: 403 })
    }

    if (status === "REJECTED" && !isReceiver) {
      return NextResponse.json({ error: "Only the receiver can reject a swap" }, { status: 403 })
    }

    if (status === "CANCELLED" && !isRequester && !isReceiver) {
      return NextResponse.json({ error: "Only participants can cancel a swap" }, { status: 403 })
    }

    const updateData: any = { status }

    if (status === "ACCEPTED") {
      updateData.acceptedAt = new Date()
    } else if (status === "COMPLETED") {
      updateData.completedAt = new Date()
    } else if (status === "CANCELLED") {
      updateData.cancelledAt = new Date()
    }

    // Handle point-based swap completion
    if (status === "COMPLETED" && existingSwap.pointsUsed) {
      await prisma.$transaction(async (tx: any) => {
        // Deduct points from requester
        await tx.pointTransaction.create({
          data: {
            userId: existingSwap.requesterId,
            type: "SPENT_REDEMPTION",
            amount: -existingSwap.pointsUsed!,
            balance: 0, // Will be calculated
            description: `Points spent on "${existingSwap.requestedItem.title}"`,
            swapId: existingSwap.id,
          },
        })

        await tx.user.update({
          where: { id: existingSwap.requesterId },
          data: {
            pointsBalance: { decrement: existingSwap.pointsUsed! },
          },
        })

        // Award points to receiver
        await tx.pointTransaction.create({
          data: {
            userId: existingSwap.receiverId,
            type: "EARNED_SWAP",
            amount: existingSwap.pointsUsed!,
            balance: 0, // Will be calculated
            description: `Points earned from swap of "${existingSwap.requestedItem.title}"`,
            swapId: existingSwap.id,
          },
        })

        await tx.user.update({
          where: { id: existingSwap.receiverId },
          data: {
            pointsBalance: { increment: existingSwap.pointsUsed! },
            totalPointsEarned: { increment: existingSwap.pointsUsed! },
          },
        })

        // Mark item as swapped
        await tx.item.update({
          where: { id: existingSwap.requestedItemId },
          data: {
            status: "SWAPPED",
            isAvailable: false,
          },
        })
      })
    }

    const swap = await prisma.swap.update({
      where: { id: swapId },
      data: updateData,
      include: {
        requester: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          },
        },
        receiver: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          },
        },
        requestedItem: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    // Create notification based on status
    let notificationData: any = null

    if (status === "ACCEPTED") {
      notificationData = {
        userId: existingSwap.requesterId,
        type: "SWAP_ACCEPTED",
        title: "Swap Accepted",
        message: `${existingSwap.receiver.displayName || existingSwap.receiver.firstName} accepted your swap request`,
        data: { swapId: swap.id },
      }
    } else if (status === "COMPLETED") {
      // Notify both parties
      await prisma.notification.createMany({
        data: [
          {
            userId: existingSwap.requesterId,
            type: "SWAP_COMPLETED",
            title: "Swap Completed",
            message: `Your swap for "${existingSwap.requestedItem.title}" has been completed`,
            data: { swapId: swap.id },
          },
          {
            userId: existingSwap.receiverId,
            type: "SWAP_COMPLETED",
            title: "Swap Completed",
            message: `Your swap for "${existingSwap.requestedItem.title}" has been completed`,
            data: { swapId: swap.id },
          },
        ],
      })
    }

    if (notificationData) {
      await prisma.notification.create({ data: notificationData })
    }

    return NextResponse.json(swap)
  } catch (error) {
    console.error("Error updating swap:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
