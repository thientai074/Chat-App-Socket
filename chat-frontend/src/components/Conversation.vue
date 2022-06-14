<template>
  <div
    @click="joinConversation(conversation._id)"
    class="intro-x cursor-pointer box relative flex items-center p-5 mt-5 hover:bg-slate-400 blocl"
  >
    <div class="w-12 h-12 flex-none image-fit mr-1">
      <img
        alt="Midone - HTML Admin Template"
        class="rounded-full"
        v-bind:src="conversation?.userDetails[0]?.avatar"
      />
      <div
        class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
      ></div>
    </div>
    <div class="ml-2 overflow-hidden">
      <div class="flex items-center">
        <a href="javascript:;" class="font-medium">{{
          conversation?.userDetails[0]?.username
        }}</a>
        <div class="text-xs text-slate-400 ml-16">
          {{ moment(conversation?.lastMessage?.createdAt).format("HH:mm") }}
        </div>
      </div>
      <div class="w-full truncate text-slate-500 mt-0.5">
        {{ conversation?.lastMessage?.text }}
      </div>
    </div>
    <div
      v-if="
        conversation?.lastMessage?.sender !==
        authStore.currentUser.userInfor._id
      "
      class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
    >
      {{ unreadMessageCount }}
    </div>
    <div
      v-if="
        conversation?.lastMessage?.sender ===
        authStore.currentUser.userInfor._id
      "
      class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
    >
      0
    </div>
  </div>
</template>

<script lang="ts">
import { useMessageStore } from "../store/message";
import { useConversationStore } from "../store/conversation";
import { onMounted, ref, computed } from "vue";
import moment from "moment";
import { useAuthStore } from "../store/auth";
import { MessageDataType } from "../types/type";
export default {
  name: "Conversation",
  props: ["conversation", "socket"],
  // @ts-ignore
  setup(props, context) {
    const messageStore = useMessageStore();
    const conversationStore = useConversationStore();
    const authStore = useAuthStore();
    const unreadMessage: any = ref([]);

    onMounted(() => {
      messageStore.getAllMessages();
      unreadMessage.value = props.conversation.unreadMessage;
    });

    const joinConversation = async (conversationId: string) => {
      props.socket.emit("join_conversation", conversationId);
      conversationStore.getChatDetail(conversationId);

      // Change to read message
      if (
        authStore.currentUser.userInfor._id !==
        props.conversation?.lastMessage?.sender
      ) {
        await messageStore.markReadMessage(conversationId);
        unreadMessage.value = [];
      }
    };

    props.socket.on("receiver_unread", (data: MessageDataType) => {
      if (data.conversationId === props.conversation._id) {
        // @ts-ignore
        unreadMessage.value.push(data);
      }
    });

    const unreadMessageCount = computed(() => {
      return unreadMessage.value.length;
    });

    return {
      conversationStore,
      joinConversation,
      messageStore,
      moment,
      unreadMessage,
      authStore,
      unreadMessageCount,
    };
  },
};
</script>

<style></style>
