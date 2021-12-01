<template>
  <div class="w-full h-screen">
    <!-- <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile-->
    <section
      id="bottom-navigation"
      class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
    >
      <div
        id="tabs"
        class="flex justify-between"
      >
        <a
          href="#"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          v-for="item in menu" :key="item.view"
        >
          <span class="tab tab-home block text-xs">{{ item.view }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NavBottom',
  setup() {
    const menu = [
      {
        view: 'Home',
        icon: 'home',
      },
      {
        view: 'Orders',
        icon: 'order',
      },
      {
        view: 'Profile',
        icon: 'profile',
      },

    ];
    return { menu };
  },
};
</script>

<style scoped></style>
