import { Request, Response } from "express";
import User from "../../model/users";
import { handleErrors } from "../../helper";
import createJWT, { jwtValidity } from "../../services/createJWT";
import bcrypt from "bcrypt";
import { userSchema } from "../../model/users";

export default async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 100 * jwtValidity });
    res.status(200).send(user);
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

// hashing the password for security purposes
userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
