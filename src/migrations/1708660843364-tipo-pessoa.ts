import { MigrationInterface, QueryRunner } from "typeorm";

export class TipoPessoa1708660843364 implements MigrationInterface {
    name = 'TipoPessoa1708660843364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pessoas\` ADD \`tipo\` enum ('1', '2') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pessoas\` DROP COLUMN \`tipo\``);
    }

}
