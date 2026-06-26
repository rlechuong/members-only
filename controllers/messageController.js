import { getAllMessages } from "../db/queries/messageQueries.js";

const getHomePage = async (req, res, next) => {
  try {
    const messages = await getAllMessages();
    res.render("index", { messages });
  } catch (err) {
    return next(err);
  }
};

export { getHomePage };
