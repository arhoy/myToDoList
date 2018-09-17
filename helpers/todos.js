const db = require('../models');

exports.getToDos  = function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })

}

exports.createToDos = function(req,res){
      db.Todo.create(req.body)
          .then(function(newTodo){
              res.json(newTodo);
          })
          .catch(function(err){
              res.send(err);
          })
}


exports.getToDo = function(req,res){
    // req.params.todoId is refering to the stuff that gets put after the /. 
db.Todo.findById(req.params.todoId)
.then(foundTodo=>{res.json(foundTodo)})
.catch(err=>{res.send(err)})
}

exports.putToDo = function(req,res){
    // sample try: res.send('update the fucking route');
    // aruments below are what we want to find and what we want to update.
    db.Todo.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true})  // using the argument of the put ie. todoId.
        .then(todo=>res.json(todo))
        .catch(todo=>res.json(todo))
}

exports.deleteToDo = function(req,res){
    // sample try: res.send('DELETE THIS PUSSY ASS BITCH');
    db.Todo.remove({_id:req.params.todoId})
        .then(()=>res.json({message: 'It was deleted yo!'}))
        .catch(err=> res.send('was not able to DELETE IT silly BITCH'))
}

// export the module
module.exports = exports;