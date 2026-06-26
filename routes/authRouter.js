import { Router } from "express";
import passport from "passport";
import { getSignupForm, postSignup, getLoginForm } from "../controllers/authController.js";
import { validateSignup } from "../middleware/validateSignup.js";
import { redirectIfAuthenticated } from "../middleware/redirectIfAuthenticated.js";

const authRouter = Router();

authRouter.get("/signup", redirectIfAuthenticated, getSignupForm);

authRouter.post("/signup", redirectIfAuthenticated, validateSignup, postSignup);

authRouter.get("/login", redirectIfAuthenticated, getLoginForm);

authRouter.post(
  "/login",
  redirectIfAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
);

export { authRouter };
