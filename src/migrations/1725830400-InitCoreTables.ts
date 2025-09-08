import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCoreTables1725830400 implements MigrationInterface {
  name = 'InitCoreTables1725830400'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "email" varchar(255) NOT NULL UNIQUE,
      "password_hash" varchar(255) NOT NULL,
      "roles" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "profile" jsonb NULL,
      "invited_by_user_id" uuid NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "projects" (
      "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "name" varchar(255) NOT NULL,
      "owner_user_id" uuid NOT NULL,
      "status" varchar(32) NOT NULL DEFAULT 'pending',
      "assetIds" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "assets" (
      "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "name" varchar(255) NOT NULL,
      "project_id" uuid NULL,
      "fields" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "residuals" (
      "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "project_id" uuid NOT NULL,
      "form_data" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "ai_result" jsonb NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "reports" (
      "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "project_id" uuid NOT NULL,
      "data" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON "users"("email")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "reports"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "residuals"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "assets"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "projects"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}


