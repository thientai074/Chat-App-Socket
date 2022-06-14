<template>
  <div
    id="friends"
    class="tab-pane"
    role="tabpanel"
    aria-labelledby="friends-tab"
  >
    <div class="pr-1">
      <div class="box p-5 mt-5">
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
        <button class="btn btn-primary w-full mt-3">Invite Friends</button>
      </div>
    </div>
    <div class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1">
      <SingerUser
        v-for="stranger in strangers"
        :key="stranger._id"
        :stranger="stranger"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, computed, ref } from "@vue/runtime-core";
import { useUserStore } from "../store/user";
import SingerUser from "./SingerUser.vue";
export default {
  name: "Friends",
  components: { SingerUser },
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.getUsersButNotFrend();
    });

    const strangers = computed(() => {
      return userStore.userButNotFriends;
    });

    return {
      strangers,
    };
  },
};
</script>

<style></style>
