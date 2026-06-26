import bcrypt from "bcrypt";
import { validationResult, matchedData } from "express-validator";
import { createUser, getRoleIdByName } from "../db/queries/userQueries.js";

const getSignupForm = (req, res) => {
  res.render("signup", { errors: [], formData: {} });
};

const postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", { errors: errors.array(), formData: req.body });
  }

  const { first_name, last_name, email, password } = matchedData(req);
  try {
    const password_hash = await bcrypt.hash(password, 12);
    const role_id = await getRoleIdByName("user");
    const user = await createUser({ first_name, last_name, email, password_hash, role_id });

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
};

const getLoginForm = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", {
    errors: messages.length > 0 ? [messages[messages.length - 1]] : [],
    formData: {},
  });
  return;
};

const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { getSignupForm, postSignup, getLoginForm, postLogout };
