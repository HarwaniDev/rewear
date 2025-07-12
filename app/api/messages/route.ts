import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createMessageSchema = z.object({
  swapId: z.string().cuid(),
  content: z.string().min(1).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { swapId, content } = createMessageSchema.parse(body)

    // Verify swap exists and user is a participant
    const swap = await prisma.swap.findUnique({
      where: { id: swapId },
      select: {
        id: true,
        requesterId: true,
        receiverId: true,
      },
    })

    if (!swap) {
      return NextResponse.json({ error: "Swap not found" }, { status: 404 })
    }

    const isParticipant = swap.requesterId === session.user.id || swap.receiverId === session.user.id

    if (!isParticipant) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const receiverId = swap.requesterId === session.user.id ? swap.receiverId : swap.requesterId

    const message = await prisma.message.create({
      data: {
        swapId,
        senderId: session.user.id,
        receiverId,
        content,
      },
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
    })

    // Create notification for the receiver
    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: "MESSAGE_RECEIVED",
        title: "New Message",
        message: `${message.sender.displayName || message.sender.firstName} sent you a message`,
        data: { swapId, messageId: message.id },
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
