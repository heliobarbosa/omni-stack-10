const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express();
mongoose.connect('mongodb+srv://helio:helio@cluster0-ixuj3.mongodb.net/week10?retryWrites=true&w=majority',{ 
    useUnifiedTopology: true ,
    useNewUrlParser: true,   
});
app.use(cors({}))
app.use(express.json());
app.use(routes);


app.listen(3333);