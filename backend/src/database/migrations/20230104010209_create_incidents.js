/*Criando a tabela de incidents e realazionando com a tabela ongs */
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
    });
};
/*deletando a tabela ongs caso seja necessário */
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
