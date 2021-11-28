<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen" v-if="isMobile">
    <div class="text-4xl">
      This app is only available on mobile devices <span role="img" aria-label="hand">👋🏼</span>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const isMobile = ref(false);

    const handleResize = (e) => {
      isMobile.value = e.target.innerWidth >= 480;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    return { isMobile };
  },
};
</script>
