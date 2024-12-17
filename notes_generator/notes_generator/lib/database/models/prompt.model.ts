import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
  clerkId: {type: String, required: true, unique: true},
  note: {type: String, required: true},
  tag: {type: String, required: true},
  courseType: {type: String, required: true},
})

const Prompt = models.Prompt || model("Prompt", UserSchema)
export default Prompt