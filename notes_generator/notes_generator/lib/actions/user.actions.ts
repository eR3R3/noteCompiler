import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database/mongoose";
import User from "../database/models/user.model";
import {CreatePromptParams, CreateUserParams, UpdateUserParams} from "@/types";
import {revalidatePath} from "next/cache";
import Prompt from "../database/models/prompt.model"

export async function createUser(user: CreateUserParams) {
  try {
    console.log("before connecting")
    await connectToDatabase();
    console.log("after connecting")

    const newUser = await User.create(user);
    console.log("userCreated")
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) {
      throw new Error("User not found");
    }
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function createPrompt(prompt: CreatePromptParams) {
  try{
    await connectToDatabase();
    const newPrompt = await Prompt.create(prompt)
    console.log("promptCreated")
    return JSON.parse(JSON.stringify(newPrompt))
  } catch (error) {
    handleError(error);
  }
}

