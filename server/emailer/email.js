import nodemailer from 'nodemailer';
import {config} from '../config/config.js';

export const sendEmail =async options=>{
    let transporter=nodemailer.createTransport({
        host:config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        auth:{
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: 'Author  Name <authorname@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transporter.sendMail(mailOptions);
}

