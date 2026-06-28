import { Router } from "express";
import {
  getJoinClubForm,
  postJoinClub,
  getAdminPasscodeForm,
  postAdminPasscode,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { redirectIfRankAtLeast } from "../middleware/redirectIfRankAtLeast.js";
import { redirectUnlessRankStrictlyBetween } from "../middleware/redirectUnlessRankStrictlyBetween.js";

const userRouter = Router();

userRouter.get("/join-club", isAuthenticated, redirectIfRankAtLeast(1, "/"), getJoinClubForm);

userRouter.post("/join-club", isAuthenticated, redirectIfRankAtLeast(1, "/"), postJoinClub);

userRouter.get(
  "/admin-passcode",
  isAuthenticated,
  redirectUnlessRankStrictlyBetween(0, 2, "/"),
  getAdminPasscodeForm,
);

userRouter.post(
  "/admin-passcode",
  isAuthenticated,
  redirectUnlessRankStrictlyBetween(0, 2, "/"),
  postAdminPasscode,
);

export { userRouter };
