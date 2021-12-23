import React, {useState,Fragment} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField,Card,CardContent,Typography,Button,IconButton,InputAdornment,Dialog, DialogContent,DialogTitle,DialogContentText,DialogActions} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import CodeIcon from '@mui/icons-material/Code';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {register} from '../auth/auth-api.js';


const Register= ()=>{
    const [values,setValues]=useState({
        username: '',
        email: '',
        password: '',
        error: '',
        open:false
    });
    const emailFilter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const {username,email,password}=values;
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };
    const clickSubmit= ()=>{
        // toast.info("Hello, I am the click submit alert!");
        const user={
            username: values.username || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };
        if(user.username && user.email && user.password){
            if(user.password && user.password.length <8){
                toast.error("Password must be greater than 8 characters",{
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if(!emailFilter.test(user.email)){
                toast.error("Please,provide a valid email!",{
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            /*
            **Minimum 8 charaters
            **at least 1 symbol
            ** at least 1 uppercase letter
            ** at least 1 lowercae letter
            ** at least 1 number
            */
            if(user.password && user.password.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
                toast.error("Please, provide a strong password.",{
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            
        }else{
            toast.error("Please fill all the input field",{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        register(user).then((data)=>{
            console.log(data);
            console.log('data');
            if(data.error){
                console.log(data.error);
                setValues({...values,error:data.error});
                toast.error("Something went wrong !Please Try again!",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }else{
                setValues({...values,error: '',open:true})
            }
        }).catch((err)=>{
            console.error(err)
        })
    }
    return (
        <Fragment>
         <ToastContainer/>
        <Card 
        sx={{
            width: 340,
            height: 600,
            borderColor: '#BDBDBD',
            borderRadius: '24px',
            backgroundColor: 'white',
            borderSize: '1px',
            display:'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'row',
                wiidth: '60px',
                alignItems:'center',
                justifyContent: 'center',
                textAlign:'center',
                mt: 2
            }}>
                <IconButton sx={{
                    color: 'red'
                }}>
                    <CodeIcon/>
                </IconButton>
                <Typography variant="p" sx={{
                    bgColor: '#282051',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}>
                    devchallenges
                </Typography>
            </CardContent>
                <Typography variant="p" sx={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#333333',
                    lineHeight: '25px',
                    fontFamily: 'Noto Sans',
                    paddingLeft: '20px',
                    width: '300px',
                    height: '50px'
                }}>
                    Join thousand of learners around the world .
                </Typography>
                <Typography variant="p" sx={{
                    color: '#333333',
                    fontSize: '16px',
                    lineHeight: '22px',
                    fontFamily: 'Noto Sans',
                    width: 300,
                    height: 66,
                    marginLeft: '30px',
                    mt: 1
                }}> 
                    Master web development by making real-life projects.There are multiple paths for you to choose.
                </Typography>
                <CardContent sx={{textAlign:'center'}}>
                <TextField id="username" name="username" label="username" size="small" className="textField"  sx={{height: 48,width: 270}}
                    value={values.username}
                    onChange={handleChange('username')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <PersonIcon sx={{ fontSize: 20,color:"#828282"}}/>
                        </InputAdornment>
                    }}
                    />
                <TextField id="email" name="email" label="email" size="small" className="textField"  sx={{height: 48, width: 270}}
                    value={values.email}
                    onChange={handleChange('email')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <MailIcon sx={{ fontSize: 20,color:"#828282"}}/>
                        </InputAdornment>
                    }}
                    />
                 <TextField id="password" name="password" label="Password" size="small" className="textField"  sx={{height: 48,width: 270}}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <LockIcon sx={{ fontSize: 20,color:"#828282"}}/>
                        </InputAdornment>
                    }}
                    />
                        
               
                    <Button className="submitBtn" onClick={clickSubmit} sx={{backgroundColor: '#2F80ED' ,width: '270px' , color: 'white',':hover':{color:'white',backgroundColor:'#0288d1'}}}>Sign Up</Button>
                </CardContent>
                <Typography className="trans_text" variant="p" sx={{fontSize: 12,display:'flex',alignItems:'center' , justifyContent: 'center',textAlign:'center'}}>
                    Or Sign Up with Social Profile
                </Typography>
                <CardContent 
                    className="socialIconContainer" 
                sx={{
                    display:'flex',
                    alignItems:'center' , 
                    justifyContent: 'center'}}
                    >
                    <IconButton sx={{borderRadius:'50%',border:'1px solid #828282',marginRight: '4px'}}>
                        <GoogleIcon/>
                    </IconButton>
                    <IconButton sx={{borderRadius:'50%',border:'1px solid #828282',marginRight: '4px'}}>
                        <FacebookIcon/>
                    </IconButton>
                    <IconButton sx={{borderRadius:'50%',border:'1px solid #828282',marginRight: '4px'}}>
                        <TwitterIcon/>
                    </IconButton>        
                </CardContent>
                <Typography variant="p" 
                sx={{
                    display:'flex',
                    alignItems:'center' , 
                    justifyContent: 'center',
                    fontSize:'12px'
                    }}>
                    Already menber ?
                    <Link to="/users/sigin">
                        <Typography className="signup_link" sx={{color:'#2F80ED',fontSize: 12,textDecoration: 'none'}}>
                            Log In
                        </Typography>
                    </Link>
                </Typography>
               
                {
                    values.open && (
                            <Dialog open={values.open}>
                                <DialogTitle>New Account</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        New Account Successfully created !
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Link to="/emailredirectpage">
                                            <Button color="primary" autoFocus="autoFocus" variant="contained">OK</Button>
                                    </Link>
                                </DialogActions>
                            </Dialog>
                    )
                }
        </Card>
        </Fragment>
    )
};

export default Register;