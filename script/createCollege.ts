import { prisma } from "../lib/prisma";



async function main() {
  const college = await prisma.college.create({
    data: {
      name: "Test College",
    },
  });

  console.log("College created:", college);
}

main().finally(() => prisma.$disconnect());
