import { Document, Schema, Types, model } from "mongoose";

interface ConversationType extends Document {
  members: any;
}
const ConversationSchema = new Schema<ConversationType>(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

export const Conversation = model<ConversationType>(
  "conversations",
  ConversationSchema
);
