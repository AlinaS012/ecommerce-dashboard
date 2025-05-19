<template>
  <div class="relative flex flex-column justify-start">
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center"
    >
      <CircularProgress :abs="true" />
    </div>
    <ag-grid-vue
      class="ag-grid-table"
      style="width: 100%; height: 100%"
      :columnDefs="columns"
      :rowData="rows"
      :pagination="true"
      :paginationPageSize="5"
      :paginationPageSizeSelector="[5, 10, 15]"
      :modules="modules"
      suppressRowClickSelection
      domLayout="autoHeight"
      @cell-value-changed="onCellValueChanged"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  AllCommunityModule,
} from "ag-grid-community";
import CircularProgress from "@/components/CircularProgress/CircularProgress.vue";
import { useToast } from "vue-toast-notification";
import axios from 'axios';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

defineProps({
  columns: Array,
  rows: Array,
});

const modules = [ClientSideRowModelModule];

const isLoading = ref(false);
const toast = useToast();

async function onCellValueChanged(params) {
  if (params.colDef.field === "stock_level") {
    isLoading.value = true;

    try {
      const updatedRow = params.data;
      const newValue = params.newValue;

      console.log(updatedRow, "row data");

      await axios.put(
        `https://ecommerce-dashboard-backend-gilt.vercel.app/api/updateInventory?asin=${updatedRow.asin}`,
        {
          stock_level: updatedRow.stock_level,
        }
      );

      params.node.setDataValue("stock_level", newValue);
      toast.success("Stock updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.success("Error while updating stock!");
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<style scoped>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-alpine.css";

.table-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.tableCell {
  font-size: 14px;
  color: oklch(94.6% 0.033 307.174) !important;
  padding: 8px !important;
  display: flex;
  align-items: center;
}

.cellWrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.image {
  width: 40px;
  height: 20px;
  object-fit: cover;
  border-radius: 4px;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  min-width: 80px;
  display: inline-block;
  color: white;
}

.status.approved {
  background-color: #4caf50;
}

.status.pending {
  background-color: #ff9800;
}

.status.declined {
  background-color: #f44336;
}
</style>
