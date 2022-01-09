<template>
<li class="border-gray-400 flex flex-row mb-2">
          <div class="select-none cursor-pointer bg-gray-900 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div class="flex flex-col rounded-full w-10 h-10 bg-gray-300 justify-center items-center mr-4 bg-cover bg-center" :style="{ 'background-image': `url(${props.image})` }"></div>
            <div class="flex-1 pl-1 mr-16">
              <div class="font-medium text-white">{{  props.name  }}</div>
              <div class="text-gray-300 text-sm">{{  props.description  }}</div>
            </div>
            <div class="text-gray-600 text-xs">
              <slot name="rightAction"></slot>
            </div>
          </div>
        </li>
</template>

<script setup>
import {
  defineProps,
} from 'vue';

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>

</style>
