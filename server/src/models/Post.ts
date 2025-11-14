import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  images?: string[];
  likes: Types.ObjectId[];
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, trim: true, required: true },
    images: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

postSchema.index({ author: 1, createdAt: -1 });

export default model<IPost>('Post', postSchema);
