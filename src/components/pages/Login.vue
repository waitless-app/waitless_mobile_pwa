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
            <button
              class="shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              @click="handleLogin"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppInput from "../atoms/AppInput.vue";
import AuthService from "../../services/auth.service";
import { setItem } from "../../utils/localstorage";

const router = useRouter();

const saveToken = (access = null, refresh = null) => {
  // setItem('access_token', access).then(() => Actions.welcome());
  setItem("access_token", access);
  setItem("refresh_token", refresh);
};

const form = ref({ email: "", password: "" });
const handleLogin = () => {
  AuthService.login(form.value)
    .then(({ data }) => {
      saveToken(data.access, data.refresh);
      router.push("home");
    })
    .catch(() => console.log("Error"));
};
</script>

<style scoped></style>
