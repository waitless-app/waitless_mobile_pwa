<template>
  <div class="bg-green-400 w-100 rounded-md flex-col shadow-md max-w-sm">
    <div class="max-w-sm">
      <div
        class="w-100 h-36 content-image rounded-t-md"
        :style="{ backgroundImage: bg, filter: props.premises.active ? '' : 'grayscale(1)' }"
      />
      <div class="p-3 bg-green-400 rounded-b-md">
        <a href="#">
          <h5 class="text-gray-900 font-bold text-md tracking-tight mb-2">
            {{ props.premises.name }}
          </h5>
        </a>
        <p class="font-normal text-gray-700 mb-3">
          {{ formattedAddress }}
        </p>
        <p class="font-bold text-gray-700 text-xs">
          {{ props.premises.active ? "Open Now" : "Closed" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  premises: {
    type: Object,
    default: () => ({
      active: true,
      address: "",
      city: "",
      country: "",
      description: "",
      id: 0,
      image: "",
      name: "",
      owner: "",
      postcode: "",
      tags: [],
    }),
  },
});

const formattedAddress = `${props.premises.country}, ${props.premises.city}, ${props.premises.address}`;

const bg = `url(${props.premises.image})`;
</script>
