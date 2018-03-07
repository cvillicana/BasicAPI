
var TodoController            = require('./controllers/todos'),
    express                   = require('express'),
    multer                    = require('multer');

module.exports = function(app){

    var apiRoutes     = express.Router(),
        todoRoutes    = express.Router();

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);
    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['admin']), TodoController.deleteTodo);

    // Set up routes
    app.use('/api', apiRoutes);

}
