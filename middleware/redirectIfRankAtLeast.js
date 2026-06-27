const redirectIfRankAtLeast = (minRank, redirectPath) => {
  return (req, res, next) => {
    if (req.user && req.user.role_rank >= minRank) {
      return res.redirect(redirectPath);
    }
    next();
  };
};

export { redirectIfRankAtLeast };
