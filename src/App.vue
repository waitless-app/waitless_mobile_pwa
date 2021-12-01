<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen" v-if="isMobile">
    <div class="text-4xl">
      This app is only available on mobile devices <span role="img" aria-label="hand">👋🏼</span>
    </div>
  </div>
  <div class="bg-gray-900" v-else>
    <router-view></router-view>
    <NavBottom></NavBottom>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import NavBottom from './components/core/NavBottom.vue';

export default {
  name: 'App',
  components: {
    NavBottom,
  },
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
