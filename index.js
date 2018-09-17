const express = require('express');
const app = express();

// allows us to access the body that comes in a post/put request.
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// directories of where the statics files are
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


var todoRoutes = require('./routes/todos');
var Todo = require('./models/');


// the main endpoint
app.get('/', (req, res) => {
    res.sendFile(`index.html
      
         `);
});

// the happy end point
app.get('/happy',(req,res)=> {
    res.send(`I have send this text to the /happy page. 
            For example, this response has been sent to http://localhost:3000/happy
            :) I am so happy. Are you happy? If not, smile in front of the mirror and you will feel more happy.
         `);
});

// this is the endpoint for the todoRoutes.
app.use('/api/todos',todoRoutes);

app.listen(3000, () => console.log(
        `Example app listening on port 3000! 
        You must open up localhost:3000 in url in the browser.
        type node index.js to start the process.
        Type ctr + C to in terminal to close.
        You must close, terminal to restart the process and refresh the url page everytime.
        If you have installed nodemon, it will listen to changes made in your code editor and rerun the process each time.
        You can install nodemon as a dev dependency npm package.
        You must still refresh the browser on local host.
        To run nodemon, type nodemon index.js in the terminal/command line.
        `));