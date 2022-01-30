<template>
  <div class="flex flex-col mt-10">
    <div class="text-white text-4xl font-bold">All Premises</div>
    <div class="flex justify-start font-bold my-4">
      <template v-for="cat in categories" :key="cat.value">
        <div
          :class="[
            'mx-2',
            'cursor-pointer',
            cat.value === category ? 'text-white' : 'text-gray-200',
          ]"
          @click="category = cat.value"
          @keyup="category = cat.value"
        >
          {{ cat.key }}
        </div>
      </template>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <template v-for="item in premisesByCategory[category]" :key="item.name">
        <PremisesCard :premises="item" @click="openMenu(item.id)" />
      </template>
      <template v-if="!premisesByCategory[category].length">
        <div class="text-white font-bold text-md ml-2">
          List is empty. <span role="img" aria-label="think">😕</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import PremisesCard from "../organisms/PremisesCard.vue";
import { PremisesService } from "../../services/api.service";

const { data = [] } = await PremisesService.query();
const premises = ref(data);

const categories = [
  {
    key: "Opened",
    value: "open",
  },
  {
    key: "Closed",
    value: "closed",
  },
];
const category = ref("open");

const premisesByCategory = computed(() => ({
  closed: premises.value.filter((p) => !p.active),
  open: premises.value.filter((p) => p.active),
}));

const router = useRouter();

const openMenu = (premisesId) => {
  router.push({ name: "Menu", params: { premisesId } });
};
</script>

<style scoped></style>
