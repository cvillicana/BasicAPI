var TodoController            = require('./controllers/todos'),
    AuthController            = require('./controllers/auth'),
    express                   = require('express'),
    passport                  = require('passport'),
    multer                    = require('multer');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes     = express.Router(),
        authRoutes    = express.Router(),
        todoRoutes    = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthController.register);

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
