import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import { requestLogin, requestRegister } from "../services/auth";
import { LoginFormType, RegisterFormType } from "../types/type";

export const useAuthStore: any = defineStore({
  id: "auth",
  state: () => ({
    currentUser: {},
    isAuthenticated: false,
    authMessage: "",
  }),
  getters: {},
  actions: {
    async loginUser(loginForm: LoginFormType) {
      const res = await requestLogin(loginForm);
      if (res.data.success) {
        this.currentUser = res.data.data;
        this.isAuthenticated = true;
        this.authMessage = res.data.message;
      } else {
        this.currentUser = [];
        this.isAuthenticated = false;
        this.authMessage = res.data.message;
      }
    },
    async registerUser(registerForm: RegisterFormType) {  
      const res = await requestRegister(registerForm)
      this.currentUser = [];
      this.isAuthenticated = false;
      this.authMessage = res.data.message;
    },
    logoutUser() {
      Cookies.remove("token");
      this.currentUser = [];
      this.isAuthenticated = false;
      this.authMessage = "you are logout";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "Chat",
        storage: localStorage,
      },
    ],
  },
});
