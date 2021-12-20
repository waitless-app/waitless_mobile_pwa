<template>
<div class="bg-green-400 w-100 rounded-md flex-col shadow-md">
    <div class="max-w-sm">
        <div class="w-100 h-36 content-div" :style="{ backgroundImage: bg}" />
        <div class="p-3 bg-green-400 rounded-b-md">
            <a href="#">
                <h5 class="text-gray-900 font-bold text-md tracking-tight mb-2">{{  props.name }}</h5>
            </a>
            <p class="font-normal text-gray-700 mb-3">Open now.</p>
        </div>
    </div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: 'https://flowbite.com/docs/images/blog/image-1.jpg',
  },
});

const bg = `url(${props.image})`;
</script>

<style scoped>
.content-div {
  background-repeat: no-repeat;
  background-size: cover;
  background-position:center;
}
</style>
