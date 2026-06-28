const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role_rank >= 2) {
    return next();
  }
  res.redirect("/");
};

export { isAdmin };
