import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ADMIN, STUDENT, TEACHER } from "../src/constants/roleConstants";

const prisma = new PrismaClient();

const studentPassword = "testPassword";
const teacherPassword = "testTeacherPassword";
const adminPassword = "testAdminPassword";

const hashedStudentPassword = bcrypt.hash(studentPassword, 12);
const hashedTeacherPassword = bcrypt.hash(teacherPassword, 12);
const hashedAdminPassword = bcrypt.hash(adminPassword, 12);

async function main() {
  const newCategory = await prisma.category.create({
    data: {
      name: "Name1",
      externalId: Math.random().toString(),
      description: "Description",
    },
  });

  const newAuthor = await prisma.author.create({
    data: {
      name: "Name1",
      externalId: Math.random().toString(),
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
      externalId: Math.random().toString(),
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
      externalId: Math.random().toString(),
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
      externalId: Math.random().toString(),
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
      password: hashedStudentPassword as unknown as string,
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
      password: hashedTeacherPassword as unknown as string,
      lastName: "Test",
      name: "Tester",
      username: "TestTeacher",
      role: TEACHER,
    },
  });

  const newAdmin = await prisma.admin.create({
    data: {
      email: "testAdmin@gmail.com",
      password: hashedAdminPassword as unknown as string,
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
