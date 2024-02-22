import React, { useState } from 'react'
import "./Loginpage.css"
import axios from 'axios'
import { SaleApp_API } from '../Config'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sweetAlert from 'sweetalert2'

function Loginpage() {
    const [user, Setuser] = useState({
        email : '',
        password : ''
    });
    const Dispatch = useDispatch();
    const Navigate = useNavigate();
    const HandleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(user.email!==''&& user.password!==''){
              await axios.post(SaleApp_API+'/login',user)
                .then((response)=>{
                    if(response.status === 200){
                        localStorage.setItem('token', response.data.Result.token);
                        localStorage.setItem('user', JSON.stringify(response.data.Result.userInfo));
                        Dispatch({type : "LOGIN", payload: response.data.Result.userInfo})
                        Navigate("/addsales")
                    }
                })
                .catch(err => {
                    sweetAlert.fire({
                        icon: "error",
                        title: err.response.data.error_msg
                    })
                })
            }
            else{
                if(user.email===''){
                    document.getElementById('EmailErrorHandler').style.display = 'block'
                }
                if(user.password===''){
                    document.getElementById('PasswordErrorHandler').style.display = 'block'
                }
            }
        } catch (error) {
            sweetAlert.fire({
                icon: "error",
                title: error.response.data.error_msg
            })
        }
    }
    return (
        <div className='container'>
            <h1 className='mobile-container text-center mt-5'>LOGIN FORM</h1>
            <div className="mobile-style shadow-sm p-3 mt-3 w-75 m-auto .bg-light-subtle">
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control shadow-sm fs-5 py-2" id="mail_id" name="email" value={user.email} onChange={(e)=>Setuser({...user,email : e.target.value})} />
                        <span className='errorMessage ps-3' id="EmailErrorHandler">Invalid Entry</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control shadow-sm fs-5 py-2" id="password" name="password" value={user.password} onChange={(e)=>Setuser({...user,password : e.target.value})} />
                        <span className='errorMessage ps-3' id="PasswordErrorHandler">Invalid Entry</span>
                    </div>
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Loginpage