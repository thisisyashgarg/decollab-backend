import mongoose, { Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

export interface IUser {
  companyName: string;
  email: string;
  twitterUsername: string;
  password: string;
  logoUrl?: string;
  about?: string;
  followers?: number;
  socialLinks?: string[];
  tags?: {
    tagName: string;
    id: string;
  }[];
  flexPosts?: string[];
  teamMembers?: {
    name: string;
    profilePic: string;
    socialLink: string;
  }[];
  brandsCollaborated?: string[];
  posts?: {
    logoUrl: string;
    companyName: string;
    followers: number;
    description: string;
    views: number;
    tags: string[];
    timeFrame: string;
    companiesReachedOut: number;
  }[];
  fundings?: {
    round: string;
    amount: number;
  }[];
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
    logoUrl: { type: String },
    about: { type: String },
    followers: { type: Number },
    socialLinks: {
      type: [String],
    },
    tags: {
      type: [{ tagName: { type: String }, id: { type: String } }],
      lowercase: true,
    },
    flexPosts: { type: [String] },
    teamMembers: {
      type: [
        {
          name: { type: String },
          profilePic: { type: String },
          socialLink: { type: String },
        },
      ],
    },
    brandsCollaborated: { type: [String] },
    posts: {
      type: [
        {
          logoUrl: { type: String },
          companyName: { type: String },
          followers: { type: Number },
          description: { type: String },
          views: { type: Number },
          tags: { type: [String] },
          timeFrame: { type: String },
          companiesReachedOut: { type: Number },
        },
      ],
    },
    fundings: {
      type: [
        {
          round: { type: String },
          amount: { type: Number },
        },
      ],
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
