import jwt from "jsonwebtoken";

// this middleware is for server side, if we are on client side we just have to check cookies
export const requireAuth = (req: any, res: any, next: any) => {
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
          console.log(decodedToken);
          res.json({ isValidUser: true, token }); // do next what has to be done , eg is given here
          next();
        }
      }
    );
  } else {
    res.json({ isValidUser: false });
  }
  next();
};
