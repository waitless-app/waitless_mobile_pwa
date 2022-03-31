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
          <AppInput label="Email" v-model="form.email"></AppInput>
          <AppInput label="Name" v-model="form.name"></AppInput>
          <AppInput label="Password" type="password" v-model="form.password"></AppInput>
          <div class="md:flex md:items-end">
            <button
              class="shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              @click="handleRegister"
            >
              Sign Up
            </button>
            <div class="text-white text-sm mt-6">
              Already have an account?
              <router-link to="login" class="text-pink-500 font-bold ml-2">Sign In</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import AppInput from "../atoms/AppInput.vue";
import AuthService from "@/services/auth.service";

const form = ref({ email: "", password: "", name: "" });

const router = useRouter();
const toast = useToast();

const handleRegister = () => {
  const valRes = validate();
  if (valRes) {
    register();
  } else {
    toast("All fields are required");
  }
};

const validate = () => {
  const { email, password, name } = form.value;
  if (!email || !password || !name) {
    return false;
  }
  return true;
};

const register = () => {
  AuthService.register(form.value)
    .then(({ data }) => {
      router.push("login");
      if (data.email) {
        toast.success("User created, you can now log in");
      }
    })
    .catch((err) => toast.error(err.message));
};
</script>

<style scoped></style>
