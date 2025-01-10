const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true 
    },
    email: {
        type: String,
        trim: true
    },
    password :{
        type : String,
        trim: true
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

const UserModel = mongoose.model("UserDetail" , UserSchema);

module.exports = UserModel ;