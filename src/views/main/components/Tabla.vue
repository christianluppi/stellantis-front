<template>
  <div>
    <!-- {{ fichas }} -->
    <b-card>
      <div class="row">
        <div class="form-group pt-1 pl-2 col-2">
          <select class="form-control" name="" id="">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div class="form-group p-1 col-4">
          <input type="text" class="form-control" placeholder="Búsqueda" />
        </div>
      </div>
      <b-table
        v-if="fichas"
        responsive
        :busy="loading"
        :items="fichas.data"
        :fields="camposTH"
      >
        <template #table-busy>
          <div class="d-flex justify-content-center mb-3">
            <b-spinner
              style="width: 3rem; height: 3rem; color:#9187f4;"
              label="Loading..."
            />
          </div>
        </template>
        <template #cell(auto)="data">
          <!-- {{ data.item }}<br /> -->
          {{ data.item.make }}<br />
          {{ data.item.model }}<br />
          {{ data.item.trim }}<br />
          {{ data.item.year }}<br />
          {{ data.item.mileage }} Km<br />
        </template>
        <template #cell(negocios)="data">
          <div
            v-for="(negocio, index) in data.item.config"
            :key="'negocios_' + index"
          >
            <a
              target="_blank"
              :href="
                `/negocio/${negocio.negocio.slug}/ficha/${data.item.inspeccion_id}`
              "
              title="Revisar Ficha"
            >
              <b-badge :variant="badgeVariante(index)" class="mb-1">
                {{ negocio.negocio.nombre }}
              </b-badge></a
            >
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { BTable, BButton, BSpinner, BBadge, BCard } from 'bootstrap-vue'

import { ref, watch } from '@vue/composition-api'

export default {
  components: {
    BTable,
    BButton,
    BSpinner,
    BBadge,
    BCard,
  },
  props: ['fichas', 'loading'],
  setup() {
    const camposTH = ref([
      { key: 'car_id', label: 'Car ID' },
      { key: 'config_id', label: 'Config ID' },
      { key: 'auto', label: 'Auto' },
      { key: 'negocios', label: 'Negocios' },
    ])

    const badgeVariante = index => {
      switch (index) {
        case 0:
          return 'primary'
          break

        case 1:
          return 'info'
          break

        case 2:
          return 'warning'
          break

        case 3:
          return 'danger'
          break

        case 4:
          return 'primary'
          break

        default:
          return 'success'
          break
      }
    }

    return {
      camposTH,
      badgeVariante,
    }
  },
}
</script>

<style>
.card-body {
  padding: 0px !important;
}
</style>
