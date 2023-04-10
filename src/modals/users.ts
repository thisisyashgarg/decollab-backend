import mongoose, { Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

interface IUser {
  companyName: string;
  email: string;
  twitterUsername: string;
  password: string;
}
interface UserModel extends Model<IUser> {
  login(email: string, password: string): any;
}
const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    companyName: {
      type: String,
      required: [true, "Please enter your company name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    twitterUsername: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
  },
  { timestamps: true }
);

// hashing the password for security purposes
userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// static method to login user
userSchema.static("login", async function login(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
});

const User = mongoose.model<IUser, UserModel>("user", userSchema);
export default User;
