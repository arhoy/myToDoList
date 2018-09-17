

const express = require('express');
const router = express.Router();
const helpers = require('../helpers/todos');
// allows us to access the body that comes in a post/put request.
const bodyParser = require('body-parser');


const db = require('../models');

router.route('/')
    .get(helpers.getToDos)
    .post(helpers.createToDos);




// we want to look up the specific todoId.  
// :syntax in the first parameter of get below allows as to specifiy whatever string we want after the / which in this case is actually /api/todo coming from app.use as defined in the main index.js file  
router.route('/:todoId')
    .get(helpers.getToDo)
    .put(helpers.putToDo)
    .delete(helpers.deleteToDo)



module.exports = router;


// note: inside of this todo.js file, we have created a new res.send. This then gets called in the main index.js file
// We call it by using: app.use('/api/todos',todoRoutes);
// initially we do not have any to dos. There fore we will get back an empty array.


