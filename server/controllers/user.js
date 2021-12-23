import User from "../models/user.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import { StatusCodes,getReasonPhrase } from 'http-status-codes';
import extend from 'lodash';
import formidable from 'formidable';
import fs from 'fs';
// import profileImage from '../assets/images/3551739.jpg';
// import process from 'process';
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(StatusCodes.CREATED).json({
      status: getReasonPhrase(StatusCodes.CREATED),
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: getReasonPhrase(StatusCodes.BAD_REQUEST),
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getAllUsers =async (req,res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
      } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: getReasonPhrase(StatusCodes.BAD_REQUEST),
          error: errorHandler.getErrorMessage(err)
        })
      }
};

const userById= async (req,res,next,id) => {
    try {
        let user = await User.findById(id)
        if (!user)
          return res.status(StatusCodes.NOT_FOUND).json({
            status: getReasonPhrase(StatusCodes.NOT_FOUND),
            error: "User not found"
          })
        req.profile = user
        next()
      } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: getReasonPhrase(StatusCodes.BAD_REQUEST),
          error: "Could not retrieve user"
        })
      }
}
const read = async (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
};


const update =async (req,res) => {
    const form= new formidable.IcomingForm();
    form.keepExtensions=true;
    form.parse(req,async(err,fields,files)=>{
      if(err){
        return res.status(400).json({
          error: 'Photo could not be uploaded!'
        })
      }
      let user=req.profile;
      user=extend(user,req.body);
      user.updatedAt=Date.now();
      if(files.photo){
        user.photo.data=fs.readFileSync(files.photo.path)
        user.photo.contentType=files.photo.type
      }
    })
    try{
       
        await user.save();
        user.hashed_password=undefined;
        user.salt = undefined;
        res.json(user);
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status:getReasonPhrase(StatusCodes.BAD_REQUEST),
            error:errorHandler.getErrorMessage(err)
        })
    }
};

const remove = async(req,res) => {
    try{
        let user=req.profile;
        let deletedUser= await user.remove();
        deletedUser.hashed_password=undefined;
        deletedUser.salt=undefined;
        res.json(deletedUser);
    }catch(err){ 
        return res.status(StatusCodes.BAD_REQUEST).json({
            status:getReasonPhrase(StatusCodes.BAD_REQUEST),
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const photo=(req,res,next)=>{
  if(req.profile.photo.data){
    res.set('Content-Type',req.profile.photo.contentType);
    return res.send(req.profile.photo.data)
  }
  next();
}

// const defaultPhoto=(req,res)=>{
//   res.send(process.cwd()+profileImage);
// }

export default {
  create,
  read,
  userById,
  getAllUsers,
  update,
  remove,
  photo
};
