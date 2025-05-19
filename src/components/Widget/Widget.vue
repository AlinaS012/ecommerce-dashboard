
<template>
  <div
    class="flex justify-between flex-1 !p-[10px] rounded-[10px] !h-[100px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)]"
  >
    <div class="flex flex-col justify-between">
      <span class="font-bold text-[14px] text-[rgb(160,160,160)] font-nunito">
        {{ data.title }}
      </span>
      <span class="text-[28px] font-light font-nunito">
        {{ variant === "user" || variant === "order" ? "" : "$" }} {{ amount }}
      </span>
      <span class="text-[12px] border-b border-gray-400 w-max cursor-pointer">
        {{ data.link }}
      </span>
    </div>

    <div class="flex flex-col justify-between items-end">
      <div
        class="flex items-center text-[14px]"
        :class="diff >= 0 ? 'text-green-600' : 'text-red-600'"
      >
        <font-awesome-icon
          :icon="diff >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down']"
          :class="diff >= 0 ? 'text-green-600' : 'text-red-600'"
          class="mr-1"
        />

        {{ diff }} %
      </div>
      <font-awesome-icon
        :icon="data.icon"
        class="text-[18px] p-[5px] rounded-[5px]"
        :style="{ backgroundColor: data.bgColor, color: data.color }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faStore,
  faCreditCard,
  faChartBar,
  faWallet,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faStore,
  faCreditCard,
  faChartBar,
  faWallet,
  faArrowDown,
  faArrowUp
);

const props = defineProps({
  variant: String,
  amount: Number,
  diff: Number,
});

const data = computed(() => {
  switch (props.variant) {
    case "user":
      return {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: ["fas", "user"],
        color: "crimson",
        bgColor: "rgba(255, 0, 0, 0.2)",
      };
    case "order":
      return {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: ["fas", "store"],
        color: "goldenrod",
        bgColor: "rgba(218, 165, 32, 0.2)",
      };
    case "earning":
      return {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: ["fas", "credit-card"],
        color: "green",
        bgColor: "rgba(0, 128, 0, 0.2)",
      };
    case "balance":
      return {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: ["fas", "wallet"],
        color: "purple",
        bgColor: "rgba(128, 0, 128, 0.2)",
      };
    default:
      return {};
  }
});

const amount = props.amount;
const diff = props.diff;
</script>

<script>
export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>
