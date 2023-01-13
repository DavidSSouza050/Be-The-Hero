/**
 * Importante a conexão com o banco de dados litesql
 */
const connection = require('../database/connection');   
/**
 * exportando todas as requisições do arquivo
 */
module.exports = {

    async index(request, response){
        /**
         * realizando o paginamento
         * pegando a page e igualando a 1 caso não tenha nada nela
         */
        const { page = 1 } = request.query;
        /**
         * realizando a contagem de todos os dados da listagem
         */
        const [count] = await connection('incidents').count();

        /*
            listando todos os incidentes de uma determinada ong
            que é pega dentro do ultimo select
            limitando a 5 resposta por consulta
            e depois enviando mais 5 assim que a pagina atualiza
        */
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf']);
        
        /*Colocando o atributo X-Total-Count dentro da reader da requisição  */
        response.header('X-Total-Count', count['count(*)']);
        /*retorando a consulta em formato json */
        return response.json(incidents);
    },

    async create(request, response){
        /*Cadastrando uma ong, pegando do body os atributos informados dentro dele */
        const {title, description, value} = request.body;
        /*Pegando o id da ong pelo header da requisição */
        const ong_id = request.headers.authorization;

        /**
         * cadastrando o incidente da determidada ong e pegando o id criado
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        /*informando o retorno que será devolvido o id criado com um json */
        return response.json({ id });
    },

    async delete(request, response){
        /*Pegando o id do incident pelo parametro da URL */
        const { id } = request.params;
        /*pegando o id da ong dentro da header da requisição */
        const ong_id = request.headers.authorization;

        /*realizando consulta  do incidente pelo id enviado e selecionando o incidente da determinada ong*/
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        /*Verificando se o incidente é realmente da ong logada, caso não, ele envia erro 401 de não autorizado informando que a requisição não é permitida*/
        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }
        /*realizando delete do incidente */
        await connection('incidents').where('id', id).delete();
        /*retornado status de ação executada com sucesso */
        return response.status(204).send();
    }
};