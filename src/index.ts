import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import allRoutes from "./routes/allRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
const mongoDBUri = process.env.MONGODB_URI;

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware configuration
// app.use(session());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   session({
//     secret: `aghsdjfhkavwkdfsed`,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

app.use("/", allRoutes);

mongoose
  .connect(`${mongoDBUri}`)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

export default app;
