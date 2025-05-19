
<template>
  <div class="flex-[2] shadow-md !p-2 !px-4">
    <div class="flex items-center justify-between text-gray-500 flex-[1]">
      <h1 class="text-base font-medium font-nunito">{{ title }}</h1>
      <font-awesome-icon icon="ellipsis-v" class="text-sm" />
    </div>

    <div
      class="!p-5 flex flex-col items-center justify-around gap-y-4 flex-[3]"
    >
      <div class="w-full h-40 !gap-y-0.5">
        <AgCharts :options="chartOptions" class="w-full h-full" />
      </div>
      <p class="font-medium text-gray-500 font-nunito">Total sales made</p>
      <p class="text-2xl font-nunito">{{ totalRevenue }}</p>
      <p class="font-light text-xs font-nunito text-gray-500 text-center">
        Previous transactions processing. Last payments may not be included.
      </p>
      <div class="w-full flex items-center justify-between">
        <div class="text-center">
          <div class="text-sm text-gray-500 font-nunito">Target</div>
          <div class="flex items-center mt-2 text-sm text-red-600">
            <font-awesome-icon icon="arrow-down" class="text-xs mr-1" />
            <div class="font-nunito">$12.4k</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-500 font-nunito">Last Week</div>
          <div class="flex items-center mt-2 text-sm text-green-600">
            <font-awesome-icon icon="arrow-up" class="text-xs mr-1" />
            <div class="font-nunito">$12.4k</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-sm font-nunito text-gray-500">Last Month</div>
          <div class="flex items-center mt-2 text-sm text-green-600">
            <font-awesome-icon icon="arrow-up" class="text-xs mr-1" />
            <div class="font-nunito">$12.4k</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { AgCharts } from "ag-charts-vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEllipsisV,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const store = useStore();
const totalRevenue = computed(() => store.state.totalRevenue);
library.add(faEllipsisV, faArrowUp, faArrowDown);

const props = defineProps({
  title: {
    type: String,
    default: "Total Sales",
  },
  data: {
    type: Array,
    default: () => [
      { label: "Completed", value: 70 },
      { label: "Remaining", value: 30 },
      //   { label: "Completed", value: (totalRevenue / 5000) * 100 },
      //   { label: "Remaining", value: 100 - (totalRevenue / 5000) * 100 },
    ],
  },
  totalAmount: {
    type: String,
    default: "$420",
    // default: `${totalRevenue}`,
  },
});

const chartOptions = computed(() => ({
  data: [
    { label: "Completed", value: (totalRevenue.value / 5000) * 100 },
    { label: "Remaining", value: 100 - (totalRevenue.value / 5000) * 100 },
  ],
  series: [
    {
      type: "donut",
      angleKey: "value",
      calloutLabelKey: "label",
      innerRadiusRatio: 0.85,
      fills: ["#7451f8", "#e5e7eb"],
      innerLabels: [
        {
          text: `$${totalRevenue.value}`,//props.totalAmount,
          fontSize: 24,
          fontWeight: "medium",
        },
        // {
        //   text: "Total",
        //   fontSize: 14,
        //   margin: 4,
        // },
      ],
    },
  ],
  legend: {
    enabled: false,
  },
}));
</script>
