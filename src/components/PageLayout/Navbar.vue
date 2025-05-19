<script setup>
defineProps({
  btnBackground: {
    type: String,
    default: "",
  },
  isBlur: {
    type: String,
    default: "",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  isBtn: { type: String, default: "bg-gradient-light" },
});
</script>

<template>
  <nav
    class="ml-10 fixed top-5 z-[3] rounded-xl !mt-4 w-4/5 flex !justify-center px-10 py-5 backdrop-saturate-200 backdrop-blur-[30px] bg-white/80"
    :class="isBlur ? isBlur : 'shadow-none !my-2 bg-transparent'"
  >
    <div
      class="container mx-auto flex flex-wrap items-center justify-between !ps-2 !pe-0 !mx-auto flex-row"
    >
      <router-link
        to="/"
        class="font-bold !ms-3 lg:!ms-0"
        :class="darkMode ? 'text-black' : 'text-white'"
      >
        Ecommerce
      </router-link>

      <button
        class="shadow-none ms-2 lg:hidden"
        type="button"
        @click="toggleCollapse"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="mt-2 block">
          <span class="block w-5 h-0.5 bg-current mb-1"></span>
          <span class="block w-5 h-0.5 bg-current mb-1"></span>
          <span class="block w-5 h-0.5 bg-current"></span>
        </span>
      </button>

      <div
        class="w-full lg:flex lg:items-center lg:w-auto"
        :class="{ hidden: !collapseOpen }"
        id="navigation"
      >
        <ul class="flex flex-col lg:flex-row lg:items-center lg:mx-auto">
          <li class="!me-2">
            <router-link
              to="/dashboard-default"
              class="flex items-center nav-link !me-2 active text-white"
              aria-current="page"
            >
              <font-awesome-icon
                icon="chart-pie"
                class="opacity-60 !me-1"
                :class="isBlur ? 'text-black' : 'text-white'"
              />
              Dashboard
            </router-link>
          </li>

          <li class="!me-2">
            <router-link to="/signup" class="nav-link !me-2 text-white">
              <font-awesome-icon
                icon="user-circle"
                class="opacity-60 !me-1"
                :class="isBlur ? 'text-black' : 'text-white'"
              />
              Sign Up
            </router-link>
          </li>
          <li class="!me-2">
            <router-link to="/signin" class="nav-link !me-2 text-white">
              <font-awesome-icon
                icon="key"
                class="opacity-60 !me-1"
                :class="isBlur ? 'text-black' : 'text-white'"
              />
              Sign In
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>



<script>
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faChartPie,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChartPie, faUserCircle, faKey);
</script>
