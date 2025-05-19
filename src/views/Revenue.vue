<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import Widget from "@/components/Widget/Widget.vue";
import LineChart from "@/components/LineChart/LineChart.vue";
import RevenueTable from "@/components/Revenue/RevenueTable.vue";
import Featured from "@/components/Featured/Featured.vue";
import axios from "axios";

const store = useStore();

const rows = ref([]);
const loading = ref(false);
const error = ref(null);
const totalRevenue = computed(() => store.state.totalRevenue);

const columns = [
  { headerName: "ASIN", field: "asin" },
  { headerName: "Category", field: "category" },
  { headerName: "Title", field: "product_title" },
  { headerName: "Price", field: "product_price" },
  { headerName: "Original Price", field: "product_original_price" },
  {
    headerName: "Photo",
    field: "product_photo",
    cellRenderer: (params) => `<img src="${params.value}" width="50" />`,
  },
  { headerName: "Delivery", field: "delivery" },
  {
    headerName: "Stock Level",
    field: "stock_level",
    editable: true,
    cellEditor: "agNumberCellEditor",
  },
  { headerName: "Low Inventory Threshold", field: "low_inventory_threshold" },
  {
    headerName: "Restock Recommended",
    field: "restock_recommended",
    cellRenderer: (params) => (params.value ? "Yes" : "No"),
  },
];

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "https://ecommerce-dashboard-backend-gilt.vercel.app/api/getProductDetails"
    );
    rows.value = response.data;
    console.log(response.data, "data res");
  } catch (err) {
    error.value = err.message || "Failed to fetch data";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const time = ref("yearly");
const category = ref("other");
const startDate = ref("");
const endDate = ref("");
const chartData = ref([]);

function getDateRange(rangeType) {
  const today = new Date();
  let start, end;

  if (rangeType === "weekly") {
    const dayOfWeek = today.getDay();
    start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else if (rangeType === "monthly") {
    start = new Date(today.getFullYear(), today.getMonth(), 1);
    end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  } else if (rangeType === "yearly") {
    start = new Date(today.getFullYear(), 0, 1);
    end = new Date(today.getFullYear(), 11, 31);
  }

  startDate.value = start.toISOString().split("T")[0];
  endDate.value = end.toISOString().split("T")[0];
}

async function fetchFilteredData() {
  console.log("Fetching data for:", {
    category: category.value,
    time: time.value,
  });

  const res = await axios.get(
    `https://ecommerce-dashboard-backend-gilt.vercel.app/api/getRevenueOrders?category=${category.value}&startDate=${startDate.value}&endDate=${endDate.value}`
  );
  console.log(res, "res");
  const revenueByDate = {};
  //   store.state.totalRevenue = res.data[0].total_revenue;
  store.commit("setTotalRevenue", res.data[0].total_sales);

  res.data.forEach((item) => {
    item.filtered_sales_data.forEach(({ date, revenue }) => {
      if (!revenueByDate[date]) {
        revenueByDate[date] = 0;
      }
      revenueByDate[date] += revenue;
    });
  });

  chartData.value = Object.entries(revenueByDate)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
watch([category, time], async () => {
  if (category.value || time.value) {
    getDateRange(time.value);
    await fetchFilteredData();
  }
});
</script>

<template>
  <div class="flex overflow-y-auto h-screen">
    <div class="flex-[6]">
      <div class="flex gap-[20px] !p-[20px]">
        <Widget variant="user" :amount="100" :diff="20" />
        <Widget variant="order" :amount="200" :diff="10" />
        <Widget variant="earning" :amount="500" :diff="12" />
        <Widget variant="balance" :amount="1000" :diff="-8" />
      </div>

      <div
        class="flex flex-col gap-[20px] !px-[20px] !py-[5px] rounded-md md:flex-row"
      >
        <Featured />
        <div
          class="flex-[4] w-full h-fill shadow-md rounded-xl sm:h-[375px] md:h-[400px] lg:h-[450px]"
        >
          <div class="flex gap-x-6 justify-between">
            <h3 class="text-base font-medium font-nunito text-gray-600 ml-2">
              Total Revenue
            </h3>

            <div class="flex items-center gap-x-2 px-2">
              <select
                v-model="category"
                name="category"
                class="input outline-none text-sm border rounded-md border-gray-100 text-nunito px-2 text-gray-600 h-[50px]"
              >
                <option disabled default value="">Filter By category</option>
                <option value="cables">Cables</option>
                <option value="chargers">Chargers</option>
                <option value="accessories">Accessories</option>
                <option value="audio">Audio</option>
                <option value="mounts">Mounts</option>
                <option value="other">Other</option>
              </select>
              <select
                name="time"
                v-model="time"
                class="input outline-none border text-sm border-gray-100 px-2 rounded-md text-nunito text-gray-600 h-[50px]"
              >
                <option disabled default value="">Filter By Range</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
                <option value="yearly">This Year</option>
              </select>
            </div>
          </div>

          <LineChart :data="chartData" titleText="" :aspect="2 / 1" />
        </div>
      </div>

      <div
        class="shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] !p-[20px] !m-[20px] !mt-25"
      >
        <div class="font-medium text-gray-500 mb-[15px]">Latest Products</div>
        <RevenueTable :rows="rows" :columns="columns" />
      </div>
    </div>
  </div>
</template>



