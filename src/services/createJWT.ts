export const jwtValidity = 24 * 60 * 60; // 1 day
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default function createJWT(id: Types.ObjectId) {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: jwtValidity,
  });
}
