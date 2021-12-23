import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import extend from 'lodash';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import { validationResult } from 'express-validator';
import User from '../models/user.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import { sendEmail } from '../emailer/email.js';
import { config } from '../config/config.js';
let token;
const signToken = (id) => {
  return jwt.sign({ id: id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ username: req.body.username }))
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: 'user already exits!',
      });
    }
    const newUser = await new User(req.body);
    const token = jwt.sign(
      {
        username,
        email,
        password,
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );
    let activationLink = `${config.CLIENT_URI}/users/activate/${token}`;
    let entrepriseName = config.ENTREPRISE_NAME;

    let message = `<h2 color="blue" style="text-align:center">${entrepriseName}</h2><br/>
        <h3>Welcome <span color="violet">${req.body.username} !</span></h3>
        <p>Thanks you for registering up for ${entrepriseName}.</p>
        <p>Please verify your email address by clicking the button below.</p><br/><br/><br/>
        <a href="${activationLink}">
        <button 
        style="display:center;align-items:center;justify-content:center;height:50;width: 120
        ">Confirm my account</button>
        </a><br/><br/>
          <p>Alternatively you can copy and paste the URL into your broswer: ${activationLink} </p>
          <p>If you didn't intend this just ignore this message.</p>
          <p>This Email was sent from ${entrepriseName}</p>
        `;

    await sendEmail({
      email: newUser.email,
      subject: 'Activate your account.',
      message,
    });
    res.status(StatusCodes.CREATED).json({
      status: getReasonPhrase(StatusCodes.CREATED),
      token: {
        token,
      },
      message: 'Successfully sign up!',
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      errMsg: err,
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      //verificaation fo the token
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: getReasonPhrase(StatusCodes.UNAUTHORIZED),
            error: 'could not register. Please login again',
          });
        } else {
          // Get user information from the generated token
          console.log(decoded);
          const username = decoded.username;
          const email = decoded.email;
          const password = decoded.password;

          const user = new User({
            username,
            email,
            password,
          });
          user.save((err, user) => {
            if (err) {
              return res.status(StatusCodes.UNAUTHORIZED).json({
                error: 'Something went wrong . Please retry to signup !',
                errorMessage: err,
              });
            } else {
              let message = `<h3>Welcome <span color="violet">${username} !</span></h3>
                            <h4>Thanks you for activate your account !</h4>`;
              sendEmail({
                email: email,
                subject: 'Thanks for activating your account.',
                message,
              });
              return res.status(StatusCodes.OK).json({
                status: getReasonPhrase(StatusCodes.OK),
                message: 'Succesfully signed Up!',
                data: {
                  user,
                },
              });
            }
          });
        }
      });
    }
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      error: 'Could not activate your account. Please retry to Sign UP!',
      errorMessage: err,
    });
  }
};

const signin = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: getReasonPhrase(StatusCodes.NOT_FOUND),
        error: 'User not found!',
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        status: getReasonPhrase(StatusCodes.NOT_FOUND),
        error: " Username and password don't match.",
      });
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      error: 'Could not signin!',
      errorMessage: errorHandler.getErrorMessage(err),
    });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status('200').json({
    message: 'signed out',
  });
};

const requireSignin = expressJwt({
  secret: config.JWT_SECRET,
  algorithms: ['RS256'],
  requestProperty: 'auth',
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id && req.auth._id;
  if (!authorized) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: getReasonPhrase(StatusCodes.FORBIDDEN),
      message: 'Access not auhtorized !',
    });
  }
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: getReasonPhrase(StatusCodes.UNAUTHORIZED),
          message: `You don't have permission to perform this action !`,
        })
      );
    }
  };
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: getReasonPhrase(StatusCodes.NOT_FOUND),
        error: 'User with that email does not exists!',
      });
    }
    console.log('Hello');

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
    console.log(token);
    const redirectLink = `${config.CLIENT_URI}/users/reset/password/${token}`;
    let entrepriseName = config.ENTREPRISE_NAME;
    let message = `<h2 color="blue" style="text-align:center">${entrepriseName}</h2><br/>
         <p>Click the button bellow to reset your password</p>
        <a href='${redirectLink}'><button>Click here</button></a>
           <p>Alternatively you can copy and paste the URL into your broswer: ${redirectLink} </p>
          <p>If you didn't intend this just ignore this message.</p>
           <p>This Email was sent from ${entrepriseName}</p>
         `;

    return user
      .updateOne(
        {
          resetPasswordLink: token,
        },
        (err) => {
          if (err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).json({
              status: getReasonPhrase(StatusCodes.BAD_REQUEST),
              error: 'Something went wrong !',
            });
          } else {
            sendEmail({
              email: user.email,
              subject: 'Reset Password Link',
              message,
            });
            return res.status(StatusCodes.OK).json({
              status: getReasonPhrase(StatusCodes.OK),
              message: 'Email sucessfully sent !',
              data: {
                user,
              },
            });
          }
        }
      )
      .clone();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      errorMessage: err,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetPasswordLink, newPassword } = req.body;
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, config.JWT_SECRET, function (err, decoded) {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: 'Expires token. Please try again',
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            res.status(StatusCodes.BAD_REQUEST).json({
              message: 'Something went wrong , try again later!',
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: '',
          };

          user = _.extend(user, updatedFields);
          user.save((err, result) => {
            if (err) {
              res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Something went wrong while reseting Password',
              });
            }
            res.status(StatusCodes.OK).json({
              status: getReasonPhrase(StatusCodes.OK),
              message: 'Great! Now, you can login with your new Password!',
            });
          });
        });
      });
    }
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      errorMessage: err,
    });
  }
};

