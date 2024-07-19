import express from "express";
import { getMessage, sendMessage } from "../controllers/messageControllers.js";
import isAuthenticate from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticate, sendMessage);
router.route("/:id").get(isAuthenticate, getMessage);

export default router;