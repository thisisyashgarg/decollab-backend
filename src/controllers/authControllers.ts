import { Request, Response } from "express";
import User, { IUser } from "../modals/users";
import { handleErrors } from "../helper";
import createJWT, { jwtValidity } from "../services/createJWT";
import jwt, { decode } from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  const { companyName, email, password, twitterUsername, tags } = req.body;

  try {
    const user = await User.create({
      companyName,
      email,
      twitterUsername,
      password,
      tags,
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
  const post = req.body[0];
  const userId = req.body[1].id;
  console.log(post, userId);

  try {
    // _id will be sent by the client
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          posts: post,
        },
      }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
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
          res.send(false); // do next what has to be done , eg is given here
        } else {
          res.send(true); // do next what has to be done , eg is given here
        }
      }
    );
  } else {
    res.send(false);
  }
};

export async function search(req: Request, res: Response) {
  console.log(req.query);
  // redirect to login page on client side, useEffect will check jwt, which is not present and logs out
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const allUsers = await User.find({});
    const allPosts = allUsers.reduce(
      (acc, user: any) => acc.concat(user.posts),
      []
    );
    res.status(200).send(allPosts);
  } catch (err) {
    res.status(400).json(err);
  }
}
