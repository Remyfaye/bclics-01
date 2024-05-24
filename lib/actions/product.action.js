"use server";

// import { connectToDatabase } from "..";
import { revalidatePath } from "next/cache";
import { Product } from "../models/product.model";
import mongoose from "mongoose";

export const createProduct = async ({ name, price, desc, url }) => {
  try {
    console.log("here");
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);

    const newProduct = await Product.create({
      name: name,
      price: price,
      desc: desc,
      url: url,
    });

    console.log(newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const getSearchedProduct = async ({ query }) => {
  try {
    console.log(query);
    mongoose.connect(process.env.MONGODB_URL);

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    // const eventsQuery = Event.find(conditions)
    // .sort({ createdAt: "desc" })
    // // .skip(skipAmount)
    // .limit(limit);
    // let allEvents;

    if (query) {
      const allEventSearched = await populateEvent(Event.find(conditions));

      // console.log("query");
      return JSON.parse(JSON.stringify(allEventSearched));
    }

    const allEvents = await populateEvent(Event.find());
    return JSON.parse(JSON.stringify(allEvents));

    // console.log(allEvents);
  } catch (error) {
    handleError(error);
  }
};

export const getTheProduct = async (_id) => {
  try {
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);
    const Product = await User.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteProduct(_id) {
  try {
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);
    const userToDelete = await Product.findOne({ _id });

    if (!userToDelete) {
      throw new Error("Productnot found");
    }

    const deletedProduct = await Product.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedProduct ? JSON.parse(JSON.stringify(deletedProduct)) : null;
  } catch (error) {
    handleError(error);
  }
}
