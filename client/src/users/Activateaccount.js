import React,{useEffect,useState,Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {Button,Card, Typography,Box} from '@mui/material';
import { Link, Navigate,useParams} from 'react-router-dom';
import jwt from 'jwt-decode';
import {ToastContainer,toast} from 'react-toastify';
import auth from '../auth/auth-helpers';
import {activateAccount} from '../auth/auth-api.js';
import Image from '../assets/images/pexels-jj-jordan-7981894.jpg';
const Activateaccount=()=>{
    const [values,setValues]=useState({
        username: '',
        token: '',
        redirectToRefferer:false,
        show:true
    });
    const params=useParams();
    useEffect(()=>{
       
        let token=params.token;
        console.log(token);
        let decodedToken=jwt(token);
        console.log(decodedToken);
        let username=decodedToken.username;
        if(token){
            setValues({...values,username,token})
        }
    },[])
    const { username, token,show}=values;
    const handleSubmit=(event)=>{
        const passedToken={
            token:token
        };
        event.preventDefault();
        activateAccount(passedToken).then((data)=>{
            console.log(data);
           
            if(data.error){
                
                toast.error(data.error,{
                     position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }else{
                 toast.success(data.message,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        })
         setValues({...values,show:false,redirectToRefferer:true});
            }
           
        }).catch((err)=>{
            console.error(err);
            toast.error(err.error,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        })
        })
    }
     
    return (
        <Fragment>
      
            {/* {auth.isAuthenticated ? <Navigate to="/"/> : null} */}
             <ToastContainer />
          
            <Card sx={{display:'grid',gridTemplateColumns:'300px 300px', width: 600, height:400,position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%,-50%)'}}>

                <Box sx={{
                    display:'grid',
                    gridTemplateRows: " 50px 30px"
                }}>
                 <Typography variant="h6" sx={{
                     width: '100%'
                 }}>
                    Welcome {username}.
                </Typography><br/>
                <form onSubmit={handleSubmit} sx={{
                    width: "100%"
                }}>
                    <Button variant="contained" sx={{
                        width: 240,
                        height: 40,
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        backgroundColor: '#2F80ED',
                        ':hover':{
                            color: 'white',
                            backgroundColor: '#2F8003'
                        }
                    }} onClick={handleSubmit}>
                        Activate your account
                    </Button>
                </form>

                </Box>
                <Box>
                    <img src={Image} alt="pexels"/>
                </Box>

            </Card>
      </Fragment>
    )
};

export default Activateaccount;