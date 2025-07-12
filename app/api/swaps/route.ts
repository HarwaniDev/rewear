import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createSwapSchema } from "@/lib/validations/swap"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // 'sent' or 'received'
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const where: any = {}

    if (type === "sent") {
      where.requesterId = session.user.id
    } else if (type === "received") {
      where.receiverId = session.user.id
    } else {
      where.OR = [{ requesterId: session.user.id }, { receiverId: session.user.id }]
    }

    if (status) {
      where.status = status
    }

    const [swaps, total] = await Promise.all([
      prisma.swap.findMany({
        where,
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
                where: { isPrimary: true },
                take: 1,
              },
            },
          },
          _count: {
            select: {
              messages: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.swap.count({ where }),
    ])

    return NextResponse.json({
      swaps,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching swaps:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createSwapSchema.parse(body)

    // Verify requested item exists and is available
    const requestedItem = await prisma.item.findUnique({
      where: { id: validatedData.requestedItemId },
      select: {
        id: true,
        ownerId: true,
        status: true,
        isAvailable: true,
        pointValue: true,
      },
    })

    if (!requestedItem) {
      return NextResponse.json({ error: "Requested item not found" }, { status: 404 })
    }

    if (requestedItem.status !== "APPROVED" || !requestedItem.isAvailable) {
      return NextResponse.json({ error: "Item is not available for swap" }, { status: 400 })
    }

    if (requestedItem.ownerId === session.user.id) {
      return NextResponse.json({ error: "Cannot swap your own item" }, { status: 400 })
    }

    // If using points, verify user has enough points and item allows point redemption
    if (validatedData.pointsUsed) {
      if (!requestedItem.pointValue) {
        return NextResponse.json({ error: "Item is not available for point redemption" }, { status: 400 })
      }

      if (validatedData.pointsUsed !== requestedItem.pointValue) {
        return NextResponse.json({ error: "Invalid point amount" }, { status: 400 })
      }

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { pointsBalance: true },
      })

      if (!user || user.pointsBalance < validatedData.pointsUsed) {
        return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
      }
    }

    // If offering an item, verify it exists and belongs to the user
    if (validatedData.offeredItemId) {
      const offeredItem = await prisma.item.findUnique({
        where: { id: validatedData.offeredItemId },
        select: {
          id: true,
          ownerId: true,
          status: true,
          isAvailable: true,
        },
      })

      if (!offeredItem) {
        return NextResponse.json({ error: "Offered item not found" }, { status: 404 })
      }

      if (offeredItem.ownerId !== session.user.id) {
        return NextResponse.json({ error: "You can only offer your own items" }, { status: 403 })
      }

      if (offeredItem.status !== "APPROVED" || !offeredItem.isAvailable) {
        return NextResponse.json({ error: "Offered item is not available" }, { status: 400 })
      }
    }

    const swap = await prisma.swap.create({
      data: {
        requesterId: session.user.id,
        receiverId: requestedItem.ownerId,
        requestedItemId: validatedData.requestedItemId,
        offeredItemId: validatedData.offeredItemId,
        message: validatedData.message,
        pointsUsed: validatedData.pointsUsed,
      },
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

    // Create notification for the receiver
    await prisma.notification.create({
      data: {
        userId: requestedItem.ownerId,
        type: "SWAP_REQUEST",
        title: "New Swap Request",
        message: `${swap.requester.displayName || swap.requester.firstName} wants to swap for your item "${swap.requestedItem.title}"`,
        data: { swapId: swap.id },
      },
    })

    return NextResponse.json(swap, { status: 201 })
  } catch (error) {
    console.error("Error creating swap:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
