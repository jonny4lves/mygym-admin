import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPessoaTableUsuario1708748109740 implements MigrationInterface {
    name = 'AddColumnPessoaTableUsuario1708748109740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`pessoaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_bd1cb25ec8ff634a99892afdd78\` FOREIGN KEY (\`pessoaId\`) REFERENCES \`pessoas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_bd1cb25ec8ff634a99892afdd78\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`pessoaId\``);
    }

}
