const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String 
    },
    trainName: {
        type: String
    },
    amount : {
        type : Number
    },
    trainNo :{
        type : Number,
    }
})

const bookModel = mongoose.model("TicketDetail" , bookSchema );

module.exports = bookModel ;