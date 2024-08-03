import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"

const port = process.env.DB_PORT as unknown as number;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    migrationsTableName: "version_migrations",
    entities:  [`${__dirname}/**/entity/*.{ts,js}`],
    migrations:[`${__dirname}/**/migrations/*.{ts,js}`]
})
