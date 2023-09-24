import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class JobsTable1695487870000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "jobs",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "jobId",
                        type: "varchar",
                    },
                    {
                        name: "numOfEmailsToBeSent",
                        type: "bigint",
                    },
                    {
                        name: "numOfEmailsSentSoFar",
                        type: "bigint",
                    },
                    {
                        name: "status",
                        type: "varchar",
                    },
                    {
                        name: "isDone",
                        type: "boolean",
                        default: false,
                    },
                ],
            }),
            true,
        );
        await queryRunner.createIndex(
            "jobs",
            new TableIndex({
                name: "IDX_JOB_ID",
                columnNames: ["jobId"],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("jobs", "IDX_JOB_ID")
        await queryRunner.dropTable("jobs")
    }

}
