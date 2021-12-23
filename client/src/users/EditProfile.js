import React, {useState,Fragment} from 'react';
import { Navigate, useParams} from 'react-router-dom';
import { update} from './api-users.js';
import auth from '../auth/auth-helpers.js';
import {toast,ToastContainer} from 'react-toastify';
import {IconButton,Menu,MenuItem,TextField} from "@mui/material";
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../styles/profile.css';

const EditProfile=()=>{
    const [values,setValues]=useState({
        username: '',
        bio: '',
        phone: '',
        email: '',
        password: '',
        error: '',
        redirectToProfile:false,
        userId: ''
    });
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})
    }
    const [anchorEl, setAnchorEl]=useState(null)
    const parameter=useParams();
    console.log(parameter);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const clickSubmit=()=>{
          const user={
              username: values.username || undefined,
              bio: values.bio || undefined,
              phone: values.phone || undefined,
              email: values.email || undefined,
              password: values.password || undefined
          };
          const jwt=auth.isAuthenticated();
          console.log(jwt.token);
                update({userId:parameter.userId},{t:jwt.token},user).then((data)=>{
                    if(data && data.error){
                        setValues({...values, error: data.error});
                        toast.error(data.error,{
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }else{
                        setValues({...values,userId:data._id,redirectToProfile:true})
                    }
                })
      }

      if(values.redirectToProfile){
          return (
            <Navigate to={`/users/profile/`+values.userId} />  
          )       
      }
    return (
        <Fragment>
            <ToastContainer/>
            <div className="profile__edit__container">
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

                <div className="form__update__container">
                    <div className="card__header__text">
                        <h4>Change Info</h4>
                        <p>Change will be reflected to every service</p>
                    </div>
                    <div className="photo__continer">
                        <img src="" alt="user profile photo"/>
                        <p>Change photo</p>
                    </div>
                    <div className="input__container">
                    
                        <TextField id="outlined-basic" label="Username" value={values.username} onChange={handleChange('username')} className="inputStyle" variant="outlined" />
                    </div>
                    <div className="input__container">
                    
                        <TextField id="outlined-basic" label="Bio" value={values.bio} onChange={handleChange('bio')} className="inputStyle" variant="outlined" />
                    </div>
                    <div className="input__container">
                       
                        <TextField id="outlined-basic" label="Phone" value={values.phone} type="number" onChange={handleChange('phone')} className="inputStyle" variant="outlined" />
                    </div>
                    <div className="input__container">
                       
                        <TextField id="outlined-basic" label="Email" value={values.email} type="email" onChange={handleChange('email')} className="inputStyle" variant="outlined" />
                    </div>
                    <div className="input__container">
                       
                        <TextField id="outlined-basic" label="Password"  values={values.password} type="password" onChange={handleChange('password')} className="inputStyle" variant="outlined" />
                    </div>
                    <div className="input__container">
                            <Button variant="contained" className="btn" onClick={clickSubmit} disableElevation>Save</Button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
};

export default EditProfile;