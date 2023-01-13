/*Usando o knex para criar o banco relacionados a ong */
exports.up = function(knex) {
   return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

/*deletando a tabela criada caso de algum erro */
exports.down = function(knex) {
    return knex.schema.dropTable('ongs'); 
};
