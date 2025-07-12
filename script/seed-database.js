import { PrismaClient } from "../lib/generated/prisma/index.js"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      {
        id: "cat_tops",
        name: "Tops & Shirts",
        slug: "tops-shirts",
        description: "T-shirts, blouses, sweaters, and more",
        sortOrder: 1,
      },
      {
        id: "cat_bottoms",
        name: "Bottoms",
        slug: "bottoms",
        description: "Jeans, pants, shorts, and skirts",
        sortOrder: 2,
      },
      {
        id: "cat_dresses",
        name: "Dresses",
        slug: "dresses",
        description: "Casual and formal dresses",
        sortOrder: 3,
      },
      {
        id: "cat_outerwear",
        name: "Outerwear",
        slug: "outerwear",
        description: "Jackets, coats, and blazers",
        sortOrder: 4,
      },
      {
        id: "cat_shoes",
        name: "Shoes",
        slug: "shoes",
        description: "Sneakers, boots, heels, and flats",
        sortOrder: 5,
      },
      {
        id: "cat_accessories",
        name: "Accessories",
        slug: "accessories",
        description: "Bags, jewelry, scarves, and more",
        sortOrder: 6,
      },
    ],
    skipDuplicates: true,
  })

  console.log(`✅ Created ${categories.count} categories`)

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@rewear.com" },
    update: {},
    create: {
      id: "admin_user",
      email: "admin@rewear.com",
      firstName: "Admin",
      lastName: "User",
      displayName: "ReWear Admin",
      role: "ADMIN",
      isVerified: true,
      pointsBalance: 1000,
      totalPointsEarned: 1000,
    },
  })

  console.log("✅ Created admin user")

  // Create demo users
  const demoUsers = await prisma.user.createMany({
    data: [
      {
        email: "sarah@example.com",
        firstName: "Sarah",
        lastName: "Johnson",
        displayName: "Sarah J.",
        bio: "Sustainable fashion enthusiast",
        location: "New York, NY",
        isVerified: true,
        pointsBalance: 150,
        totalPointsEarned: 200,
      },
      {
        email: "mike@example.com",
        firstName: "Mike",
        lastName: "Chen",
        displayName: "Mike C.",
        bio: "Love vintage finds",
        location: "San Francisco, CA",
        isVerified: true,
        pointsBalance: 75,
        totalPointsEarned: 125,
      },
      {
        email: "emma@example.com",
        firstName: "Emma",
        lastName: "Wilson",
        displayName: "Emma W.",
        bio: "Minimalist wardrobe advocate",
        location: "Austin, TX",
        isVerified: true,
        pointsBalance: 200,
        totalPointsEarned: 250,
      },
    ],
    skipDuplicates: true,
  })

  console.log(`✅ Created ${demoUsers.count} demo users`)

  console.log("🎉 Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
