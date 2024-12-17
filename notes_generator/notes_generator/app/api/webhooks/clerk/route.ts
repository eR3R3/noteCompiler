'use server'

import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import {CreateUserParams} from "@/types";

export async function POST (req: Request) {
  console.log("called")
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return new Response("Webhook secret is missing", { status: 500 });
  }
  const header = await headers()
  const svix_id = header.get("svix-id");
  const svix_time = header.get("svix-timestamp")
  const svix_signature = header.get("svix-signature")
  console.log({ svix_id, svix_signature, svix_time });

  const payload = await req.json()
  const body = JSON.stringify(payload)

  if(!svix_id||!svix_signature||!svix_time) return new Response("svix-head doesn't fit", {status: 400})
  const wh = new Webhook(WEBHOOK_SECRET as string)
  let event: WebhookEvent
  try{
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_time,
      "svix-signature": svix_signature
    }) as WebhookEvent
  }
  catch(err){
    return new Response(err as string, {status: 400})
  }
  console.log("pass the verify")
  const {id} = event.data
  const type = event.type

  if(type==="user.created"){
    console.log("trigger user.created")
    const { id, email_addresses, image_url, username } = event.data
    const user: CreateUserParams = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      photo: image_url
    }
    const newUser = await createUser(user)
    return NextResponse.json({message: "created successfully", user: newUser})
  }

  if(type==="user.updated"){
    console.log("trigger user.updated")
    const { id, image_url, first_name, last_name, username } = event.data
    const user = {
      firstName: first_name!,
      lastName: last_name!,
      username: username!,
      photo: image_url!,
    };
    const updatedUser = await updateUser(id, user);
    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  if (type === "user.deleted") {
    console.log("trigger user.deleted")
    const { id } = event.data;
    const deletedUser = await deleteUser(id!);
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  console.log(`Webhook with and ID of ${id} and type of ${type}`);
  console.log("Webhook body:", body);

  return new Response("completed", { status: 200 });
}




