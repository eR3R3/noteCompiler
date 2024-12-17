declare type TransformationType = "restore" | "reformat" | "generate" | "simplification"

declare type GPTRequest = {
  prompt:string,
  tag:string,
  courseType:string
}

export type UpdateUserParams = {
  username: string
  photo: string
}

declare type CreateUserParams = {
  clerkId: string
  email: string
  username: string
  photo: string
}

declare type CreatePromptParams = {
  clerkId: string
  note: string
  tag: string
  courseType: string,
}