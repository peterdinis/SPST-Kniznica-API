import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const newCategory = await prisma.category.create({
    data: {
        name: "Name1",
        description: "Description"
    }
  })

  const newAuthor = await prisma.author.create({
    data: {
        name: "Name1",
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
        image: "https://picsum.photos/200/300",
        pages: 20202,
        status: "Dostupná",
        authorId: 1,
        categoryId: 3,
        year: 2020
    }
  })
  
  const newStudent = await prisma.student.create({
    data: {
      email: "testStudent@gmail.com",
      password: "testPassword",
      classRoom: "1.A",
      lastName: "RRRR",
      username: "TestStudent",
      name: "RIRIRIR",
      role: "STUDENT",
      picture: null
    }
  });

  const newTeacher = await prisma.teacher.create({
    data: {
      email: "testTeacher@gmail.com",
      password: "testPassword",
      lastName: "Test",
      name: "Tester",
      username: "TestTeacher",
      role: "TEACHER"
    }
  });

  const newAdmin = await prisma.admin.create({
    data: {
      email: "testAdmin@gmail.com",
      password: "testPassword",
      name: "Admin",
      lastName: "TestAdmin",
      role: "ADMIN",
      username: "testAdmin"
    }
  });

  console.log(newBook, newCategory, newAuthor, newAdmin, newTeacher, newStudent)
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