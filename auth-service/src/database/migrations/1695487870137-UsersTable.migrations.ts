import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class UsersTable1695487870137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "userId",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                ],
            }),
            true,
        );
        await queryRunner.createIndex(
            "users",
            new TableIndex({
                name: "IDX_USER_ID",
                columnNames: ["userId"],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "IDX_USER_ID")
        await queryRunner.dropTable("users")
    }

}
