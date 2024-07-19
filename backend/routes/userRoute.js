import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticate from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/").get(isAuthenticate,getOtherUsers);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);



export default router;



