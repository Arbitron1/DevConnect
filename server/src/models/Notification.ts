import { Schema, model, Document, Types } from "mongoose";

export interface INotification extends Document {
  user: Types.ObjectId;
  text: string;
  link?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    link: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<INotification>("Notification", notificationSchema);
