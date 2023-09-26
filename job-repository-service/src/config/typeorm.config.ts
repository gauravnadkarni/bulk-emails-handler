import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions = {
    type: 'mysql',
    host: 'jobrepodb',
    port: 3306,
    username: 'root',
    password: `Password@1`,
    database: `dbjobs`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    synchronize: false,
  } 

const dataSource:DataSource = new DataSource(dataSourceOptions);
export default dataSource;