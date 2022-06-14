<template>
  <div
    @click="addNewConversation(stranger._id)"
    class="cursor-pointer box relative flex items-center p-5 mt-5 hover:bg-slate-400"
  >
    <div class="w-12 h-12 flex-none image-fit mr-1">
      <img
        alt="Midone - HTML Admin Template"
        class="rounded-full"
        v-bind:src="stranger.avatar"
      />
      <div
        class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
      ></div>
    </div>
    <div class="ml-2 overflow-hidden">
      <div class="flex items-center">
        <a href="" class="font-medium">{{ stranger.username }}</a>
      </div>
      <div class="w-full truncate text-slate-500 mt-0.5">
        Last seen 2 hours ago
      </div>
    </div>
    <div class="dropdown ml-auto">
      <a
        class="dropdown-toggle w-5 h-5 block"
        href="javascript:;"
        aria-expanded="false"
        data-tw-toggle="dropdown"
      >
        <i data-lucide="more-horizontal" class="w-5 h-5 text-slate-500"></i>
      </a>
      <div class="dropdown-menu w-40">
        <ul class="dropdown-content">
          <li>
            <a href="" class="dropdown-item">
              <i data-lucide="share-2" class="w-4 h-4 mr-2"></i> Share Contact
            </a>
          </li>
          <li>
            <a href="" class="dropdown-item">
              <i data-lucide="copy" class="w-4 h-4 mr-2"></i> Copy Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useConversationStore } from "../store/conversation";
export default {
  name: "SingerUser",
  props: ["stranger"],
  setup() {
    const conversationStore = useConversationStore();

    const router = useRouter();

    const addNewConversation = (userId: string) => {
      const withUserIdForm = {
        receiverId: userId,
      };
      if (withUserIdForm) {
        conversationStore.createConversation(withUserIdForm);
      }
      router.go(0)
    };

    return {
      addNewConversation,
    };
  },
};
</script>

<style></style>
