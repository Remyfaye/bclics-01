import { Schema, model, models } from "mongoose";

const StoreSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  location: { type: String },
  url: { type: String },
  // createdAt: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Store = models.Store || model("Store", StoreSchema);

export default Store;
