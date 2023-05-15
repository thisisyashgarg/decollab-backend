import { handleErrors } from "../../helper";
import User, { userSchema } from "../../model/users";
import createJWT, { jwtValidity } from "../../services/createJWT";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default async function signup(req: Request, res: Response) {
  const { companyName, email, password, tags } = req.body;

  try {
    const user = await User.create({
      companyName,
      email,
      tags,
      password,
    });
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 100 * jwtValidity });
    res.status(201).send(user);
  } catch (err) {
    const errors = handleErrors(err).map((error) => error);
    res.status(400).json(errors);
  }
}

// hashing the password for security purposes
userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
