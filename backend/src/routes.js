const express = require('express');       
const routes = express.Router();

/*
Importando a lógica de requisição nestes diretorios
*/
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/*
Requisições HTTP
post: para enviar algo ao servidor, como um cadastro ou login para acesso 
get: para levar do servidor ao client, como mostrar uma lista de ongs, como neste projeto
PUT: para realizar atualizações em cadastros
Delete: para realizar o delete em algum cadastro, sempre necessário informar ID para realizar esse requisição
*/

/*Requisição de login ao sistema*/
routes.post('/sessions', SessionController.create);

/*Requisições para listar as ongs ou cadastrar alguma ong*/
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
/*requisição para pegar todos os incidentes de uma ong em especifico*/ 
routes.get('/profile', ProfileController.index);
/*Requisições para criar, listar e deletar os incidentes de cada ong*/
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;