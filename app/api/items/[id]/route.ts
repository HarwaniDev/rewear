import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateItemSchema } from "@/lib/validations/item"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        owner: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        images: {
          orderBy: { sortOrder: "asc" },
        },
        _count: {
          select: {
            swaps: true,
          },
        },
      },
    })

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const itemId = params.id
    const body = await request.json()
    const validatedData = updateItemSchema.parse(body)

    // Check if user owns the item or is admin
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
      select: { ownerId: true },
    })

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    const isOwner = existingItem.ownerId === session.user.id
    const isAdmin = session.user.role === "ADMIN"

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const item = await prisma.item.update({
      where: { id: itemId },
      data: validatedData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        owner: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          },
        },
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error updating item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const itemId = params.id

    // Check if user owns the item or is admin
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
      select: { ownerId: true, status: true },
    })

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    const isOwner = existingItem.ownerId === session.user.id
    const isAdmin = session.user.role === "ADMIN"

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Soft delete by updating status
    await prisma.item.update({
      where: { id: itemId },
      data: {
        status: "REMOVED",
        isAvailable: false,
      },
    })

    return NextResponse.json({ message: "Item removed successfully" })
  } catch (error) {
    console.error("Error deleting item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
