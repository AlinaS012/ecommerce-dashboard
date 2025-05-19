<script>
import { defineProps } from "vue";

const props = defineProps({
  isLoading: Boolean,
  abs: Boolean,
});
</script>

<template>
  <div
    :class="[
      'inset-0 bg-opacity-50 z-10 flex items-center justify-center',
      abs ? 'absolute' : 'relative',
    ]"
  >
    <svg
      :class="['animate-spin h-8 w-8', abs ? 'text-blue-600' : 'text-blue-600']"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
      />
    </svg>
  </div>
</template>