import { PrismaClient } from "@prisma/client";
import { ADMIN, STUDENT, TEACHER } from "../src/constants/roleConstants";


const prisma = new PrismaClient();

async function main() {
  const newCategory = await prisma.category.create({
    data: {
      name: "Name1",
      externalId: String(Math.floor(100000 + Math.random() * 900000)),
      description: "Description",
    },
  });

  const newAuthor = await prisma.author.create({
    data: {
      name: "Name1",
      externalId: String(Math.floor(100000 + Math.random() * 900000)),
      birthYear: 2001,
      country: "Slovakia",
      description: "ROROROROR",
      lastName: "FOFOFOFOF",
      litPeriod: "DOROROROROR",
    },
  });

  const newBook = await prisma.book.create({
    data: {
      name: "Name",
      externalId: String(Math.floor(100000 + Math.random() * 900000)),
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
      externalId: String(Math.floor(100000 + Math.random() * 900000)),
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
      externalId: String(Math.floor(100000 + Math.random() * 900000)),
      description: "Description",
      image: "https://picsum.photos/200/300",
      pages: 20202,
      status: "Dostupná",
      authorId: 1,
      categoryId: 1,
      year: 2020,
    },
  });

  const newStudent = await prisma.student.create({
    data: {
      email: "testStudent@gmail.com",
      password: "password",
      classRoom: "1.A",
      lastName: "RRRR",
      username: "TestStudent",
      name: "RIRIRIR",
      role: STUDENT,
      picture: null,
    },
  });

  const newTeacher = await prisma.teacher.create({
    data: {
      email: "testTeacher@gmail.com",
      password: "password",
      lastName: "Test",
      name: "Tester",
      username: "TestTeacher",
      role: TEACHER,
    },
  });

  const newAdmin = await prisma.admin.create({
    data: {
      email: "testAdmin@gmail.com",
      password: "password",
      name: "Admin",
      lastName: "TestAdmin",
      role: ADMIN,
      username: "testAdmin",
    },
  });

  const newNotification = await prisma.notification.create({
    data: {
      content: "ororororororo",
      username: "TestStudent",
      isRead: true,
      text: "Create new booking",
    },
  });

  const newMessage = await prisma.message.create({
    data: {
      description: "Custom description",
      name: "Custom Name",
    },
  });

  console.log(
    newBook,
    newCategory,
    newAuthor,
    newAdmin,
    newMessage,
    newTeacher,
    newStudent,
    newNotification,
    secondBook,
    thirdBook
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
