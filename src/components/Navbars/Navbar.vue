<script setup>
import { useStore } from "vuex";
const store = useStore();
const toggleDarkMode = () => store.commit("toggleDarkMode");
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faGlobe,
  faMoon,
  faExpand,
  faBell,
  faCommentDots,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMagnifyingGlass,
  faGlobe,
  faMoon,
  faExpand,
  faBell,
  faCommentDots,
  faUser
);
</script>

<template>
  <div
    class="h-[50px] border-b border-gray-200 flex items-center text-sm text-gray-700"
  >
    <div class="w-full !px-5 flex items-center justify-between">
      <div class="flex items-center border border-gray-300 !px-2 !py-1">
        <input
          type="text"
          placeholder="Search..."
          class="bg-transparent outline-none placeholder:text-xs text-sm"
        />
        <font-awesome-icon icon="magnifying-glass" size="md" class="ml-1" />
      </div>

      <div class="flex items-center gap-x-5">
        <div class="flex items-center gap-x-1">
          <font-awesome-icon icon="globe" size="md" />
          <span class="font-nunito">English</span>
        </div>

        <font-awesome-icon
          icon="moon"
          size="md"
          class="cursor-pointer"
          @click="toggleDarkMode"
        />

        <font-awesome-icon icon="expand" size="md" />

        <div class="relative">
          <font-awesome-icon icon="bell" size="md" class="mt-1" />
          <div
            class="w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center absolute -top-1 -right-1"
          >
            1
          </div>
        </div>

        <div class="relative">
          <font-awesome-icon icon="comment-dots" size="md" class="mt-1" />
          <div
            class="w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center absolute -top-1 -right-1"
          >
            2
          </div>
        </div>

        <font-awesome-icon icon="user" size="md" />
        <img
          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="avatar"
          class="w-[32px] h-[32px] rounded-full"
        />
      </div>
    </div>
  </div>
</template>
