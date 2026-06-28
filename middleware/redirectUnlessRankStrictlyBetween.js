const redirectUnlessRankStrictlyBetween = (minRank, maxRank, redirectPath) => {
  return (req, res, next) => {
    const rank = req.user && req.user.role_rank;
    if (rank === undefined || rank <= minRank || rank >= maxRank) {
      return res.redirect(redirectPath);
    }
    next();
  };
};

export { redirectUnlessRankStrictlyBetween };
