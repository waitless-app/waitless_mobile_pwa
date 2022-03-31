<template>
  <div
    :class="['fixed inset-0 overflow-y-auto', props.zIndex]"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div
        class="flex flex-col bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all h-screen w-full p-4"
      >
        <div class="flex">
          <div @click="emit('close')" @keyup="emit('close')">
            <AppIcon class="text-black mt-1" icon="close" />
          </div>
          <div class="font-medium text-2xl flex-1 text-center">{{ title }}</div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import AppIcon from "@/components/atoms/AppIcon.vue";

const emit = defineEmits(["close"]);

const props = defineProps({
  zIndex: {
    type: String,
    default: "z-20",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
