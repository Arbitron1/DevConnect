import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  followers: Types.ObjectId[]; 
  following: Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String, default: '' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
