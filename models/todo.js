var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// define the model from the schema above
var Todo = mongoose.model('Todo', todoSchema);
// export model. When we `require this file` we just get back the Todo model
module.exports = Todo;