import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1708660378798 implements MigrationInterface {
    name = 'CreateTables1708660378798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`acessos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`perfil\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pessoas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`dataNasc\` date NOT NULL, \`cpf\` varchar(255) NOT NULL, \`status\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`perfilId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`perfil_acessos\` (\`perfilId\` int NOT NULL, \`acessosId\` int NOT NULL, INDEX \`IDX_0b5ff26e52d709426c77d35be5\` (\`perfilId\`), INDEX \`IDX_ea7cbb43dc20ae67ff0395b77e\` (\`acessosId\`), PRIMARY KEY (\`perfilId\`, \`acessosId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_af78c80a13db0533943bae0e258\` FOREIGN KEY (\`perfilId\`) REFERENCES \`perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`perfil_acessos\` ADD CONSTRAINT \`FK_0b5ff26e52d709426c77d35be55\` FOREIGN KEY (\`perfilId\`) REFERENCES \`perfil\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`perfil_acessos\` ADD CONSTRAINT \`FK_ea7cbb43dc20ae67ff0395b77e6\` FOREIGN KEY (\`acessosId\`) REFERENCES \`acessos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`perfil_acessos\` DROP FOREIGN KEY \`FK_ea7cbb43dc20ae67ff0395b77e6\``);
        await queryRunner.query(`ALTER TABLE \`perfil_acessos\` DROP FOREIGN KEY \`FK_0b5ff26e52d709426c77d35be55\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_af78c80a13db0533943bae0e258\``);
        await queryRunner.query(`DROP INDEX \`IDX_ea7cbb43dc20ae67ff0395b77e\` ON \`perfil_acessos\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b5ff26e52d709426c77d35be5\` ON \`perfil_acessos\``);
        await queryRunner.query(`DROP TABLE \`perfil_acessos\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`pessoas\``);
        await queryRunner.query(`DROP TABLE \`perfil\``);
        await queryRunner.query(`DROP TABLE \`acessos\``);
    }

}
