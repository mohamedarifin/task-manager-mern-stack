const express = require('express');
const UserModel = require('./Models/Usermodel');
const toDoModel = require('./Models/Todomodel');
const bookModel = require('./Models/BookTicket');
const Route = express.Router();
Route.post('/signup',async (req,res)=>{
    try {
        const { name , email , password } = req.body;

        const users = await UserModel.findOne({email});
        if(users){
            res.json({
                msg : "your email already registered !!"
            });
        }
        if(!users){

            const userdata =  await UserModel.create({ name , email , password });

            res.json({
                msg : "Successfully SignIned"
            });
        }
    } catch (error) {
        res.json({msg : "Error Found ",err:error}); 
    }
})

Route.post('/login',async (req,res)=>{

    try {
    const { email , password } = req.body;

    const users = await UserModel.findOne({email});

        if(users){
            if(users.password == password){
                res.status(200).json({
                    msg : "Login Successfull"
                })
            }else{
                res.json({
                    msg : "your password is not correct"
                })
            }
        }else{
            res.json({
                msg : "your email is not correct"
            })
        }
    } catch (error) {
        res.json({
            msg : " Error Found at Login Page !!"
        })
    }
})

Route.post('/todolist',async (req,res)=>{
    try {
        const { title , description , localEmail , dated } = req.body;
        
        const todo_title = await toDoModel.create({ title , description , email : localEmail , date : dated });
        if(todo_title){
            res.json({
                msg : 'Successfully Added !!'
            })
        }
    } catch (error) {
        res.json({
            msg : error
        })
    }
})

Route.get('/todolist', async (req,res)=>{
    try {
        const { email } = req.query;
        const todos = await toDoModel.find({ email });

        res.json({
            todos
        })
    } catch (error) {
        res.json({
            err
        })
    }
})

Route.delete('/todolist/:id', async (req,res)=>{
    try {
        const { id } = req.params
        const deleted = await toDoModel.findByIdAndDelete(id);
        if(deleted){
            res.json({
                msg : deleted
            })
        }
    } catch (error) {
        res.json({
            msg : error
        })
    }
    
    
})

Route.put('/todolist/:id', async (req,res)=>{
    try {
        const { id } = req.params;

        const { Edittitle , Editdescription } = req.body;

        const updated = await toDoModel.findOneAndUpdate({_id : id} ,{ title : Edittitle , description :  Editdescription});

        res.json({
            msg : updated
        })  
    } catch (error) {
        res.json({
            msg : error
        })
    }
    
})

Route.post('/bookticket', async(req,res)=>{
    try {
        const { name , trainName , email , amount , trainNo  } = req.body;
        
        const TicketDetail = await bookModel.create({ name , trainName , email , amount , trainNo });

        if(TicketDetail){
            res.json({
                msg : 'Successfully Added !!'
            })
        }
    } catch (error) {
        res.json({
            msg : error
        })
    }
})

Route.get('/bookticket', async(req,res)=>{
    try {
        const { email } = req.query;
        const ticket = await bookModel.find({ email });

        res.json({
            ticket
        })
    } catch (error) {
        res.json({
            err
        })
    }
})

module.exports = Route