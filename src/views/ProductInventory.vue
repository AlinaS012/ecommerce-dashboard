<template>
  <div class="h-[600px] !p-5 flex flex-col overflow-y-auto">
    <div
      class="flex items-center justify-between text-2xl text-gray-500 mb-2 font-nunito"
    >
      Products
      <RouterLink
        to="/new/product"
        class="text-green-600 bg-red-100 font-nunito text-base font-normal border border-green-600 px-2 py-1 rounded cursor-pointer hover:bg-teal-500 hover:text-white"
      >
        Add New
      </RouterLink>
    </div>
    <CircularProgress v-if="loading" :abs="true" />
    <ProductTable :columns="columns" :rows="rowData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductTable from "@/components/ProductTable/ProductTable.vue";
import CircularProgress from "@/components/CircularProgress/CircularProgress.vue";
import axios from "axios";

const rowData = ref([]);
const loading = ref(false);
const error = ref(null);
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
    rowData.value = response.data;
    console.log(response.data, "data res");
  } catch (err) {
    error.value = err.message || "Failed to fetch data";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
