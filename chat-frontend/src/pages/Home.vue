<template>
  <div class="py-5 md:py-0 bg-black/[0.15] dark:bg-transparent">
    <MobileMenu />
    <div class="flex mt-[4.7rem] md:mt-0 overflow-hidden">
      <SideMenu />
      <div class="content">
        <TopBar />
        <StartNewChat />
        <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
          <ChatSideMenu :socket="socket" />
          <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
            <div class="chat__box box">
              <ChatActive :socket="socket" />
              <ChatDefault />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <DarkModeSwitcher /> -->
  </div>
</template>

<script lang="ts">
import DarkModeSwitcher from "../components/DarkModeSwitcher.vue";
import ChatDefault from "../components/ChatDefault.vue";
import ChatActive from "../components/ChatActive.vue";
import ChatSideMenu from "../components/ChatSideMenu.vue";
import StartNewChat from "../components/StartNewChat.vue";
import TopBar from "../components/TopBar.vue";
import io from "socket.io-client";
import SideMenu from "../components/SideMenu.vue";
import MobileMenu from "../components/MobileMenu.vue";
import { watch, ref } from "vue";
import { useConversationStore } from "../store/conversation";
import { ConversationType } from '../types/type';

export default {
  name: "Home",
  components: {
    DarkModeSwitcher,
    ChatDefault,
    ChatActive,
    ChatSideMenu,
    StartNewChat,
    TopBar,
    SideMenu,
    MobileMenu,
  },
  setup() {
    // @ts-ignore
    const socket = io.connect("http://localhost:8900");

    const showChat = ref(false);

    const conversationStore = useConversationStore();

    watch(
      () => conversationStore.detailConversation,
      async (detailConversation: ConversationType) => {
        if (detailConversation) {
          showChat.value = true;
        }
      }
    );
    return { socket, conversationStore, showChat };
  },
};
</script>

<style></style>
