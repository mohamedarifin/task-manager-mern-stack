import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";

export const DashBoard = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const login = localStorage.getItem('UsErEmAiL010A');
    if(!login){
      navigate('/login');
    }
  })

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [toDoItems, settoDoItems] = useState([])
  const [addListShow, setaddListShow] = useState(false);
  const [toDoRes, settoDoRes] = useState();
  const [toDoDeletedRes, settoDoDeletedRes] = useState();

  const [Edittitle, setEdittitle] = useState('');
  const [Editdescription, setEditdescription] = useState('');
  const [editres, seteditres] = useState('');
  const [editedId, seteditedId] = useState('');

  const [eddListShow, seteddListShow] = useState(false);

  const [loading, setloading] = useState(false);
  const [dashload, setdashload] = useState(false);

  const [localEmail, setlocalEmail] = useState('');

  useEffect(()=>{
    getToDoList();
  },[ toDoRes , toDoDeletedRes , editres ])

  const getToDoList = async () => {
    setdashload(true)
    let LocalStoreEmail = localStorage.getItem('UsErEmAiL010A');
    setlocalEmail(LocalStoreEmail);
    await axios.get(`https://task-manager-mern-stack-zaxt.onrender.com/todolist/?email=${LocalStoreEmail}`)
    .then(res =>{
      setdashload(false);
      settoDoItems(res.data.todos)
    })
  }

  const submitHandler = async (e) => {

    e.preventDefault();
    const fullTime = new Date;
    const dated = `${fullTime.getDate()}/${fullTime.getDay()}/${fullTime.getFullYear()} - ${fullTime.getHours()}:${fullTime.getMinutes()}:${fullTime.getSeconds()}`

    await axios.post('https://task-manager-mern-stack-zaxt.onrender.com/todolist' , { title , description , localEmail , dated })
    .then(res => {
      setloading(true)
      if(res.data.msg == 'Successfully Added !!'){
        settoDoRes(res);
        setaddListShow(false);
        setloading(false);
      }
    }); 
  }

  //LOGOUT FUNCTIONALITY :--

  const logOutHandler = () => {
    const log_S_O_N = confirm('DO YOU WANT TO LOGOUT THIS EMAIL ?');
    if(log_S_O_N){
      localStorage.clear();
    const logout = localStorage.getItem('UsErEmAiL010A');
    if(!logout){
      navigate('/login');
      addNotification({
        title: 'Task Manager',
        subtitle: 'LogOut',
        message: 'LogOut Successfull',
        onClick: ()=> window.location = window.location,
        theme: 'darkblue',
        duration: 864000000,
        closeButton: 'Go away',
        native: true,
        icon: 'https://img.icons8.com/bubbles/100/reminders.png',
      })
    }
    }
  }

  // DELETE ITEM HANDLER

  const deleteItemHandler = async (id) => { 
    const confirmed = confirm("Sure to delete this list ?");
    if(confirmed){
      await axios.delete(`https://task-manager-mern-stack-zaxt.onrender.com/todolist/${id}`)
    .then(res => settoDoDeletedRes(res.data.msg))
    }
    
  }

  const EditsubmitHandler = async (e) => { 
    e.preventDefault();
    setloading(true)
    await axios.put(`https://task-manager-mern-stack-zaxt.onrender.com/todolist/${editedId}` , { Edittitle , Editdescription })
    .then(res => {
      setloading(false)
      seteddListShow(false);
      seteditres(res.data.msg)
    })

  }

  const editListHandler = ( title , descript , id ) => {
    setaddListShow(false)
    setEdittitle(title);
    setEditdescription(descript);
    seteditedId(id)
    seteddListShow(true);
  }


  return (
    <>
      <div className="todo_Container">
        <div className="todo_nav">
          <h5 className="todo_header text-light">Task Manager</h5>
          <div className="todo_btns d-flex justify-content-center align-items-center">
            {
              dashload
              ?
              <div></div>
              :
              <button className="btn btn-light me-2 fw-bold px-4" onClick={()=>{
                seteddListShow(false);
                setaddListShow(true);
              }}>Add</button>
            }
            <button className="btn btn-md btn-danger fw-bold" onClick={logOutHandler}>LogOut</button>
          </div>
        </div>
        {/* Add List Elements */}
        {
        addListShow 
        ? 
        <div className="add_list_container">
        <h3>Create The List</h3>
        <form action="" className='row' onSubmit={submitHandler}>
            <div className="col-12 col-sm-6">
            <label htmlFor="" className='input-label'>Title</label>
            <input type="text" required className='form-control' placeholder='Enter The Title' onChange={(e)=>{
                settitle(e.target.value)
            }}/>
            </div>
            <div className="col-12 col-sm-6">
            <label htmlFor="" className='input-label'>Description</label>
            <input type="text" required className='form-control' placeholder='Enter The Description' onChange={(e)=>{
                setdescription(e.target.value)
            }}/>
            </div>
            <div className="col-12 d-flex justify-content-start align-items-center">

            <input type="submit" className='btn btn-success px-3 fw-bold' value="Add" />
            <button className="btn btn-danger ms-4 fw-bold" onClick={()=>{
              setaddListShow(false)
            }}>Cancel</button>
            {
              loading
              ?
              <div className="spinner-border  ms-4 fw-bold mt-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              :
              <div></div>

            }
            </div>
        </form>
        </div>
        :
         <div></div>
         }
         
        {/* <EditList /> */}
         {
          eddListShow
          ?
          <div className="edd_list_container">
        <h3>Edit The List</h3>
        <form action="" className='row' onSubmit={EditsubmitHandler}>
            <div className="col-12 col-sm-6">
            <label htmlFor="" className='input-label'>Title</label>
            <input type="text" required className='form-control' value={ Edittitle } onChange={(e)=>{
                setEdittitle(e.target.value)
            }}/>
            </div>
            <div className="col-12 col-sm-6">
            <label htmlFor="" className='input-label'>Description</label>
            <input type="text" required className='form-control' value={ Editdescription }  onChange={(e)=>{
                setEditdescription(e.target.value)
            }}/>
            </div>
            <div className="col-12 d-flex justify-content-start align-items-center">
            <input type="submit" className='btn btn-success px-3 fw-bold' value="Edit" />
            <button className="btn btn-danger ms-4 fw-bold" onClick={()=>{
              seteddListShow(false)
            }}>Cancel</button>
            {
              loading
              ?
              <div className="spinner-border  ms-4 fw-bold mt-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              :
              <div></div>

            }
            </div>
        </form>
          </div>
          :
          <div></div>
         }
         {
          dashload
          ?
          <div className="w-100 text-center mt-5">
            <div className="spinner-border  ms-4 fw-bold mt-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <div></div>
         }
        
        <div className="to_do_lists">
        {
          toDoItems.map(( item , index )=>


            <div className="to_do_item mx-2 mb-3" key={item._id}>
          <div className="to_do_title">
            <h6 className='me-4 fw-bold m-0'>{item.title.toUpperCase()}</h6>
            <i className="bi bi-pencil-square fs-4 bg-warning px-2 rounded" onClick={()=>{
              editListHandler( item.title , item.description , item._id )
            }}></i>
          </div>
          <div className="to_do_descript">
            <h6 className='me-5 '>{item.description}</h6>
            <i className="bi bi-trash fs-4 bg-danger rounded px-2 text-dark" onClick={()=>{
              deleteItemHandler(item._id)
              }}></i>
          </div>
          <div className="to_do_date">
            {item.date}
          </div>
        </div>
)
        }
          
          
        </div>
      </div>
    </>
  )
}
