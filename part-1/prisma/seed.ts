/// <reference types="node" />

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  for (let i = 1; i <= 15; i++) {
    await prisma.user.create({
      data: {
        user_name: `user${i}`,
        date_of_birth: new Date(2000, 0, (i % 28) + 1), 
        email: `user${i}@example.com`,
        password: `password${i}`,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
