import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  content: string;
  parentComment?: mongoose.Types.ObjectId | null; // for replies
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  parentComment: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
}, { timestamps: true });

CommentSchema.index({ post: 1, createdAt: -1 });
export default mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
