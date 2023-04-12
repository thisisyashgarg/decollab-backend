import { Request, Response } from "express";
import User from "../modals/users";
import { handleErrors } from "../helper";
import createJWT, { jwtValidity } from "../services/createJWT";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
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
    res.status(201).send(user);
  } catch (err) {
    const errors = handleErrors(err).map((error) => error);
    res.status(400).json(errors);
  }
}

export async function login(req: Request, res: Response) {
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

export async function profileUpdate(req: Request, res: Response) {
  const {
    socialLinks,
    tags,
    flexPosts,
    brandsCollaborated,
    teamMembers,
    fundings,
  } = req.body;

  try {
    // _id will be sent by the client
    const user = await User.findOneAndUpdate(
      { _id: "64352b7738f43b0e93cacf9e" },
      {
        $addToSet: {
          tags: tags,
          socialLinks: socialLinks,
          teamMembers: teamMembers,
          brandsCollaborated: brandsCollaborated,
        },
      }
    );
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
}

export async function createPost(req: Request, res: Response) {
  const post = req.body;
  try {
    // _id will be sent by the client
    const user = await User.findOneAndUpdate(
      { _id: "64352b7738f43b0e93cacf9e" },
      {
        $push: {
          posts: post,
        },
      }
    );
    res.status(200).send(user?.posts);
  } catch (err) {
    res.status(400).send(err);
  }
}

export async function logout(req: Request, res: Response) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.end();
  // redirect to login page on client side, useEffect will check jwt, which is not present and logs out
}

// this middleware is for server side, if we are on client side we just have to check cookies
export const auth = (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  // check jwt and validate it
  if (token) {
    jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
      (err: any, decodedToken: any) => {
        if (err) {
          console.log(err.message);
          res.json({ isValidUser: false }); // do next what has to be done , eg is given here
        } else {
          res.json({ isValidUser: true }); // do next what has to be done , eg is given here
        }
      }
    );
  } else {
    res.json({ isValidUser: false });
  }
};
