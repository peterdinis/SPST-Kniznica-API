import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newCategory = await prisma.category.create({
    data: {
      name: "Name1",
      externalId: Math.floor(
        100000 + Math.random() * 900000
      ) as unknown as number,
      description: "Description",
    },
  });

  const newAuthor = await prisma.author.create({
    data: {
      name: "Name1",
      externalId: Math.floor(
        100000 + Math.random() * 900000
      ) as unknown as number,
      birthYear: 2001,
      country: "Slovakia",
      description: "ROROROROR",
      lastName: "FOFOFOFOF",
      litPeriod: "DOROROROROR",
      image: "https://www.computerhope.com/jargon/r/random-dice.jpg",
    },
  });

  const newBook = await prisma.book.create({
    data: {
      name: "Name",
      externalId: Math.floor(
        100000 + Math.random() * 900000
      ) as unknown as number,
      description: "Description",
      image: "https://picsum.photos/200/300",
      pages: 20202,
      status: "Dostupná",
      authorId: 1,
      categoryId: 1,
      year: 2020,
    },
  });

  const secondBook = await prisma.book.create({
    data: {
      name: "Name1",
      externalId: Math.floor(
        100000 + Math.random() * 900000
      ) as unknown as number,
      description: "Description",
      image: "https://picsum.photos/200/300",
      pages: 20202,
      status: "Dostupná",
      authorId: 1,
      categoryId: 1,
      year: 2020,
    },
  });

  const thirdBook = await prisma.book.create({
    data: {
      name: "Name2",
      externalId: Math.floor(
        100000 + Math.random() * 900000
      ) as unknown as number,
      description: "Description",
      image: "https://picsum.photos/200/300",
      pages: 20202,
      status: "Dostupná",
      authorId: 1,
      categoryId: 1,
      year: 2020,
    },
  });

  const message = await prisma.message.create({
    data: {
      header: "Moja sprava",
      body: "Moje body",
      forUsername: "Pre uživateľa"
    }
  });

  console.log(
    newBook,
    newCategory,
    newAuthor,
    secondBook,
    thirdBook,
    message
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
