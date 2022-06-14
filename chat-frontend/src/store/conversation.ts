import axios from "axios";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
import {
  requestGetAllConversations,
  requestCreateConversation,
} from "../services/coversation";
import { ConversationType, WithUserIdFromType } from "../types/type";

export const useConversationStore: any = defineStore({
  id: "conversations",
  state: () => ({
    conversations: [],
    detailConversation: {},
  }),
  getters: {},
  actions: {
    async createConversation(withUserIdForm: WithUserIdFromType) {
      const res = await requestCreateConversation(withUserIdForm);
      this.conversations = res.data.data;
    },

    async getAllConversations(userId: string) {
      const res = await requestGetAllConversations(userId);
      console.log("conversations", res.data.data);
      this.conversations = res.data.data;
    },

    async getChatDetail(conversationId: string) {
      // @ts-ignore
      this.detailConversation = this.conversations.find(
        (conversation: ConversationType) => conversation._id === conversationId
      );
      console.log("detailConversation", this.detailConversation);
    },
  },
});
