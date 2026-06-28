import { Router } from "express";
import {
  getHomePage,
  getNewMessageForm,
  postNewMessage,
  postDeleteMessage,
} from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validateMessage } from "../middleware/validateMessage.js";
import { isAdmin } from "../middleware/isAdmin.js";

const messageRouter = Router();

messageRouter.get("/", getHomePage);

messageRouter.get("/messages/new", isAuthenticated, getNewMessageForm);

messageRouter.post("/messages", isAuthenticated, validateMessage, postNewMessage);

messageRouter.post("/messages/:id/delete", isAdmin, postDeleteMessage);

export { messageRouter };
