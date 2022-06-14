import { Document, Schema, Types, model } from "mongoose";

interface Messagetype extends Document {
  conversationId: string;
  sender: string;
  text: string;
  receiver: string;
  read: boolean;
}

const MessageSchema = new Schema<Messagetype>(
  {
    conversationId: { type: String },
    sender: { type: String },
    text: { type: String },
    receiver: { type: String },
    read: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export const Message = model<Messagetype>("messages", MessageSchema);
