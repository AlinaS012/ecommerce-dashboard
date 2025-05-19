<!-- <template>
  <div class="bg-white shadow rounded-2xl p-4 overflow-x-auto">
    <h2 class="text-lg font-semibold mb-4">Recent Revenue</h2>
    <table class="min-w-full text-sm">
      <thead class="text-left text-gray-500 border-b">
        <tr>
          <th class="py-2">Date</th>
          <th class="py-2">Product</th>
          <th class="py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in revenues"
          :key="item.date"
          class="border-b hover:bg-gray-50"
        >
          <td class="py-2">{{ item.date }}</td>
          <td class="py-2">{{ item.product }}</td>
          <td class="py-2 font-semibold">{{ item.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const revenues = [
  { date: "2025-05-01", product: "Pro Plan", amount: "$99.00" },
  { date: "2025-05-02", product: "Basic Plan", amount: "$49.00" },
  { date: "2025-05-03", product: "Enterprise", amount: "$299.00" },
];
</script> -->
<script setup>
import { ref, watch } from "vue";
import { AgGridVue } from "ag-grid-vue3";

// Props: rows (data) and columns (definitions)
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

// Internal reactive state for columnDefs and rowData
const columnDefs = ref([]);
const rowData = ref([]);

// Watch for prop changes and set reactive vars
watch(
  () => props.columns,
  (newCols) => {
    // Enhance columnDefs for specific columns if needed (image/status rendering)
    columnDefs.value = newCols.map((col) => {
      if (col.field === "product") {
        return {
          ...col,
          cellClass: "tableCell",
          cellRenderer: (params) => {
            return `<div class="cellWrapper">
                    <img src="${params.data.img}" alt="" class="image" />
                    ${params.value}
                  </div>`;
          },
        };
      }
      if (col.field === "status") {
        return {
          ...col,
          cellClass: "tableCell",
          cellRenderer: (params) => {
            const status = params.value || "";
            return `<span class="status ${status.toLowerCase()}">${status}</span>`;
          },
        };
      }
      return { ...col, cellClass: "tableCell" };
    });
  },
  { immediate: true }
);

watch(
  () => props.rows,
  (newRows) => {
    rowData.value = newRows;
  },
  { immediate: true }
);

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
  sortable: true,
  filter: true,
};
</script>

<template>
  <div
    class="ag-theme-alpine table-container"
    style="width: 100%; height: 100%"
  >
    <AgGridVue
      class="ag-grid-table"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      rowHeight="60"
      suppressRowClickSelection
      :pagination="true"
      :paginationPageSize="5"
      :paginationPageSizeSelector="[5, 10, 15]"
      domLayout="autoHeight"
    />
  </div>
</template>

<style scoped>
.table-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.tableCell {
  font-size: 14px;
  color: #555;
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
