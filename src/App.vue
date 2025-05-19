<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Sidenav from "@/components/Sidenav/Sidenav.vue";
import Navbar from "@/components/Navbars/Navbar.vue";
import AppFooter from "@/components/Footer/Footer.vue";
const store = useStore();
const isNavFixed = computed(() => store.state.isNavFixed);
const darkMode = computed(() => store.state.darkMode);
const isAbsolute = computed(() => store.state.isAbsolute);
const showSidenav = computed(() => store.state.showSidenav);
const layout = computed(() => store.state.layout);
const showNavbar = computed(() => store.state.showNavbar);
const showFooter = computed(() => store.state.showFooter);
const showConfig = computed(() => store.state.showConfig);
const hideConfigButton = computed(() => store.state.hideConfigButton);
const toggleConfigurator = () => store.commit("toggleConfigurator");

const navClasses = computed(() => {
  return {
    "sticky bg-white left-auto top-2 z-50": isNavFixed.value && !darkMode.value,
    "sticky bg-gray-900 left-auto top-2 z-50":
      isNavFixed.value && darkMode.value,
    "absolute px-4 mx-0 w-full z-20": isAbsolute.value,
    "px-0 mx-4": !isAbsolute.value,
  };
});
</script>
<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <sidenav v-if="showSidenav" />

    <main class="flex-1 relative max-h-screen overflow-auto rounded-lg">
      <navbar :class="[navClasses]" v-if="showNavbar" />
      <router-view />
      <app-footer v-show="showFooter" />
    </main>
  </div>
</template>


<style scoped>
</style>
