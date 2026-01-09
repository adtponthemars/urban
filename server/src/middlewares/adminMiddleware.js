/**
 * Admin authorization middleware
 * Must be used AFTER authMiddleware
 */
export const adminMiddleware = (req, res, next) => {
  // req.user is set by authMiddleware
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Admin only.",
  });
};
