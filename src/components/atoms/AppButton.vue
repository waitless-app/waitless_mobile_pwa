<template>
  <button
    :class="[
      'shadow focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded',
      buttonTypes[props.type],
    ]"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const buttonTypes = {
  primary: "bg-green-600 hover:bg-green-500",
};

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
});
</script>
