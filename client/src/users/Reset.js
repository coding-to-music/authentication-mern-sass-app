import React,{Fragment,useState,useEffect} from 'react';
import jwt from 'jwt-decode';
import {ToastContainer,toast} from 'react-toastify';
import {Button,Card, Typography,Box,TextField,InputAdornment} from '@mui/material';
import {Link,Navigate,useParams} from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import Image from '../assets/images/pexels-jj-jordan-7981894.jpg';
import {resetPassword} from '../auth/auth-api.js';

const Reset=()=>{

    const [values,setValues]=useState({
        password: '',
        confirmPassword: '',
        token: '',
        decodedToken: '',
        error: ''
    });
    const {password,confirmPassword,token,decodedToken}=values;
    let params=useParams();
    useEffect(()=>{
        let token=params.token;
        let  decodedToken=jwt(token);
        if(decodedToken){
            setValues({...values,password,confirmPassword,decodedToken})
        }
    },[])
    const handleChange= name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };
    const handleSubmit=(event)=>{
        const passedToken={
            newPassword: password,
            resetPasswordLink:  decodedToken
        }
        event.preventDefault();
        resetPassword(passedToken).then((res)=>{
            setValues({...values,password: '',confirmPassword:''});
            toast.success(res.data.message,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }).catch(error=>{
                console.error(error);
                toast.error('Something went wrong !')
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
                Welcome .
            </Typography><br/>
            <form  sx={{
                width: "100%"
            }}>
                  <TextField id="Password" name="password" label="password" size="small" className="textField"  sx={{height: 48,  width: 270,
                    marginRight: 1,
                    marginLeft: 1,}}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <LockIcon sx={{ fontSize: 20,color:"#828282"}}/>
                        </InputAdornment>
                    }}
                    />
                     <TextField id="Password" name="Password" label="Confirm Password" size="small" className="textField"  sx={{height: 48, width: 270 ,
                    marginRight: 1,
                    marginLeft: 1,}}
                    value={values.email}
                    onChange={handleChange('password')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <LockIcon sx={{ fontSize: 20,color:"#828282"}}/>
                        </InputAdornment>
                    }}
                    />
                <Button variant="contained" sx={{
                    width: 270,
                    marginRight: 1,
                    marginLeft: 1,
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
                   
                }}
                onClick={handleSubmit}
                >
                    Activate your account
                </Button>
            </form>

            </Box>
            <Box>
                <img src={Image} sx={{}} alt="pexels"/>
            </Box>

        </Card>
  </Fragment>
    )
};

export default Reset;