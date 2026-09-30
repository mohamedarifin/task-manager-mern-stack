const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const Route = require('./routes');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded());

mongoose.connect(process.env.DATABASE_URL, {
    dbName: "toDoList",
})
    .then(() => {
        console.log("MongoDB connected to toDoList");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


app.use(Route);

app.get('/', (req, res) => {
    res.send('welcome to our Server');
})

app.listen(process.env.PORT, () => {
    // console.log("port is ", process.env.PORT)
    // console.log("DATABASE_URL is ", process.env.DATABASE_URL)
})