const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl')
const multer = require('./middleware/multer-config');


// Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/profile/').get(usersCtrl.getUserProfile);

    //Messages routes
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessage);
    apiRouter.route('/messages/destroy/').delete(messagesCtrl.destroyMessage);
    apiRouter.route('/messages/modify/').put(messagesCtrl.modifyMessage)

    

    return apiRouter;
})();