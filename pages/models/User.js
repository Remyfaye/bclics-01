import bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    admin: { type: Boolean, default: false },
    vendor: { type: Boolean, default: false },
    cart: { type: Array },
    password: {
      type: String,
      required: true,
      // validate: (pass) => {
      //   if (!pass.length || pass.length < 5) {
      //     new Error("password must exceed 5 characters");
      //   }
      // },
    },
  },
  { timestemps: true }
);

// userSchema.post("validate", function (user) {
//   const notHashedPassword = user.password;
//   const salt = bcrypt.genSaltSync(10);
//   user.password = bcrypt.hashSync(notHashedPassword, salt);
// });

export const User = models?.user || model("user", userSchema);
