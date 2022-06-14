<template>
<a href="" class="w-10 mr-4 cursor-pointer">
        <div class="w-10 h-10 flex-none image-fit rounded-full">
          <img
            alt="Midone - HTML Admin Template"
            class="rounded-full"
            v-bind:src="user.avatar"
          />
          <div
            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
          ></div>
        </div>
        <div class="text-xs text-slate-500 truncate text-center mt-2">
          {{user.username}}
        </div>
      </a>
</template>

<script lang="ts">
export default {
  name: "FriendsList",
  props: ["user"],
  // @ts-ignore
  setup(props, context) {
    return {};
  },
};
</script>

<style></style>
