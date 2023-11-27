import { Request, Response } from "express";
import User from "../../model/users";
import { handleErrors } from "../../helper";
import createJWT, { jwtValidity } from "../../services/createJWT";
import bcrypt from "bcrypt";
import { userSchema } from "../../model/users";

export default async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    console.log(email, password, "login")
    const user = await User.findOne({ email, password });
    console.log(user, 'user')
    if (user) {
      const token = createJWT(user?.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 100 * jwtValidity });
      return res.status(200).send(user);
    } else {
      return res.status(400).send("User not found");
    }
  } catch (err) {
    const errors = handleErrors(err).map((error) => error);
    res.status(400).send(errors);
  }
}

// static method to login user
userSchema.static("login", async function login(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
});
