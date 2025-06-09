<template>
  <div class="overflow-x-auto rounded-lg shadow">
    <table class="table w-full table-zebra">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i" class="text-base font-semibold">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(cell, j) in row" :key="j">
            <slot :name="`cell-${j}`" :cell="cell" :row="row" :rowIndex="i" :cellIndex="j">
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="error">
        <tr>
          <td :colspan="headers.length" class="text-error">{{ error }}</td>
        </tr>
      </tfoot>
      <tfoot v-else-if="!rows.length">
        <tr>
          <td :colspan="headers.length">No data found.</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: Array,
  rows: Array,
  error: String,
})
</script>
