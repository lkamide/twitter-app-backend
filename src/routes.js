const { Router } = require('express');
const twitterController = require('./controller/twitterController');

const routes = Router();

routes.get('/mentions/:user', twitterController.getMention);
routes.get('/user/:username', twitterController.getUserId); 
routes.get('/userInformation/:username', twitterController.fetchUserInfos); 

module.exports = routes