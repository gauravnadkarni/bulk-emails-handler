import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT,10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    synchronize: false,
  } 

const dataSource:DataSource = new DataSource(dataSourceOptions);
export default dataSource;