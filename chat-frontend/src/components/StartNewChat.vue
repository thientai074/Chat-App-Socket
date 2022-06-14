<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chat</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2">Start New Chat</button>
      <div class="dropdown ml-auto sm:ml-0">
        <button
          class="dropdown-toggle btn px-2 box text-slate-500"
          aria-expanded="false"
          data-tw-toggle="dropdown"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <i class="w-4 h-4" data-lucide="plus"></i>
          </span>
        </button>
        <div class="dropdown-menu w-40">
          <ul class="dropdown-content">
            <li>
              <a href="" class="dropdown-item">
                <i data-lucide="users" class="w-4 h-4 mr-2"></i> Create Group
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
</template>

<script lang="ts">
export default {
  name: "StartNewChat",
};
</script>

<style></style>
