const connection = require('../database/connection');   
/*Imporntado o crypto para realizar cadastro do id da ong */
const crypto = require('crypto');

module.exports = {

    async index(request, response)  {
        /*Selecionando todas as ongs cadastradas*/
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        /*Pegando informações do body da requisição */
        const {name, email, whatsapp, city, uf} = request.body;
        /*Criando o id para a onf, onde é selecionado um numero aleatorio de 4 byts e passando para hexdecimal */
        const id = crypto.randomBytes(4).toString('HEX');

        /*cadastrando ong no bando  */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        /*Retornando um JSON com o id da ONG */
        return response.json({ id });
    }
}