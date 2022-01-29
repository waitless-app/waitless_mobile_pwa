<template>
  <div class="flex flex-col mt-10">
    <div class="text-white text-4xl font-bold">All Premises</div>
    <div class="flex justify-start text-white font-bold my-4">
      <div class="mx-2">Opened</div>
      <div class="mx-2 text-gray-200">Closed</div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <template v-for="item in premises" :key="item.name">
        <PremisesCard :name="item.name" :image="item.image" @click="openMenu(item.id)" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PremisesCard from "../organisms/PremisesCard.vue";
import { PremisesService } from "../../services/api.service";

const { data = [] } = await PremisesService.query();
const premises = ref(data);

const router = useRouter();

const openMenu = (premisesId) => {
  router.push({ name: "Menu", params: { premisesId } });
};
</script>

<style scoped></style>
