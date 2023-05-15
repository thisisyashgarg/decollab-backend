import { Request, Response } from "express";
import User from "../../model/users";

export default async function getNewCompaniesFromTag(
  req: Request,
  res: Response
) {
  const tag = req.body.tag;
  try {
    const users = await User.find({ tags: { $elemMatch: { tagName: tag } } });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err: err });
  }
}
