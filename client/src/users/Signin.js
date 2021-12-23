import React, {useState,Fragment} from 'react';
import {toast, ToastContainer } from 'react-toastify';
import { Link,Navigate,useNavigate} from 'react-router-dom';
import { TextField,Card,CardContent,Typography,Button,IconButton,InputAdornment} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import CodeIcon from '@mui/icons-material/Code';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {signin,googleLogin,facebookLogin,TwitterLogin} from '../auth/auth-api.js';
import auth from '../auth/auth-helpers.js';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const Signin = ()=>{
    const navigate=useNavigate();
    const [values,setValues]=useState({
        username: '',
        password: '',
        error: '',
        redirectToRefferer: false
    });
     const {username,password}=values;
    const handleChange= name=>event=>{
        setValues({...values,[name]:event.target.value})
    };
// Get google token
    const sendGoogleToken=(tokenId)=>{
        googleLogin({idToken:tokenId}).then(res=>{
            informParent(res);
            console.log(res);
        }).catch((err)=>{
            toast.error('Google login error !')
        })
    };
    //Get Twitter user data
    const sendTwitterToken=()=>{
        TwitterLogin().then(response=>{
            if(response.status == '200') return response.json();
            throw new Error('Failed to authenticate user!')
        }).catch((err)=>{
            toast.error('Failed to authenticate user!')
        })
    }

    
    const openNewTab=(url)=>{
        const newWindow=window.open(url,'_blank','noopener noreferrer');
        if(newWindow) return newWindow.opener=null
    }
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    const handleSigninClick=()=>{
        openNewTab(`${process.env.REACT_APP_SERVER_URL}/auth/twitter`)
    }
    //Get facebook token
    const sendFacebookToken=(userID,accessToken)=>{
        facebookLogin({userID,accessToken}).then((res)=>{
            console.log(res)      ;
            informParent(res);
        }).catch((err)=>{
            toast.error('Facebook authentication error!')
        })
    }
    //Get response from facebook
    const responseFacebook=response=>{
        console.log(response);
        sendFacebookToken(response.userID,response.accessToken);
    }
    //authenticate the user if something is OK
    const informParent =response=>{
        auth.authenticate(response,()=>{
            auth.isAuthenticated() ? navigate.push('/home') : navigate.push('/users/signin')
        })
    }
    //Get the response from google
    const responseGoogle=response=>{
        console.log(response);
        sendGoogleToken(response.tokenId)
    }
    const clickSubmit=()=>{
        const user={
            username: values.username,
            password: values.password
        };
        if(user.username && user.password){
             signin(user).then((data)=>{
                 console.log(data);
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
                toast.success("Successfully login",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                    auth.authenticate(data,()=>{
                        setValues({...values,error: '',redirectToRefferer:true})
                    });
                   
                }
            }).catch((err)=>{
                console.error(err)
            }) 
        }else{
            const message="Please,fill all the input field!";
            toast.error(message,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
        }
      
    };
   
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
                 <TextField id="password" name="password" label="Password" size="small" className="textField"  sx={{height: 48,width: 270}}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                                <LockIcon sx={{ fontSize: 20,color:"#828282"}}/>
                        </InputAdornment>
                    }}
                    />
                    <Button className="submitBtn" onClick={clickSubmit} sx={{backgroundColor: '#2F80ED' ,width: '270px' , color: 'white',':hover':{color:'white',backgroundColor:'#0288d1'}}}>Login</Button>
                </CardContent>
                <Typography className="trans_text" variant="p" sx={{fontSize: 12,display:'flex',alignItems:'center' , justifyContent: 'center',textAlign:'center'}}>
                    Or Log in with Social Profile
                </Typography>
                <CardContent 
                    className="socialIconContainer" 
                sx={{
                    display:'flex',
                    alignItems:'center' , 
                    justifyContent: 'center'}}
                    >
                    <IconButton sx={{borderRadius:'50%',border:'1px solid #828282',marginRight: '4px'}}>
                        <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_ID}`} 
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={
                            renderProps=>(
                                <GoogleIcon onClick={renderProps.onClick}
                                 disabled={renderProps.disabled} />
                            )
                        }
                        >
                              </GoogleLogin>
                      
                    </IconButton>
                    <IconButton sx={{borderRadius:'50%',border:'1px solid #828282',marginRight: '4px'}}>
                        <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_ID}`}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={
                            renderProps=>(
                                <FacebookIcon
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                />
                            )
                        }
                        />
                       
                    </IconButton>
                    <IconButton sx={{borderRadius:'50%',border:'1px solid #828282',marginRight: '4px'}}>
                        <TwitterIcon
                            onClick={handleSigninClick}
                        />
                        
                    </IconButton>        
                </CardContent>
                <Typography variant="p" 
                sx={{
                    display:'flex',
                    alignItems:'center' , 
                    justifyContent: 'center',
                    fontSize:'12px'
                    }}>
                    Don't have an account ?
                    <Link to="/users/register">
                        <Typography className="signup_link" sx={{color:'#2F80ED',fontSize: 12,textDecoration: 'none'}}>
                          Register
                        </Typography>
                    </Link>
                </Typography>
        </Card>
        {
            values.redirectToRefferer && (
                <Navigate to="/"/>
            )
        }
        </Fragment>
    )
};

export default Signin;