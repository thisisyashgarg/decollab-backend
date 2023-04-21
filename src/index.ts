import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport, { session } from "passport";

const app = express();
const PORT = process.env.PORT;
const mongoDBUri = `mongodb+srv://thisisyashgarg:${process.env.MONGODB_PASSOWRD}@cluster0.d6kugow.mongodb.net/user?retryWrites=true&w=majority`;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", authRoutes);

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
