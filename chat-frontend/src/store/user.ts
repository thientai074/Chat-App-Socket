import { defineStore } from "pinia";
import { requestGetAllUsers, requestGetNotFriends } from "../services/user";

export const useUserStore: any = defineStore({
  id: "users",
  state: () => ({
    users: [],
    userButNotFriends: [],
  }),
  getters: {},
  actions: {
    async getAllUsers() {
      const res = await requestGetAllUsers();
      if (res.data.success) {
        this.users = res.data.data;
      } else {
        this.users = [];
      }
    },
    async getUsersButNotFrend() {
      const res = await requestGetNotFriends();
      console.log("notFriend", res.data.data);
      this.userButNotFriends = res.data.data;
    },
  },
});
