const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const Route = require('./routes')

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded());

mongoose.connect(process.env.DATABASE_URL).then(()=>{
}).catch((err)=>{
})

app.use(Route);

app.get('/',(req,res)=>{
    res.send('welcome to our Server');
})

app.listen(process.env.PORT,()=>{
})