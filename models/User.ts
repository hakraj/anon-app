import mongoose, { Schema } from 'mongoose'


/* UserSchema will correspond to a collection in your MongoDB database. */
export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: { type: String },
  name: { type: String },
  image: { type: String, default: "/images/anon-avatar.png" }
})



export default mongoose.models.User || mongoose.model('User', UserSchema)