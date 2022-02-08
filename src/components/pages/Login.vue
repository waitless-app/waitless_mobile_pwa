<template>
  <div class="flex flex-col justify-center">
    <div class="-mt-32 flex justify-center">
      <img src="../../assets/logo_round.png" alt="" />
    </div>
    <div class="flex justify-center">
      <div class="w-full max-w-xs">
        <div class="mb-4">
          <div class="text-white text-4xl font-bold self-center">Login</div>
          <div class="text-white text-sm">Please sign in to continue.</div>
        </div>
        <form>
          <AppInput label="Email" v-model="form.email" id="email" />
          <AppInput label="Password" type="password" v-model="form.password" id="password" />
          <div class="md:flex md:items-end">
            <AppButton @click="handleLogin"> Sign In </AppButton>
          </div>
          <div class="text-white text-sm mt-6">
            Don't have an account?
            <router-link to="register" class="text-pink-500 font-bold ml-2">Sign Up</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { setItem } from "@/utils/localstorage";
import AppInput from "@/components/atoms/AppInput.vue";
import AppButton from "@/components/atoms/AppButton.vue";
import AuthService from "@/services/auth.service";

const form = ref({ email: "", password: "" });

const saveToken = (access = null, refresh = null) => {
  setItem("access_token", access);
  setItem("refresh_token", refresh);
};

const router = useRouter();

const handleLogin = () => {
  AuthService.login(form.value)
    .then(({ data }) => {
      saveToken(data.access, data.refresh);
      router.push("premises");
    })
    .catch(() => console.log("Error"));
};
</script>

<style scoped></style>
