<script setup lang="ts">
import MobileMenu from "./components/MobileMenu.vue";
import SideMenu from "./components/SideMenu.vue";
import TopBar from "./components/TopBar.vue";
import ChatSideMenu from "./components/ChatSideMenu.vue";
import ChatActive from "./components/ChatActive.vue";
import ChatDefault from "./components/ChatDefault.vue";
import DarkModeSwitcher from "./components/DarkModeSwitcher.vue";
import StartNewChat from "./components/StartNewChat.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <dir>
    <router-view />
  </dir>
</template>
