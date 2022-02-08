<template>
  <div
    :class="[
      'flex flex-col rounded-full bg-gray-300 justify-center items-center mr-4 bg-cover bg-center',
      sizeOptions[props.size],
    ]"
    :style="{ 'background-image': `url(${props.image})` }"
  ></div>
</template>

<script setup>
import { defineProps } from "vue";

const sizeOptions = {
  sm: "w-10 h-10",
};
const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "sm",
  },
});
</script>
