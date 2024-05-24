import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    location: { type: String },
    url: { type: String },
    category: { type: String },
    vendor: { type: String },
    sizes: { type: Array },
  },
  { timestamps: true }
);

export const Product = models?.Product || model("Product", ProductSchema);
