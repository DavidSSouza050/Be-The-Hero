/**
 * Importando o express para realizar a configuração do back-end sendo uma "framework" que facilita essa criação
 */

const express = require('express');
/*Importando o CORS para o sistema de segurança do navegador */
const cors = require('cors');
/** Importando as rotas do outro arquivo */
const routes = require('./routes');
/** Iniciando o servidor com as informações do express */
const app = express();
/**Colocando o cors na app, para colocar as configurações de segurança, é possivel deixar apenas um IP permitido para acessar este sistema
 Colocando o endereço dentro do cors(), exemplo: app.use(cors(120.154.120))
 */
app.use(cors());
/** informando o express que vai utilizar a "liguagem Json" */
app.use(express.json());
/* Colocando as rotas dentro da aplicação */
app.use(routes);

/**Servidor escutando a porta 3333 para enviar as solicitações*/
app.listen(3333);

