import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT;
const mongoDBUri = `mongodb+srv://thisisyashgarg:${process.env.MONGODB_PASSOWRD}@cluster0.d6kugow.mongodb.net/auth?retryWrites=true&w=majority`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
