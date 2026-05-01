const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const imagePosts = await prisma.ImagePost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });
  console.log("Recent Gallery Images:", JSON.stringify(imagePosts, null, 2));

  const experiences = await prisma.experience.findMany({
    take: 5
  });
  console.log("Recent Experiences:", JSON.stringify(experiences, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
