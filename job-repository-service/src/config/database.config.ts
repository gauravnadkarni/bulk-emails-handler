import { registerAs } from "@nestjs/config";

export default registerAs('database',() => ({
    DATASOURCE: "MYSQL_DATA_SOURCE",
    HOST: 'localhost',
    PORT: 3306,
    USERNAME: 'root',
    PASSWORD: 'root',
    DATABASE: 'test',
    SYNCHRONIZE: process.env.SYNCHRONIZE === "true" ? true : false,
}));