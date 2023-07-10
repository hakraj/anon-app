import mongoose, { Schema } from 'mongoose'


/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)