<template>
  <div className="login">
    <span className="loginTitle">Login</span>
    <form @submit="handleLogin" className="loginForm">
      <label>Email</label>
      <input
        type="text"
        placeholder="Enter your email"
        className="loginInput"
        v-model="email"
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        className="loginInput"
        v-model="password"
      />
      <button type="submit" className="loginButton mt-4">Login</button>
      <p>{{ message }}</p>
    </form>
    <p className="mt-4">
      Don't have an account ?
      <router-link to="/register">
        <button className="registerButton">Register</button>
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../store/auth";
export default {
  name: "LoginUser",
  components: {},
  setup() {
    const email = ref("");
    const password = ref("");
    const message = ref("");

    const authStore = useAuthStore();

    const router = useRouter();

    // @ts-ignore
    const handleLogin = async (event) => {
      event.preventDefault();


      const loginForm = {
        email: email.value,
        password: password.value,
      };

      await authStore.loginUser(loginForm);
      message.value = authStore.authMessage;
      email.value = "";
      password.value = "";

      if (authStore.isAuthenticated === true) {
        router.push("/");
      }
    };
    return {
      email,
      password,
      message,
      handleLogin,
    };
  },
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: content;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
  background-size: cover;
  height: 100vh;
  align-items: center;
  padding-top: 20%;
  padding-left: 500px;
}

.loginTitle {
  font-size: 50px;
}

.loginForm {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.loginForm label {
  margin: 10px 0;
}

.loginInput {
  padding: 10px;
  background-color: white;
  border: none;
}

.loginButton {
  border: none;
  border-radius: 8px;
  background-color: aquamarine;
}

.registerButton {
  border: none;
  border-radius: 8px;
  background-color: #ec5e6f !important;
  margin-left: 6px;
  width: 70px;
}
</style>
