import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../../users/entities/user.entity";
import USERS from "../../config/seeding-users.config";

export class UsersTableSeed1695487870137 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      console.log(process.env);
      for(let user of USERS.USERS) {
        console.log(user)
        await queryRunner.manager.save(
          queryRunner.manager.create<User>(User, {
            email: user.email,
            name: user.name,
            password: user.password,
            userId: user.userId,
          }),
        );
      }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete<User>(User,{});
    }

}
