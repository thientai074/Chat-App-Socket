<template>
  <div
    id="profile"
    class="tab-pane"
    role="tabpanel"
    aria-labelledby="profile-tab"
  >
    <div class="pr-1">
      <div class="box px-5 py-10 mt-5">
        <div
          class="w-20 h-20 flex-none image-fit rounded-full overflow-hidden mx-auto"
        >
          <img
            alt="Midone - HTML Admin Template"
            src="distFront/images/profile-10.jpg"
          />
        </div>
        <div class="text-center mt-3">
          <div class="font-medium text-lg">Johnny Depp</div>
          <div class="text-slate-500 mt-1">Tailwind HTML Admin Template</div>
        </div>
      </div>
      <div class="box p-5 mt-5">
        <div
          class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
        >
          <div>
            <div class="text-slate-500">Country</div>
            <div class="mt-1">New York City, USA</div>
          </div>
          <i data-lucide="globe" class="w-4 h-4 text-slate-500 ml-auto"></i>
        </div>
        <div
          class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
        >
          <div>
            <div class="text-slate-500">Phone</div>
            <div class="mt-1">+32 19 23 62 24 34</div>
          </div>
          <i data-lucide="mic" class="w-4 h-4 text-slate-500 ml-auto"></i>
        </div>
        <div
          class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
        >
          <div>
            <div class="text-slate-500">Email</div>
            <div class="mt-1">johnnydepp@left4code.com</div>
          </div>
          <i data-lucide="mail" class="w-4 h-4 text-slate-500 ml-auto"></i>
        </div>
        <div class="flex items-center pt-5">
          <div>
            <div class="text-slate-500">Joined Date</div>
            <div class="mt-1">7 June 2022</div>
          </div>
          <i data-lucide="clock" class="w-4 h-4 text-slate-500 ml-auto"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ChatProfile",
};
</script>

<style></style>
