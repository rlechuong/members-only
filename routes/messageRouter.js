import { Router } from "express";
import {
  getHomePage,
  getNewMessageForm,
  postNewMessage,
} from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validateMessage } from "../middleware/validateMessage.js";

const messageRouter = Router();

messageRouter.get("/", getHomePage);

messageRouter.get("/messages/new", isAuthenticated, getNewMessageForm);

messageRouter.post("/messages", isAuthenticated, validateMessage, postNewMessage);

export { messageRouter };
