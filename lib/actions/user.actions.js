"use server";

// import { connectToDatabase } from "..";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

export const createUser = async ({ firstname, lastname, username, email }) => {
  try {
    console.log("here");
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);

    const newUser = await User.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
    });

    console.log(newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const getTheUser = async (userId) => {
  try {
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);
    const user = await User.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteUser(_id) {
  try {
    // await connectToDatabase();
    mongoose.connect(process.env.MONGODB_URL);
    const userToDelete = await User.findOne({ _id });

    if (!userToDelete) {
      throw new Error("user not found");
    }

    // await Promise.all([
    //     // Update the 'events' collection to remove references to the user
    //     Event.updateMany(
    //       { _id: { $in: userToDelete.events } },
    //       { $pull: { organizer: userToDelete._id } }
    //     ),

    //     // Update the 'orders' collection to remove references to the user
    //     Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    //   ])

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
