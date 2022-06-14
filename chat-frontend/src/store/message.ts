import { defineStore } from "pinia";
import {
  requestGetAllMessages,
  requestCreateMessage,
  requestMarkReadMessage,
} from "../services/message";
import { MessageDataType } from "../types/type";

export const useMessageStore: any = defineStore({
  id: "messages",
  state: () => ({
    messages: [],
    unreadMessage: [],
  }),
  getters: {},
  actions: {
    async getAllMessages(conversationId: string) {
      const res = await requestGetAllMessages(conversationId);
      this.messages = res.data.data;
    },

    async createMessage(messageData: MessageDataType) {
      const res = await requestCreateMessage(messageData);
      // @ts-ignore
      this.messages.push(res.data.data);
    },

    async markReadMessage(conversationId: string) {
      const res = await requestMarkReadMessage(conversationId);
      console.log("updateMessage", res.data);
    },
  },
});
