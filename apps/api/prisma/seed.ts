import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      title: "Simple Omelette",
      instructions: "Whisk eggs and cook in a pan.",
      prepTimeMinutes: 5,
      cookTimeMinutes: 5,
      servings: 1
    },
    update: {}
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
