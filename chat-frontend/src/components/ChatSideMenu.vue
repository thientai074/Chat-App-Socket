<template>
  <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
    <div class="intro-y pr-1">
      <div class="box p-2">
        <ul class="nav nav-pills" role="tablist">
          <li id="chats-tab" class="nav-item flex-1" role="presentation">
            <button
              class="nav-link w-full py-2 active"
              data-tw-toggle="pill"
              data-tw-target="#chats"
              type="button"
              role="tab"
              aria-controls="chats"
              aria-selected="true"
            >
              Chats
            </button>
          </li>
          <li id="friends-tab" class="nav-item flex-1" role="presentation">
            <button
              class="nav-link w-full py-2"
              data-tw-toggle="pill"
              data-tw-target="#friends"
              type="button"
              role="tab"
              aria-controls="friends"
              aria-selected="false"
            >
              Friends
            </button>
          </li>
          <li id="profile-tab" class="nav-item flex-1" role="presentation">
            <button
              class="nav-link w-full py-2"
              data-tw-toggle="pill"
              data-tw-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-content">
      <div
        id="chats"
        class="tab-pane active"
        role="tabpanel"
        aria-labelledby="chats-tab"
      >
        <div class="pr-1">
          <div class="box px-5 pt-5 pb-5 lg:pb-0 mt-5">
            <div class="relative text-slate-500">
              <input
                type="text"
                class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                placeholder="Search for messages or users..."
              />
              <i
                class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                data-lucide="search"
              ></i>
            </div>
            <div class="overflow-x-auto scrollbar-hidden">
              <div class="flex mt-5">
                <FriendsList
                  v-for="user in users"
                  :key="user._id"
                  :user="user"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
        >
          <Conversation
            :socket="socket"
            v-for="conversation in conversations"
            :key="conversation._id"
            :conversation="conversation"
          />
        </div>
      </div>
      <Friends />
      <ChatProfile />
    </div>
  </div>
</template>

<script lang="ts">
import ChatProfile from "./ChatProfile.vue";
import Conversation from "./Conversation.vue";
import FriendsList from "./FriendsList.vue";
import Friends from "./Friends.vue";
import { onMounted, computed } from "vue";
import { useUserStore } from "../store/user";
import { useConversationStore } from "../store/conversation";
import { useAuthStore } from "../store/auth";
export default {
  name: "ChatSideMenu",
  components: { ChatProfile, Friends, FriendsList, Conversation },
  props: ["socket"],
  setup() {
    const userStore = useUserStore();

    const conversationStore = useConversationStore();

    onMounted(() => {
      userStore.getAllUsers();
    });

    onMounted(async () => {
      const authStore = useAuthStore();
      const currentUserId = await authStore.currentUser.userInfor._id;
      conversationStore.getAllConversations(currentUserId);
    });

    const users = computed(() => {
      return userStore.users;
    });

    const conversations = computed(() => {
      return conversationStore.conversations;
    });

    console.log("computed", users)

    return {
      users,
      conversations,
    };
  },
};
</script>
