
var TodoController            = require('./controllers/todos'),
    express                   = require('express'),
    multer                    = require('multer');

module.exports = function(app){

    var apiRoutes     = express.Router(),
        todoRoutes    = express.Router();

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);
    todoRoutes.get('/:todo_id', TodoController.getTodo);
    todoRoutes.get('/', TodoController.getTodos);
    todoRoutes.post('/', TodoController.createTodo);
    todoRoutes.put('/:todo_id', TodoController.updateTodo);
    todoRoutes.delete('/:todo_id', TodoController.deleteTodo);

    // Set up routes
    app.use('/api/v1', apiRoutes);

}
