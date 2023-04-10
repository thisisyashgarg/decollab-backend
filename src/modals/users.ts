import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
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
// userSchema.static.login({email, password})

const User = mongoose.model("user", userSchema);
export default User;
