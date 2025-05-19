<template>
  <div
    class="hidden flex-col min-h-screen border-r border-gray-200 bg-white w-53 md:flex"
  >
    <div class="h-12 flex items-center justify-center">
      <router-link to="/" class="text-xl font-bold text-[#6439ff] font-nunito"
        >Ecommerce</router-link
      >
    </div>
    <hr class="border-gray-200" />

    <div class="pl-4 py-2 overflow-y-auto">
      <ul class="space-y-1">
        <template v-for="section in sidebarItems" :key="section.title">
          <p class="text-xs font-bold text-gray-500 mt-4 mb-1 font-nunito">
            {{ section.title }}
          </p>
          <template v-for="(entry, index) in section.items" :key="index">
            <router-link v-if="entry.to" :to="entry.to">
              <li
                class="flex items-center px-2 py-1 hover:bg-purple-100 cursor-pointer"
              >
                <font-awesome-icon
                  :icon="['fas', entry.icon]"
                  class="text-[#7451f8] w-4 font-[18px]"
                />
                <span
                  class="ml-2 font-[600] text-[13px] text-[#888] font-nunito"
                  >{{ entry.item }}</span
                >
              </li>
            </router-link>
            <li
              v-else
              class="flex items-center px-2 py-1 hover:bg-purple-100 cursor-pointer"
            >

              <font-awesome-icon
                :icon="['fas', entry.icon]"
                class="text-[#7451f8] w-4 font-[18px]"
              />
              <span
                class="ml-2 font-[600] text-[13px] text-[#888] font-nunito"
                >{{ entry.item }}</span
              >
            </li>
          </template>
        </template>
      </ul>
    </div>
    <!-- <div class="flex items-center justify-start gap-x-2 !pl-3 !m-[10px]">
      <div
        class="w-5 h-5 bg-gray-200 border-[1px] border-[#7451f8] rounded cursor-pointer"
        @click="$emit('set-theme', 'light')"
      ></div>
      <div
        class="w-5 h-5 bg-gray-800 border-[1px] border-[#7451f8] rounded cursor-pointer"
        @click="$emit('set-theme', 'dark')"
      ></div>
    </div> -->
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignInAlt,
  faTachometerAlt,
  faUser,
  faStore,
  faCreditCard,
  faTruck,
  faChartBar,
  faBell,
  faHeartbeat,
  faBrain,
  faCogs,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";

library.add(
  faSignInAlt,
  faTachometerAlt,
  faUser,
  faStore,
  faCreditCard,
  faTruck,
  faChartBar,
  faBell,
  faHeartbeat,
  faBrain,
  faCogs,
  faUserCircle,
  faSignOutAlt
);
const sidebarItems = ref([
  {
    title: "MAIN",
    items: [{ item: "Dashboard", icon: "tachometer-alt", to: "/" }],
  },
  {
    title: "LISTS",
    items: [
      {
        item: "Users",
        icon: "user", //to: "/users"
      },
      { item: "Products", icon: "store", to: "/products" },
      { item: "Orders", icon: "credit-card" },
      { item: "Delivery", icon: "truck" },
    ],
  },
  {
    title: "USEFUL",
    items: [
      { item: "Stats", icon: "chart-bar" },
      { item: "Notifications", icon: "bell" },
    ],
  },
  {
    title: "SERVICE",
    items: [
      { item: "System Health", icon: "heartbeat" },
      { item: "Logs", icon: "brain" },
      { item: "Settings", icon: "cogs" },
    ],
  },
  {
    title: "USER",
    items: [
      // { item: "Profile", icon: "user-circle" },
      // { item: "Logout", icon: "sign-out-alt" },
      { item: "Sign In", icon: "sign-in-alt", to: "/signin" },
      { item: "Sign up", icon: "sign-out-alt", to: "/signup" },
    ],
  },
]);
</script>

<style scoped>
</style>
