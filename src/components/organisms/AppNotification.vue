<template>
  <div class="flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div class="flex flex-col ml-3">
          <div class="font-medium leading-none">{{ props.title }}</div>
          <p class="text-sm text-gray-600 leading-none mt-1">{{ props.description }}</p>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// const themeOptions = {
//   dark: {
//     background: '',
//   },
//   light: {
//
//   },
// };

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  description: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "dark",
    validator: (theme) => ["dark", "light"].includes(theme),
  },
});
</script>

<style scoped></style>
