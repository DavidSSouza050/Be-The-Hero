/*Importando o knex para fazer a requisição com o banco de dados */
const knex = require('knex');
/*pegando a configuração do knex fora da src */
const configuration = require('../../knexfile');
/*Informando para o knex usar a configuração de desenvolvimento */
const connection = knex(configuration.development);
/*exportando a conexão */
module.exports = connection;