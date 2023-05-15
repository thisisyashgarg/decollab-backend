import { Request, Response } from "express";

export default async function logout(req: Request, res: Response) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.end();
  // redirect to login page on client side, useEffect will check jwt, which is not present and logs out
}
