import { Request, Response } from "express";
import User from "../modals/users";
import { handleErrors } from "../helper";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const jwtValidity = 24 * 60 * 60; // 1 day

function createJWT(id: Types.ObjectId) {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: jwtValidity,
  });
}

export function signUp_GET(req: Request, res: Response) {
  res.send("signup get");
}

export async function signUp_POST(req: Request, res: Response) {
  const { companyName, email, password, twitterUsername } = req.body;

  try {
    const user = await User.create({
      companyName,
      email,
      twitterUsername,
      password,
    });
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 100 * jwtValidity });
    res.status(201).send({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err).map((error) => error);
    res.status(400).json(errors);
  }
}

export function login_GET(req: Request, res: Response) {
  res.send("login get");
}

export function login_POST(req: Request, res: Response) {
  const { email, password } = req.body;
  res.send("login get");
}
