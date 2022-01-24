<template>
  <div class="flex flex-col justify-center">
    <div class="-mt-32 flex justify-center">
      <img src="../../assets/logo_round.png" alt="" />
    </div>
    <div class="flex justify-center">
      <div class="w-full max-w-xs">
        <div class="mb-4">
          <div class="text-white text-4xl font-bold self-center">Register</div>
          <div class="text-white text-sm">Here you can create your account.</div>
        </div>
        <form>
          <AppInput label="Email"></AppInput>
          <AppInput label="Name"></AppInput>
          <AppInput label="Password" type="password"></AppInput>
          <div class="md:flex md:items-end">
            <button
              class="shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppInput from "../atoms/AppInput.vue";
</script>

<style scoped></style>
