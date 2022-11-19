import ErrorResponse from "../utils/errorResponse.js";
import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token === undefined) {
    return next(
      new ErrorResponse(
        "You are not authorized to access this, Please Login first",
        401
      )
    );
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(id);
  next();
};

export const authorizeRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new ErrorResponse(`Only ${role} can access this`));
    }
    next();
  };
};
