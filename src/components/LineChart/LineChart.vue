<template>
  <div class="w-full h-[400px] !mb-14">
    <AgCharts :options="chartOptions" class="w-full h-full" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { AgCharts } from "ag-charts-vue3";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  titleText: {
    type: String,
    default: "Area Line Chart",
  },
  xKey: {
    type: String,
    default: "date",
  },
  yKey: {
    type: String,
    default: "revenue",
  },
});

const chartOptions = computed(() => ({
  autoSize: true,
  title: {
    text: props.titleText,
    fontSize: 18,
  },
  data: props.data,
  series: [
    {
      type: "area",
      xKey: props.xKey,
      yKey: props.yKey,
      stroke: "#7451f8",
      fill: {
        type: "gradient",
        gradient: "linear",
        rotation: 180,
        colorStops: [
          { color: "#7451f8", stop: 0, opacity: 0.2 },
          { color: "#fff", stop: 1, opacity: 0 },
        ],
      },
      marker: {
        enabled: true,
      },
      interpolation: {
        type: "smooth",
        tension: 1,
      },
    },
  ],
  legend: {
    enabled: false,
  },
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
    },
  ],
}));
</script>

<style scoped>
:deep(.ag-charts-theme-default) {
  width: 100% !important;
  height: 100% !important;
}
</style>
