<template>
      <div class="mb-4 relative">
        <input v-model="localValue" type="text" v-bind="$attrs"  class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="email">
        <label for="email" class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">{{
            label
          }}</label>
    </div>
</template>

<script setup>

import {
  computed, defineProps, defineEmits, onMounted,
} from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

onMounted(() => {
  const toggleInputContainer = function (input) {
    if (input.value !== '') {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  };

  const labels = document.querySelectorAll('.label');
  for (let i = 0; i < labels.length; i += 1) {
    labels[i].addEventListener('click', function () {
      this.previousElementSibling.focus();
    });
  }

  window.addEventListener('load', () => {
    const inputs = document.getElementsByClassName('input');
    for (let i = 0; i < inputs.length; i += 1) {
      console.log('looped');
      inputs[i].addEventListener('keyup', function () {
        toggleInputContainer(this);
      });
      toggleInputContainer(inputs[i]);
    }
  });
});
</script>

<style scoped>
.input {
    transition: border 0.2s ease-in-out;
    min-width: 280px
}

.input:focus+.label,
.input:active+.label,
.input.filled+.label {
    font-size: .75rem;
    transition: all 0.2s ease-out;
    top: -0.1rem;
    color: #667eea;
}

.label {
    transition: all 0.2s ease-out;
    top: 0.4rem;
    left: 0;
}
</style>
