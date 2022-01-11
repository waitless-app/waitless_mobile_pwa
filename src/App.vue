<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen" v-if="isMobile">
    <div class="text-4xl">
      This app is only available on mobile devices <span role="img" aria-label="hand">👋🏼</span>
    </div>
  </div>
  <AppTemplate v-else>
    <SafeArea>
      <router-view v-slot="{ Component }">
        <suspense>
          <template #default>
            <component :is="Component"></component>
          </template>
          <template #fallback> loadin... </template>
        </suspense>
      </router-view>
    </SafeArea>
    <AppNavBottom v-if="meta?.showNav" />
  </AppTemplate>
</template>
<script setup>
import { onMounted, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import AppNavBottom from "./components/organisms/AppNavigationBottom.vue";
import SafeArea from "./components/templates/SafeArea.vue";
import AppTemplate from "./components/templates/AppTemplate.vue";

const isMobile = ref(false);

const router = useRoute();
const { meta } = toRefs(router);

const handleResize = (e) => {
  isMobile.value = e.target.innerWidth >= 480;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
</script>
