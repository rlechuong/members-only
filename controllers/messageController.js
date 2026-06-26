import { validationResult, matchedData } from "express-validator";
import { getAllMessages, createMessage } from "../db/queries/messageQueries.js";

const getHomePage = async (req, res, next) => {
  try {
    const messages = await getAllMessages();
    res.render("index", { messages });
  } catch (err) {
    return next(err);
  }
};

const getNewMessageForm = (req, res) => {
  res.render("newMessage", { errors: [], formData: {} });
};

const postNewMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("newMessage", { errors: errors.array(), formData: req.body });
  }

  try {
    const { title, body } = matchedData(req);
    const message = await createMessage({ title, body, author_id: req.user.id });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export { getHomePage, getNewMessageForm, postNewMessage };
