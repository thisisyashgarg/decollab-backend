import mongoose, { Model } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser {
  companyName: string;
  email: string;
  password: string;
  logoUrl?: string;
  about?: string;
  followers?: number;
  socialLinks?: {
    name: string;
    url: string;
  }[];
  tags?: {
    tagName: string;
    id: string;
  }[];
  flexPosts?: {
    post: string;
  }[];
  teamMembers?: {
    name: string;
    profilePic: string;
    socialLink: string;
  }[];
  brandsCollaborated?: {
    brandName: string;
    brandLogo: string;
  }[];
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

export const userSchema = new mongoose.Schema<IUser, UserModel>(
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

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    logoUrl: { type: String },
    about: { type: String },
    followers: { type: Number },
    socialLinks: {
      type: [
        {
          name: { type: String },
          url: { type: String },
        },
      ],
    },
    tags: {
      type: [{ tagName: { type: String }, id: { type: String } }],
      lowercase: true,
    },
    flexPosts: {
      type: [
        {
          post: { type: String },
        },
      ],
    },
    teamMembers: {
      type: [
        {
          name: { type: String },
          profilePic: { type: String },
          socialLink: { type: String },
        },
      ],
    },
    brandsCollaborated: {
      type: [
        {
          brandName: { type: String },
          brandLogo: { type: String },
        },
      ],
    },
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

const User = mongoose.model<IUser, UserModel>("user", userSchema);
export default User;
