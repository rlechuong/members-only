import { updateUserRole, getRoleIdByName } from "../db/queries/userQueries.js";

const getJoinClubForm = (req, res) => {
  res.render("joinClub", { error: null });
};

const postJoinClub = async (req, res, next) => {
  if (req.body.passcode !== process.env.CLUB_PASSCODE) {
    return res.render("joinClub", { error: "Incorrect passcode." });
  }

  try {
    const roleId = await getRoleIdByName("member");
    await updateUserRole(req.user.id, roleId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const getAdminPasscodeForm = (req, res) => {
  res.render("adminPasscode", { error: null });
};

const postAdminPasscode = async (req, res, next) => {
  if (req.body.passcode !== process.env.ADMIN_PASSCODE) {
    return res.render("adminPasscode", { error: "Incorrect passcode." });
  }

  try {
    const roleId = await getRoleIdByName("admin");
    await updateUserRole(req.user.id, roleId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export { getJoinClubForm, postJoinClub, getAdminPasscodeForm, postAdminPasscode };
