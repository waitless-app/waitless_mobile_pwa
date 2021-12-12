<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen" v-if="isMobile">
    <div class="text-4xl">
      This app is only available on mobile devices <span role="img" aria-label="hand">👋🏼</span>
    </div>
  </div>
  <AppTemplate v-else>
    <SafeArea>
      <router-view />
    </SafeArea>
    <AppNavBottom v-if="meta?.showNav"/>
  </AppTemplate>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppNavBottom from './components/molecules/AppNavBottom.vue';
import SafeArea from './components/templates/SafeArea.vue';
import AppTemplate from './components/templates/AppTemplate.vue';

export default {
  name: 'App',
  components: {
    AppNavBottom,
    SafeArea,
    AppTemplate,
  },
  setup() {
    const isMobile = ref(false);

    const { meta } = useRoute();

    const handleResize = (e) => {
      isMobile.value = e.target.innerWidth >= 480;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    return { isMobile, meta };
  },
};
</script>