const client = new OAuth2Client(config.GOOGLE_CLIENT);

const googleController = async (req, res) => {
  try {
    const { idToken } = req.body;
    client
      .verifyIdToken({ idToken, audience: config.GOOGLE_CLIENT })
      .then((res) => {
        const { email_verified, username, email } = res.payload;
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
                expiresIn: config.JWT_EXPIRES_IN,
              });
              const { _id, username, email, role } = user;
              return res.status(StatusCodes.OK).json({
                status: getReasonPhrase(StatusCodes.OK),
                token,
                user: {
                  _id,
                  username,
                  email,
                  role,
                },
              });
            } else {
              let password = email + config.JWT_SECRET;
              user = new User({
                username,
                email,
                password,
              });
              user.save((err, data) => {
                if (err) {
                  console.log('ERROR While saving user !.', err);
                  return res.status(StatusCodes.BAD_REQUEST).json({
                    status: getReasonPhrase(StatusCodes.BAD_REQUEST),
                    error: 'User Signup failed with Google',
                  });
                } else {
                  const token = jwt.sign({ _id: data._id }, config.JWT_SECRET, {
                    expiresIn: config.JWT_EXPIRES_IN,
                  });
                  const { _id, username, email, role } = data;
                  return res.status(StatusCodes.OK).json({
                    status: getReasonPhrase(StatusCodes.OK),
                    user: {
                      _id,
                      username,
                      email,
                      role,
                    },
                  });
                }
              });
            }
          });
        } else {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: getReasonPhrase(StatusCodes.BAD_REQUEST),
            error: 'Google login failed!Please try again!',
          });
        }
      });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      message: 'Google login error!',
    });
  }
};

const facebookLoginController =(req,res)=>{

      const {userID,accessToken}=req.body;
      const url=`https://graph.facebook.com/v4.0/${userID}?fields=id,username,email&access_token=${accessToken}`;

      return fetch(url,{
        method: 'GET'
      }).then((response)=>{
        return response.json()
      }).then(response=>{
        const {email,username}=response;
        User.findOne({email}).exec((err,user)=>{
          if(user){
            const token=jwt.sign({id:user._id},config.JWT_SECRET,{
              expiresIn: config.JWT_EXPIRES_IN
            })
            const {_id,username,email,role}=data;
            return res.status(StatusCodes.OK).json({
              status: getReasonPhrase(StatusCodes.OK),
              token,
              data:{
                _id,
                username,
                email,
                role
              }
            })
      
          }else{
            let password=email+ config.JWT_SECRET;
            const user=new User({username,email,password});
            user.save((err,data)=>{
              if(err){
                return res.status(StatusCodes.BAD_REQUEST).json({
                  status:getReasonPhrase(StatusCodes.BAD_REQUEST),
                   error: 'Something went wrong while saving user in the databse'
                })
              }
                const token=jwt.sign({_id:data._id},config.JWT_SECRET,{
                  expiresIn: config.JWT_EXPIRES_IN
                });
                const {_id,email,username,role}=data;
                return res.status(StatusCodes.OK).json({
                  token,
                  user:{
                    _id,
                    username,
                    email
                  }
                })
            
            })
          }
        })
      
      }).catch((err)=>{
        console.error(err);
        res.json({
          error: 'Facebook login failed ! Please try again!'
        });
      })
   
    
}
export default {
  register,
  signin,
  activateAccount,
  signout,
  requireSignin,
  hasAuthorization,
  restrictTo,
  forgetPassword,
  resetPassword,
  googleController,
  facebookLoginController
};



