<template>
  <div class="custom-number-input h-10 w-32">
    <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
      <button
        data-action="decrement"
        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        @click="decrement"
      >
        <span class="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
        name="custom-input-number"
        :value="value"
      />
      <button
        data-action="increment"
        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        @click="increment"
      >
        <span class="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  min: {
    type: Number || null,
    default: null,
  },
  max: {
    type: Number || null,
    default: null,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

const increment = () => {
  if (!Number.isInteger(props.max) || props.max > value.value) {
    value.value += 1;
    emit("update:modelValue", value.value);
  }
};
const decrement = () => {
  if (!Number.isInteger(props.min) || props.min < value.value) {
    value.value -= 1;
    emit("update:modelValue", value.value);
  }
};
</script>
