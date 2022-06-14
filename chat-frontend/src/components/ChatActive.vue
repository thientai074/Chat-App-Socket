<template>
  <div class="h-full flex flex-col">
    <div
      class="flex flex-col sm:flex-row border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4"
    >
      <div class="flex items-center">
        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
          <img
            alt="Midone - HTML Admin Template"
            class="rounded-full"
            v-bind:src="receiver.avatar"
          />
        </div>
        <div class="ml-3 mr-auto">
          <div class="font-medium text-base">{{ receiver.username }}</div>
          <div class="text-slate-500 text-xs sm:text-sm">
            Hey, I am using chat <span class="mx-1">•</span> Online
          </div>
          <div class="text-red-500">
            {{ count }}
          </div>
        </div>
      </div>
      <div
        class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0"
      >
        <a href="javascript:;" class="w-5 h-5 text-slate-500">
          <i data-lucide="search" class="w-5 h-5"></i>
        </a>
        <a href="javascript:;" class="w-5 h-5 text-slate-500 ml-5">
          <i data-lucide="user-plus" class="w-5 h-5"></i>
        </a>
        <div class="dropdown ml-auto sm:ml-3">
          <a
            href="javascript:;"
            class="dropdown-toggle w-5 h-5 text-slate-500"
            aria-expanded="false"
            data-tw-toggle="dropdown"
          >
            <i data-lucide="more-vertical" class="w-5 h-5"></i>
          </a>
          <div class="dropdown-menu w-40">
            <ul class="dropdown-content">
              <li>
                <a href="" class="dropdown-item">
                  <i data-lucide="share-2" class="w-4 h-4 mr-2"></i> Share
                  Contact
                </a>
              </li>
              <li>
                <a href="" class="dropdown-item">
                  <i data-lucide="settings" class="w-4 h-4 mr-2"></i> Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1 flex flex-col"
    >
      <div
        v-for="message in messageList"
        :key="message._id"
        :class="`chat__box__text-box flex items-end  mb-4 ${
          user._id === message.sender ? 'self-end' : 'self-start'
        }`"
      >
        <div
          class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
        >
          <img
            alt="Midone - HTML Admin Template"
            class="rounded-full"
            v-bind:src="
              message.sender == user._id ? user.avatar : receiver.avatar
            "
          />
        </div>
        <div
          class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
        >
          {{ message.text }}
          <div class="mt-1 text-xs text-slate-500">
            {{ moment(message.createdAt).fromNow() }}
          </div>
        </div>
        <div class="hidden sm:block dropdown ml-3 my-auto">
          <a
            href="javascript:;"
            class="dropdown-toggle w-4 h-4 text-slate-500"
            aria-expanded="false"
            data-tw-toggle="dropdown"
          >
            <i data-lucide="more-vertical" class="w-4 h-4"></i>
          </a>
          <div class="dropdown-menu w-40">
            <ul class="dropdown-content">
              <li>
                <a href="" class="dropdown-item">
                  <i data-lucide="corner-up-left" class="w-4 h-4 mr-2"></i>
                  Reply
                </a>
              </li>
              <li>
                <a href="" class="dropdown-item">
                  <i data-lucide="trash" class="w-4 h-4 mr-2"></i> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div
      class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400"
    >
      <textarea
        class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
        rows="1"
        placeholder="Type your message..."
        v-model="newMessage"
      ></textarea>
      <div
        class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0"
      >
        <div class="dropdown mr-3 sm:mr-5">
          <a
            href="javascript:;"
            class="dropdown-toggle w-4 h-4 sm:w-5 sm:h-5 block text-slate-500"
            aria-expanded="false"
            data-tw-toggle="dropdown"
          >
            <i data-lucide="smile" class="w-full h-full"></i>
          </a>
          <EmojiTable />
        </div>
        <div class="w-4 h-4 sm:w-5 sm:h-5 relative text-slate-500 mr-3 sm:mr-5">
          <i data-lucide="paperclip" class="w-full h-full"></i>
          <input
            type="file"
            class="w-full h-full top-0 left-0 absolute opacity-0"
          />
        </div>
      </div>
      <a
        @click="sendMessage"
        href="javascript:;"
        class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5"
      >
        <i data-lucide="send" class="w-4 h-4"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { useAuthStore } from "../store/auth";
import moment from "moment";
import EmojiTable from "./EmojiTable.vue";
import { useConversationStore } from "../store/conversation";
import { useMessageStore } from "../store/message";
import { ConversationType, MessageDataType } from '../types/type';
export default {
  name: "ChatActive",
  components: { EmojiTable },
  props: ["socket"],
  // @ts-ignore
  setup(props, context) {
    const newMessage: any = ref("");
    const messageList: any = ref([]);
    const conversationId = ref("");
    const receiver: any = ref("");

    const authStore = useAuthStore();

    const messageStore = useMessageStore();

    const conversationStore = useConversationStore();

    const user = authStore.currentUser.userInfor;

    console.log("user", user);

    watch(
      () => conversationStore.detailConversation,
      async (detailConversation: ConversationType) => {
        console.log("detailConversation", detailConversation);
        conversationId.value = await detailConversation._id;

        receiver.value = await detailConversation.userDetails[0];
        await messageStore.getAllMessages(conversationId.value);
        messageList.value = messageStore.messages;
      }
    );

    // @ts-ignore
    const sendMessage = async (event) => {
      event.preventDefault();

      if (
        newMessage.value !== "" &&
        conversationId.value &&
        user &&
        receiver.value
      ) {
        const messageData = {
          conversationId: conversationId.value,
          sender: user._id,
          text: newMessage.value,
          receiver: receiver.value._id,
        };

        await props.socket.emit("send_message", messageData);

        props.socket.emit("send_unread", messageData);
        messageStore.createMessage(messageData);
        conversationStore.getAllConversations(user._id);
        newMessage.value = "";
      }
    };

    props.socket.on("receive_message", (data: MessageDataType) => {
      messageList.value = [...messageList.value, data];
    });

    return {
      newMessage,
      messageList,
      sendMessage,
      user,
      receiver,
      conversationStore,
      moment,
    };
  },
};
</script>
