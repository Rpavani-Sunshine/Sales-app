import React from 'react'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
    const Dispatch = useDispatch();
    const Navigate = useNavigate();
    const User = useSelector(state=>state.userReducer);
    //Function to display Logout
    const logoutHandler = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            Dispatch({type:"LOGOUT"})
            Navigate("/login");
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">SALES APP</a>
                    {/*Toggle button to collapse navbar in small screens */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Navbar Code */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/addsales">ADD SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/topsales">TOP SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/revenue">TODAY TOTAL REVENUE</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">LOGIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logoutHandler}>LOGOUT</a>
                            </li>
                        </ul>
                    </div>
                </div>  
            </nav>
        </div>
    )
}

export default Navbar