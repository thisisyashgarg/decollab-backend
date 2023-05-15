import { Request, Response } from "express";
import User from "../../model/users";

export default async function search(req: Request, res: Response) {
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
