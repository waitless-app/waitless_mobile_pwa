<template>
  <div class="flex flex-col mt-10">
      <div class="text-white text-4xl font-bold">
        Gdynia
      </div>
    <div class="flex justify-start text-white font-bold my-4">
      <div class="mx-2">Italian</div>
      <div class="mx-2">Fast</div>
      <div class="mx-2">Drinks</div>
      <div class="mx-2">American</div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <template v-for="item in premises" :key="item.name">
        <PremisesCard :name="item.name" :image="item.image" @click="openMenu(item.id)"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PremisesCard from '../organisms/PremisesCard.vue';
import { PremisesService } from '../../services/api.service';

const premises = ref([]);

const router = useRouter();

const openMenu = (premisesId) => {
  router.push({ name: 'Menu', params: { premisesId } });
};

onMounted(() => {
  PremisesService.query().then(({ data }) => {
    premises.value = data;
  });
});
</script>

<style scoped>

</style>
