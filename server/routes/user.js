import express from 'express';
import userController from '../controllers/user.js';
const router=express.Router();

router.route('/users').post(userController.create)
                      .get(userController.getAllUsers);
router.route('/users/:userId').get(userController.read)
                             .put(userController.update)
                             .delete(userController.remove);
router.route('/users/photo/:userId').get(userController.photo);
// router.route('/users/photo/defaultphoto').get(userController.defaultPhoto);
router.param('userId', userController.userById)
export default router;