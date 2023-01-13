const connection = require('../database/connection');


module.exports = {
    async create(request, response){
        /*Pegando o ID da Ong pelo body da requisição */
        const {id} = request.body;
        /**realizando consulta e trazendo a ong do id informado */
        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();
        /**
        Caso não encotre a ong, retornará o erro 400 de ong não localizada
         */
        if(!ong){
            return response.status(400).json({error: 'No ONG found with this ID'});
        }

        /**locanzando a ong, ele envia os dados em json */
        return response.json(ong);
    }
}