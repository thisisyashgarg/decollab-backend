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
          res.json(false); // do next what has to be done , eg is given here
        } else {
          res.json(decodedToken); // do next what has to be done , eg is given here
          next();
        }
      }
    );
  } else {
    res.json({ error: "Error occured" });
  }
  next();
};
