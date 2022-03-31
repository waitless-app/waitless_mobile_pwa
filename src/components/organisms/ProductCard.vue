<template>
  <li class="border-gray-400 flex flex-row mb-2">
    <div
      :class="[
        'select-none cursor-pointer rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg',
        themeOptions[theme].background,
      ]"
    >
      <AppAvatar :image="props.image" />
      <div class="flex-1 pl-1 mr-16">
        <div :class="['font-medium text-white', themeOptions[theme].name]">{{ props.name }}</div>
        <div class="" :class="['text-sm', themeOptions[theme].description]">
          {{ props.description }}
        </div>
      </div>
      <div class="text-gray-600 text-xs">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from "vue";
import AppAvatar from "@/components/atoms/AppAvatar.vue";

const themeOptions = {
  dark: {
    background: "bg-gray-900",
    name: "text-white",
    description: "text-gray-300 ",
  },
  light: {
    background: "bg-green-400",
    name: "text-gray-900",
    description: "text-gray-900 ",
  },
};

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
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
