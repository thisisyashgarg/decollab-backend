import { Request, Response } from "express";
import User from "../modals/users";
import { handleErrors } from "../helper";

export function signUp_GET(req: Request, res: Response) {
  res.send("signup get");
}

export async function signUp_POST(req: Request, res: Response) {
  const { email, password, twitterUsername } = req.body;

  try {
    const user = await User.create({
      email,
      twitterUsername,
      password,
    });
    res.status(201).send(user);
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
