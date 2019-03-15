var usersService = require('./../services/userService');
var orderService = require('./../services/orderService');
module.exports = function(app){

    app.post('/api/login',usersService.login);
    app.post('/api/get-orders',orderService.getOrdersList);
    app.post('/api/add-edit-orders',orderService.addEditOrder);
    app.post('/api/delete-order',orderService.deleteOrder);
};