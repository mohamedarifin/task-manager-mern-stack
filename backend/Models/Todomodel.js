const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String 
    },
    description: {
        type: String
    },
    email : {
        type : String
    },
    date :{
        type : String,
    }
})

const toDoModel = mongoose.model("ToDoDetail" , toDoSchema );

module.exports = toDoModel ;