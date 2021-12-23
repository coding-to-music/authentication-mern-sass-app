import express from 'express';
import authController from '../controllers/auth.js';
import passport from 'passport';
const router=express.Router();

router.route('/auth/register').post(authController.register);
router.route('/auth/signin').post(authController.signin);
router.route('/auth/activateaccount').post(authController.activateAccount);
router.route('/auth/signout').post(authController.signout);
router.route('/auth/forget/password').post(authController.forgetPassword);
router.route('/auth/reset/password').put(authController.resetPassword);
router.route('/googleLogin').post(authController.googleController);
router.route('/facebookLogin').post(authController.facebookLoginController);
router.route('/auth/twitter/').get(passport.authenticate('twitter'));
router.route('/auth/twitter/callback').get(passport.authenticate('twitter'));
export default router;