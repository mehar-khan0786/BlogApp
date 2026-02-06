import express from 'express';
import { logoutUser, registerUser } from '../controller/user.controller.js';
import { loginUser } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleWare/authUser.js';
import { getMyProfile,getAdmins } from '../controller/user.controller.js';
const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',isAuthenticated,logoutUser);


router.get('/myprofile',isAuthenticated,getMyProfile);
router.get('/admins',getAdmins);

export default router;