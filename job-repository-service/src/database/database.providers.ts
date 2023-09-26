import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: process.env.DATASOURCE || "DATASOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT,10) || 3306,
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "Password@1",
        database: process.env.DB_NAME || "dbjobs",
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        migrations: [
          __dirname + '/../**/*.migration{.ts,.js}',
      ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
