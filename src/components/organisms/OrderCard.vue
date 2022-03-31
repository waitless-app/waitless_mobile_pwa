<template>
  <li class="border-gray-400 flex flex-col mb-2">
    <div
      :class="[
        'select-none cursor-pointer rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg',
        themeOptions[theme].background,
      ]"
    >
      <div class="w-14 h-10">
        <div class="relative">
          <div class="absolute w-10 h-10 p-1">
            <div
              v-if="props.status !== 'COMPLETED'"
              :class="[
                'rounded-full animate-ping w-full h-full opacity-75',
                statusColors[props.status]['ping'],
              ]"
            ></div>
          </div>
          <div
            class="rounded-full absolute bg-gray-300 justify-center items-center bg-cover bg-center w-10 h-10"
            :style="{ 'background-image': `url(${props.image})` }"
          ></div>
        </div>
      </div>
      <div class="flex-1 pl-1 mr-16">
        <div :class="['font-medium text-white', themeOptions[theme].name]">{{ props.name }}</div>
        <div class="" :class="['text-sm font-bold', statusColors[props.status]['text']]">
          {{ props.status }}
        </div>
        <div :class="['text-sm mt-2', themeOptions[theme].description]">
          {{ props.description }}
        </div>
        <div class="text-sm text-gray-500">
          {{ parseDate(props.created) }}
        </div>
      </div>
      <div class="flex flex-col text-center">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from "vue";
import { statusColors } from "@/utils/constants";
import { parseDate } from "@/utils/utils";

const themeOptions = {
  dark: {
    background: "bg-gray-800",
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
  status: {
    type: String,
    default: "Not Available",
  },
  created: {
    type: String,
    default: "-",
  },
});
</script>
