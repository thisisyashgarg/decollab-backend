// import jwt from "jsonwebtoken";
// import User from "../model/users";
// import { NextFunction, Request, Response } from "express";

// export const requireAuth = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies.jwt;
//   // check jwt and validate it
//   if (token) {
//     jwt.verify(
//       token,
//       `${process.env.JWT_SECRET}`,
//       (err: any, decodedToken: any) => {
//         if (err) {
//           console.log(err.message);
//           res.json(false); // do next what has to be done , eg is given here
//         } else {
//           res.json(decodedToken); // do next what has to be done , eg is given here
//           next();
//         }
//       }
//     );
//   } else {
//     res.json({ error: "Error occured" });
//   }
//   next();
// };

// export async function auth(req: Request, res: Response) {
//   const token = req.cookies.jwt;
//   try {
//     if (token) {
//       jwt.verify(
//         token,
//         `${process.env.JWT_SECRET}`,
//         async (err: any, decodedToken: any) => {
//           if (err) {
//             console.log(err.message);
//             res.status(400).json({ err: err.message });
//           } else {
//             const user = await User.find({ _id: decodedToken.id });
//             res.status(200).json(user);
//           }
//         }
//       );
//     } else {
//       res.status(400).json({ err: "No jwt found" });
//     }
//   } catch (err: any) {
//     res.status(400).json({ err: err.message });
//   }
// }
