import React,{useState,Fragment} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {forgetPassword} from '../auth/auth-api.js';
import 'react-toastify/dist/ReactToastify.css';
import {Box,TextField,InputAdornment,Card,Button,Typography} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Image from '../assets/images/pexels-jj-jordan-7981894.jpg';

const Forget = ()=>{
    const [values,setValues]=useState({
        email:'',
        error:''
    });
    const {email}=values;
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };
    const clickSubmit=()=>{
        const user={
            email: values.email || undefined
        };
        forgetPassword(user).then((data)=>{
            if(data.error){
                setValues({...values,error:data.error});
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
                setValues({...values,error:''});
                toast.success('Email succesfully sent ! Check your Email box.',{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }).catch((err)=>{
            console.error(err)
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
             <Typography variant="p" sx={{
                 width: '100%',
                 mr: 1,
                 ml: 1,
                 mt: 1
             }}>
                Enter your email account to reset your password
            </Typography><br/>
            <form  sx={{
                width: "100%",
                paddingRight: 15,
                padingLeft: 15
            }}>
                  <TextField id="email" name="email" label="email" size="small" className="textField"  sx={{height: 48, width: 270 ,marginRight: 1,
                    marginLeft: 1,}}
                    value={values.email}
                    onChange={handleChange('email')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <MailIcon sx={{ fontSize: 20,color:"#828282"}}/>
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
                }} onClick={clickSubmit}>
                    Get Password
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

export default Forget;