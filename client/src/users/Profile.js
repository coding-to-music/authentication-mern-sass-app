import React, {useState,useEffect} from 'react';
import { Link,Navigate, useParams} from 'react-router-dom';
import { read } from './api-users.js';
import auth from '../auth/auth-helpers.js';
import {IconButton,Menu,MenuItem} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../styles/profile.css';

export default function Profile({match}) {
    const [user,setUser]=useState({});
    const [anchorEl, setAnchorEl]=useState(null)
    const parameter=useParams();
    console.log(parameter);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const [redirectToSignin,setRedirectToSignin]=useState(false);
    useEffect(() => {
        const abortController=new AbortController();
        const signal=abortController.signal;
        const jwt=auth.isAuthenticated();
        console.log(jwt.token);
        read({
            userId:parameter.userId
        },{t:jwt.token},signal).then((data)=>{
            console.log(data);
            if(data.error){
                setRedirectToSignin(true)
                console.log(data.error);
            }
            console.log(data);
            console.log(user);
            setUser(data)
        }).catch((err)=>{
            console.error(err)
        })
        return function cleanup(){
            abortController.abort()
        };
    }, [parameter.userId]);
    if(redirectToSignin) {
        return (
            <Navigate to="/users/sigin" />
        )
    }
    return (
        <div className="profile__container">
            <div className="navbar__container">
                <div className="navbar__logo">
                        devchallenges
                </div>
                <div className="user__container">
                <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>Group Chat</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
            </div>
                </div>
            </div>
            <div className="text__container">
                <h3>Personal Info</h3>
                <p>Basic info, like your name and Photo</p>
            </div>
          <div className="card__container">
            <div className="profile__card__container">

                <div className="profile__container__header">
                    <div className="profile__header-text">
                      <h4>Profile</h4>
                      <p>Some info may be visible to some user.</p>
                    </div>
                    {
                      auth.isAuthenticated().user && auth.isAuthenticated._id == user._id && (
                        <button className="btn">Edit</button>
                      )
                    }
                  
                </div>
                <div className="profile__info__container">
                    <div className="user__info__name">
                       Photo
                    </div>
                    <div className="user__info__content">
                       {user.photo}
                    </div>
                </div>
                 <div className="profile__info__container">
                    <div className="user__info__name">
                       Name
                    </div>
                    <div className="user__info__content">
                       {user.username}
                    </div>
                </div>
                <div className="profile__info__container">
                    <div className="user__info__name">
                       Bio
                    </div>
                    <div className="user__info__content">
                       {user.description}
                    </div>
                </div>
                <div className="profile__info__container">
                    <div className="user__info__name">
                       Email
                    </div>
                    <div className="user__info__content">
                       {user.email}
                    </div>
                </div>
                <div className="profile__info__container">
                    <div className="user__info__name">
                       password
                    </div>
                    <div className="user__info__content">
                       {user.password}
                    </div>
                </div>
            </div>
          </div>
           
        </div>
    )
}
