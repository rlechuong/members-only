import { Router } from "express";
import { getJoinClubForm, postJoinClub } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { redirectIfRankAtLeast } from "../middleware/redirectIfRankAtLeast.js";

const userRouter = Router();

userRouter.get("/join-club", isAuthenticated, redirectIfRankAtLeast(1, "/"), getJoinClubForm);

userRouter.post("/join-club", isAuthenticated, redirectIfRankAtLeast(1, "/"), postJoinClub);

export { userRouter };
