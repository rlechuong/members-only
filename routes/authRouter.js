import { Router } from "express";
import { validateSignup } from "../middleware/validateSignup.js";
import { getSignupForm, postSignup } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", getSignupForm);

authRouter.post("/signup", validateSignup, postSignup);

export { authRouter };
