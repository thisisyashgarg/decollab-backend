import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
const mongoDBUri = `mongodb+srv://thisisyashgarg:${process.env.MONGODB_PASSOWRD}@cluster0.d6kugow.mongodb.net/auth?retryWrites=true&w=majority`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authRoutes);

mongoose
  .connect(mongoDBUri)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  res.send("you set a cookie");
});

app.get("/get-cookies", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});
