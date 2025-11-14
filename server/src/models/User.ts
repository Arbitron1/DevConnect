import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  bio?: string;
  avatar?: string; 
  skills?: string[];
  followers: mongoose.Types.ObjectId[]; 
  following: mongoose.Types.ObjectId[]; 
  savedPosts: mongoose.Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String },
  avatar: { type: String },
  skills: [{ type: String }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
}, { timestamps: true });

UserSchema.index({ username: 1 });
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
