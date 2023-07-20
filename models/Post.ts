import mongoose, { Schema } from 'mongoose'
import { UserSchema } from './User'


/* PostSchema will correspond to a collection in your MongoDB database. */
const PostSchema: Schema = new Schema({
  author: UserSchema,
  title: {
    /* Title of the post */

    type: String,
    maxlength: [60, 'Title cannot be more than 60 characters'],
    validate: {
      validator: (value: string) => value.trim().length > 0,
      message: 'Title must not be empty.',
    },
  },
  content: {
    /* Content of the post */

    type: String,
    maxlength: [2450, "Content cannot be more than 2450 characters"],
    validate: {
      validator: (value: string) => value.trim().length > 0,
      message: 'Title must not be empty.',
    },
  },
  likes: {
    type: [String],
    default: [],

  },
  comments: [
    {
      author: { type: String },
      text: {
        type: String,
        maxlength: [2450, "Content cannot be more than 2450 characters"],
      },
      createdAt: { type: String, default: new Date().toLocaleDateString() }
    }
  ]

})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)