<template>
  <AppTemplate>
    <SafeArea>
      <router-view v-slot="{ Component }">
        <suspense timeout="0">
          <template #default>
            <component :is="Component"></component>
          </template>
          <template #fallback>
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          </template>
        </suspense>
      </router-view>
    </SafeArea>
    <AppNavBottom v-if="meta?.showNav" />
  </AppTemplate>
</template>
<script setup>
import { toRefs } from "vue";
import { useRoute } from "vue-router";
import AppNavBottom from "./components/organisms/AppNavigationBottom.vue";
import SafeArea from "./components/templates/SafeArea.vue";
import AppTemplate from "./components/templates/AppTemplate.vue";

const router = useRoute();
const { meta } = toRefs(router);
</script>
