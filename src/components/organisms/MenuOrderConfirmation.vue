<template>
  <AppModal @close="emit('close')" v-if="show">
    <div class="flex flex-col my-auto self-center items-center">
      <div class="text-2xl text-gray-900 text-center font-medium mb-5">
        Order is requested,<br />
        we are waiting for confirmation.
      </div>
      <div class="relative">
        <div
          class="w-32 h-32 bg-white rounded-full shadow-2xl bg-cover"
          :style="{
            'background-image': `url(${props.image})`,
            filter: 'drop-shadow(2px 2px 6px #0A0A0A)',
          }"
        ></div>
        <div
          class="absolute top-3 right-3 -mr-1 -mt-1 w-4 h-4 rounded-full bg-pink-500 animate-ping"
        ></div>
        <div class="absolute top-3 right-3 -mr-1 -mt-1 w-4 h-4 rounded-full bg-pink-500"></div>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import AppModal from "@/components/molecules/AppModal.vue";

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
</script>

<style scoped></style>
