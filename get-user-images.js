const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.User.findMany({
    select: {
      username: true,
      image: true,
      cover_images: true
    },
    take: 5
  });
  console.log("Users:", JSON.stringify(users, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
