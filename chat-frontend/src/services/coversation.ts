import { WithUserIdFromType } from "../types/type";
import { request } from "./request";

export const requestCreateConversation = async (withUserIdForm: WithUserIdFromType) => {
  return await request.post("/conversation", withUserIdForm);
};

export const requestGetAllConversations = async (userId: string) => {
  return await request.get(`/conversation/${userId}`);
};
