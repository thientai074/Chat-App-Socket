import { MessageDataType } from "../types/type";
import { request } from "./request";

export const requestGetAllMessages = async (conversationId: string) => {
  return await request.get(`/message/${conversationId}`);
};

export const requestCreateMessage = async (messageData: MessageDataType) => {
  return await request.post("/message", messageData);
};

export const requestMarkReadMessage = async (conversationId: string) => {
  return await request.put(`/message/read/${conversationId}`);
};
