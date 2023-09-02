import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: process.env.PORT as unknown as number,
    username: process.env.USERNAME as unknown as string,
    password: process.env.PASSWORD as unknown as string,
    database: process.env.DATABASE as unknown as string,
    entities: [],
    logging: true,
    synchronize: true,
})