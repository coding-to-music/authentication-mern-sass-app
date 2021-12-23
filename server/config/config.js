import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

export const config={
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CLIENT_URI: process.env.CLIENT_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_URI: process.env.DATABASE_URI,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    ENTREPRISE_NAME: process.env.ENTREPRISE_NAME,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    TWITTER_CALLBACK_HOST: process.env.TWITTER_CALLBACK_HOST,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET
};


