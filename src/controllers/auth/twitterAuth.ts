import { Request, Response } from "express";
import passport from "passport";

export default async function twitterAuth(req: Request, res: Response) {
  try {
    passport.authenticate("twitter", { failureRedirect: "/login" }),
      function (req: Request, res: Response) {
        // Successful authentication, redirect home.
        console.log("twitter auth succesfull");
      };
  } catch (err) {
    res.status(400).json({ err: err });
  }
}
