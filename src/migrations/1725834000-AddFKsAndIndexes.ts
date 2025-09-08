import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKsAndIndexes1725834000 implements MigrationInterface {
  name = 'AddFKsAndIndexes1725834000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_projects_owner ON "projects" ("owner_user_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_projects_status ON "projects" ("status")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_projects_name ON "projects" ("name")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_users_created_at ON "users" ("created_at")`);

    // Add FK if not exists workaround: try create, ignore if exists
    try {
      await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT fk_projects_owner FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    } catch (e) {
      // ignore if exists
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT fk_projects_owner`);
    } catch (e) {
      // ignore
    }
    await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_owner`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_status`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_name`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_users_created_at`);
  }
}


