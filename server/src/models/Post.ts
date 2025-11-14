import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  content: string;
  image?: string; 
  likes: mongoose.Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
}, { timestamps: true });

PostSchema.index({ user: 1, createdAt: -1 });
export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
