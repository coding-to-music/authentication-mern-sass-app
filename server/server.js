import express from 'express';
import http from 'http';
import process from 'process';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import {config} from './config/config.js';
import {normalizePort,onError,onListening,handle404,basicErrorHandler} from './helpers/appSupport.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
mongoose.Promise=global.Promise;

const app=express();

//Display this in color using color library
//Get mongoose version 
console.info(mongoose.version);
mongoose.connect(config.DATABASE_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.info(`Successfully connected to the Database !`)
}).catch((err)=>{
    console.error(err)
})
mongoose.connection.on('error',()=>{
    throw new Error(`Unable to connect to the Database ${config.DATABASE_URI}`)
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//enable cors origin
app.use(cors());

//router funtion list
app.use('/api/v1',userRoutes);
app.use('/api/v1',authRoutes);

//security modules
app.use(compress());
app.use(helmet());
app.use(cookieParser());
//Only run in development mode
//Morgan give information about each request .
//Cors allow to deal with react for localhost without any problem
if(process.env.NODE_ENV==='development'){
    // app.use(cors({
    //     origin:config.CLIENT_URI
    // }));
    app.use(morgan('dev'))
}
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors());
// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "error": err.name+":"+err.message
        })
    }else if(err){
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).json({
            "error": err.name + ":"+err.message
        })
    }
})

export const port = normalizePort(config.PORT);
app.set('port', port);
export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);