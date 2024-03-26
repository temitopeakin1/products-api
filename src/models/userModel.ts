import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  timeStamp: Date;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already taken"],
    required: [true, "Please add the username"],
  },
  email: {
    type: String,
    unique: [true, "Email address already taken"],
    required: [true, "Please add the user email"],
  },
  password: {
    type: String,
    required: [true, "Add User Password"],
  },
  timeStamp: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
