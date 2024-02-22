import React, { useState } from 'react'
import './Registrationpage.css'
import { SaleApp_API } from '../Config'
import sweetAlert from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Registrationpage() {
    const [userData, SetUserData] = useState({
        F_name : '',
        L_name : '',
        email : '',
        password : ''
    });
    const Navigate = useNavigate();
    const HandleSubmit = (event) => {
        event.preventDefault();
        try {
            if(userData.F_name!=='' && userData.L_name!=='' && userData.email!=='' && userData.password!==''){
                axios.post(SaleApp_API+"/userregister",userData)
                .then((data)=>{
                    if(data.status===200){
                        sweetAlert.fire({
                            icon: 'success',
                            title: "User registration successful"
                        })
                        Navigate('/login')
                    }
                })
                .catch(err=>{
                    sweetAlert.fire({
                        icon: 'error',
                        title: err.response.data.userError
                    })
                    Navigate('/login')
                })
            }
            else{
                if(userData.F_name===''){
                    document.getElementById('FNameErrorHandler').style.display = 'block'
                }
                if(userData.L_name===''){
                    document.getElementById('LNameErrorHandler').style.display = 'block'
                }
                if(userData.email===''){
                    document.getElementById('EmailErrorHandler').style.display = 'block'
                }
                if(userData.password===''){
                    document.getElementById('PasswordErrorHandler').style.display = 'block'
                }
            }
        } catch (error) {
            throw error;
        }
    }
    return (
        <div className='container'>
            <h1 className='mobile-container text-center mt-5'>REGISTRATION FORM</h1>
            <div className="mobile-style shadow-sm p-3 mt-3 w-75 m-auto .bg-light-subtle">
                <form onSubmit={HandleSubmit}>
                <div className="mb-3">
                        <label htmlFor="F_name" className="form-label">First Name</label>
                        <input type="text" className="form-control shadow-sm fs-5 py-2" id="F_name" name="F_name" value={userData.F_name} onChange={(e)=>SetUserData({...userData,F_name : e.target.value})} />
                        <span className='errorMessage ps-3' id="FNameErrorHandler">Invalid Entry</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="L_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control shadow-sm fs-5 py-2" id="L_name" name="L_name" value={userData.L_name} onChange={(e)=>SetUserData({...userData,L_name : e.target.value})} />
                        <span className='errorMessage ps-3' id="LNameErrorHandler">Invalid Entry</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control shadow-sm fs-5 py-2" id="mail_id" name="email" value={userData.email} onChange={(e)=>SetUserData({...userData,email : e.target.value})} />
                        <span className='errorMessage ps-3' id="EmailErrorHandler">Invalid Entry</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control shadow-sm fs-5 py-2" id="password" name="password" value={userData.password} onChange={(e)=>SetUserData({...userData,password : e.target.value})} />
                        <span className='errorMessage ps-3' id="PasswordErrorHandler">Invalid Entry</span>
                    </div>
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Registrationpage