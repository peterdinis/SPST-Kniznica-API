import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const newCategory = await prisma.category.create({
    data: {
        name: "Name",
        description: "Description"
    }
  })

  const newAuthor = await prisma.author.create({
    data: {
        name: "Name",
        birthYear: 2001,
        country: "Slovakia",
        description: "ROROROROR",
        lastName: "FOFOFOFOF",
        litPeriod: "DOROROROROR",
    }
  });

  const newBook = await prisma.book.create({
    data: {
        name: "Name",
        description: "Description",
        image: "https://picsum.photos/200/300"
    }
  })

  console.log(newCategory, newAuthor);
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })