"use server";

// import { connectToDatabase } from "..";
import Store from "../models/store.model";

export const createStore = async ({ name, url, location, desc }) => {
  try {
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);
    const newStore = await Store.create({
      name: name,
      url: url,
      location: location,
      desc: desc,
    });

    return JSON.parse(JSON.stringify(newStore));
  } catch (error) {
    handleError(error);
  }
};

export const getAllStores = async () => {
  try {
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);
    const allStores = await Store.find();
    return JSON.parse(JSON.stringify(allStores));
  } catch (error) {
    handleError(error);
  }
};
