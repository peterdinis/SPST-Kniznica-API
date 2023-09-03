import { DataSource } from "typeorm"
import { Book } from "./entities/bookEntity"
import { Category } from "./entities/categoryEntity"
import { Teacher } from "./entities/teacherEntity"
import { Student } from "./entities/studentEntity"
import { Booking } from "./entities/bookingEntity"
import { Author } from "./entities/authorEntity"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: process.env.PORT as unknown as number,
    username: process.env.USERNAME as unknown as string,
    password: process.env.PASSWORD as unknown as string,
    database: process.env.DATABASE as unknown as string,
    entities: [Book, Category, Teacher, Student, Booking, Author],
    logging: true,
    synchronize: true,
})