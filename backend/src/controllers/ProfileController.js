const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        /*Pegando o id da ong selecionada
         */
        const ong_id = request.headers.authorization;
        /*realizando consultas de todos os incidents desta ong*/
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');
        /*enviado os incidentes da ong logada */
        return response.json(incidents);
    }
}