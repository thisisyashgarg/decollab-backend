import { Request, Response } from "express";
import User from "../../model/users";

export default async function profileUpdate(req: Request, res: Response) {
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
