import { Request, Response } from "express";
import User from "../../model/users";

export default async function createPost(req: Request, res: Response) {
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
