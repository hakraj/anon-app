import mongoose, { Schema } from 'mongoose'


/* UserSchema will correspond to a collection in your MongoDB database. */
export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: [8, "Password cannot be less than 8 characters"],
  },
  name: { type: String },
})



export default mongoose.models.User || mongoose.model('User', UserSchema)