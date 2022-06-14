<template>
  <div class="register">
    <span class="registerTitle">Register</span>
    <form @submit="handleRegisterUser" class="registerForm">
      <label>Username</label>
      <input
        class="registerInput"
        type="text"
        placeholder="Enter your username"
        v-model="username"
      />
      <label>Email</label>
      <input
        class="registerInput"
        type="text"
        placeholder="Enter your Email"
        v-model="email"
      />
      <label>Password</label>
      <input
        class="registerInput"
        type="password"
        placeholder="Enter your password"
        v-model="password"
      />
      <button type="submit" class="registerRegisterButton mt-4">
        Register
      </button>
      <p class="text-red-600">{{ message }}</p>
    </form>
    <p class="mt-4">
      Already have an account ?
      <router-link to="/login">
        <button class="registerLoginButton">Login</button>
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
export default {
  name: "Register",
  setup() {
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const avatar = ref("");
    const message = ref("");

    const authStore = useAuthStore();

    // @ts-ignore
    const handleRegisterUser = async (event) => {
      event.preventDefault();

      const registerForm = {
        email: email.value,
        password: password.value,
        username: username.value,
        avatar: avatar.value,
      };

      await authStore.registerUser(registerForm);
      message.value = authStore.authMessage;
      email.value = "";
      password.value = "";
      username.value = "";
      avatar.value = "";
    };

    return {
      email,
      password,
      username,
      message,
      avatar,
      handleRegisterUser,
    };
  },
};
</script>

<style>
.register {
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
  padding-top: 10%;
}

.registerTitle {
  font-size: 50px;
}

.registerForm {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.registerForm label {
  margin: 10px 0;
}

.registerInput {
  padding: 10px;
  background-color: white;
  border: none;
}

.registerRegisterButton {
  border: none;
  border-radius: 8px;
  background-color: aquamarine;
}

.registerLoginButton {
  border: none;
  border-radius: 8px;
  background-color: #ec5e6f !important;
  margin-left: 6px;
  width: 70px;
}
</style>
