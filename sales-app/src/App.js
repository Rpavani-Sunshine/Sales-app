import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Addsales from './pages/Addsales';
import Topsales from './pages/Topsales';
import Revenue from './pages/Revenue';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

function App() {
  // const Dispatch = useDispatch();
  // useEffect(()=>{
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   Dispatch({type:"LOGOUT"})
  // },[])
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Loginpage/>}></Route>
          <Route exact path="/addsales" element={<Addsales/>}></Route>
          <Route exact path="/topsales" element={<Topsales/>}></Route>
          <Route exact path="/revenue" element={<Revenue/>}></Route>
          <Route exact path="/login" element={<Loginpage/>}></Route>
          <Route exact path="/register" element={<Registrationpage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
