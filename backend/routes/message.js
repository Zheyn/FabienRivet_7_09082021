// const express = require('express');
// const messagesCtrl = require('../controllers/messagesCtrl')
// const auth = require('../middleware/auth')


// // Router
// exports.router = (function() {
//     const apiRouter = express.Router();

//     //Users routes
//     apiRouter.route('/users/register/').post(usersCtrl.register);
//     apiRouter.route('/users/login/').post(usersCtrl.login);
//     apiRouter.route('/users/profile/').get(usersCtrl.getUserProfile);

//     //Messages routes
//     apiRouter.route('/messages/new/').post(auth, messagesCtrl.createMessage);
//     apiRouter.route('/messages/').get(messagesCtrl.listMessage);
//     apiRouter.route('/messages/destroy/').delete(messagesCtrl.destroyMessage);
//     apiRouter.route('/messages/modify/').put(messagesCtrl.modifyMessage)

    

//     return apiRouter;
// })();


const express = require('express');
const router = express.Router(); 
//const auth = require('../middleware/auth')
const messageCtrl = require('../controllers/messagesCtrl');

//const multer = require('../middleware/multer-config')

router.post('/create', messageCtrl.createMessage);
  
router.put('/modify', messageCtrl.modifyMessage);
  
router.delete('/destroy', messageCtrl.destroyMessage);
  
router.get('/list', messageCtrl.listMessage);

// Route qui permet de gérer les likes des sauces
// Définit le statut "j'aime" pour userID fourni. Si j'aime = 1,l'utilisateur aime la sauce. Si j'aime = 0,l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas. Si j'aime =-1, l'utilisateur n'aime pas la sauce.L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, engardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime".
//router.post('/:id/like', auth, sauceCtrl.like)

module.exports = router;