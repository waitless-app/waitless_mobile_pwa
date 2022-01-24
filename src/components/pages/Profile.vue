<template>
  <div class="flex flex-col items-center h-screen">
    <div class="mt-10">
      <div class="w-32 h-32 bg-white rounded-full shadow-2xl"></div>
    </div>
    <div class="text-xl text-white text-center font-medium mt-5">
      {{ user.name }}
    </div>
    <div class="text-xl text-white text-center font-medium mb-5">
      {{ user.email }}
    </div>
    <div>
      <AppButton @click="logOut">Log Out</AppButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "@/services/api.service";
import AppButton from "@/components/atoms/AppButton.vue";
import { removeItem } from "@/utils/localstorage";

const { data = {} } = await UserService.get();

const user = ref(data);

const router = useRouter();

const logOut = () => {
  removeItem("access_token");
  router.push("login");
};
</script>
