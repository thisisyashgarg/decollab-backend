import { Request, Response } from "express";
import User from "../modals/users";
import { handleErrors } from "../helper";
import createJWT, { jwtValidity } from "../services/createJWT";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
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
  const { companyName, about, logoUrl, tags } = req.body[0];
  const userId = req.body[1].id;
  console.log(req.body[0]);

  try {
    // _id will be sent by the client
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          companyName: companyName,
          about: about,
          logoUrl: logoUrl,
          tags: tags,
        },
      }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
}

export async function createPost(req: Request, res: Response) {
  const post = req.body[0];
  const userId = req.body[1].id;
  console.log(post);

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
  try {
    if (token) {
      jwt.verify(
        token,
        `${process.env.JWT_SECRET}`,
        async (err: any, decodedToken: any) => {
          if (err) {
            console.log(err.message);
            res.status(400).json({ err: err.message });
          } else {
            const user = await User.find({ _id: decodedToken.id });
            res.status(200).json(user);
          }
        }
      );
    } else {
      res.status(400).json({ err: "No jwt found" });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

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

export async function getNewCompaniesFromTag(req: Request, res: Response) {
  const tag = req.body.tag;
  try {
    const users = await User.find({ tags: { $elemMatch: { tagName: tag } } });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

export async function search(req: Request, res: Response) {
  const searchQuery = req.query.q;
  try {
    const users = await User.find({
      $or: [
        { companyName: { $regex: searchQuery, $options: "i" } },
        {
          tags: {
            $elemMatch: { tagName: { $regex: searchQuery, $options: "i" } },
          },
        },
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err: err });
  }
}
