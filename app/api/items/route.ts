import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createItemSchema, itemQuerySchema } from "@/lib/validations/item"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = itemQuerySchema.parse(Object.fromEntries(searchParams))

    const where: any = {
      status: "APPROVED",
      isAvailable: true,
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId
    }

    if (query.condition) {
      where.condition = query.condition
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
        { brand: { contains: query.search, mode: "insensitive" } },
        { tags: { has: query.search } },
      ]
    }

    if (query.minPoints || query.maxPoints) {
      where.pointValue = {}
      if (query.minPoints) where.pointValue.gte = query.minPoints
      if (query.maxPoints) where.pointValue.lte = query.maxPoints
    }

    const orderBy: any = {}
    orderBy[query.sortBy] = query.sortOrder

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
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
            take: 1,
          },
          _count: {
            select: {
              swaps: true,
            },
          },
        },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy,
      }),
      prisma.item.count({ where }),
    ])

    return NextResponse.json({
      items,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit),
      },
    })
  } catch (error) {
    console.error("Error fetching items:", error)
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
    const validatedData = createItemSchema.parse(body)

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 })
    }

    const item = await prisma.item.create({
      data: {
        ...validatedData,
        ownerId: session.user.id,
      },
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
      },
    })

    // Award points for listing an item
    await prisma.pointTransaction.create({
      data: {
        userId: session.user.id,
        type: "EARNED_LISTING",
        amount: 10,
        balance: 0, // Will be updated by a trigger or separate function
        description: `Points earned for listing "${item.title}"`,
        itemId: item.id,
      },
    })

    // Update user's points balance
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        pointsBalance: { increment: 10 },
        totalPointsEarned: { increment: 10 },
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error("Error creating item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
