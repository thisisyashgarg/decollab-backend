import { Request, Response } from "express";
import User from "../../model/users";

export default async function getAllPosts(req: Request, res: Response) {
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
