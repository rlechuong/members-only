import { Router } from "express";
import { getHomePage } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", getHomePage);

export { messageRouter };
