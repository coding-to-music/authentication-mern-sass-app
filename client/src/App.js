import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './core/Home.js';
import Register from './users/Register.js';
import Signin from './users/Signin.js';
import Activateaccount from './users/Activateaccount.js';
import Emailredirectpage from './core/Emailredirectpage';
import Profile from './users/Profile.js';
import Reset from './users/Reset.js';
import Forget from './users/Forget.js';
import EditProfile from './users/EditProfile.js';
import './App.css';

function App() {
  return (
    <div className="App">
       <Routes>
         <Route exact path="/" element={<Home />}/>
         <Route exact path="/users/register" element={<Register />}/>
         <Route exact path="/users/sigin"  element={<Signin />} />
         <Route exact path="/users/activate/:token" element={<Activateaccount/>} />} />
         <Route exact path="/emailredirectpage" element={<Emailredirectpage/>} />
         <Route exact path="/users/profile/:userId" element={<Profile/>} />
         <Route exact path="/users/profile/edit/:userId" element={<EditProfile/>} />
         <Route exact path="/users/reset/password/:token" element={<Reset />} />
         <Route exact path="/users/forget/password" element={<Forget/>} />
       </Routes>
    </div>
  );
}

export default App;
