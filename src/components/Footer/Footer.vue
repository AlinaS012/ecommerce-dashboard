<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <footer class="py-3">
    <div class="w-full px-4">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="mb-4 lg:mb-0 lg:w-1/2">
          <div
            class="text-sm text-center text-gray-500"
            :class="store.state.isRTL ? 'lg:text-right' : 'lg:text-left'"
          >
            © {{ new Date().getFullYear() }}, made
            <i class="fa fa-heart text-red-500"></i> by
            <a
              href="/"
              class="font-bold text-gray-700 hover:underline"
              target="_blank"
            >
              Alina Soomro
            </a>
          </div>
        </div>

        <div class="lg:w-1/2">
          <ul
            class="flex flex-wrap justify-center lg:justify-end space-x-4 gap-x-4 text-sm text-gray-500"
          >
            <li>
              <a href="/" class="hover:text-gray-700" target="_blank">
                About Us
              </a>
            </li>
            <li>
              <a href="/" class="hover:text-gray-700" target="_blank"> Blog </a>
            </li>
            <li>
              <a href="/" class="pe-0 hover:text-gray-700" target="_blank">
                License
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
