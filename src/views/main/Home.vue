<template>
  <div>
    <!-- {{ paises }} -->
    <!-- {{ fichas }} -->
    <Tabla v-if="fichas" :fichas="fichas" :loading="loading" />

    <b-pagination
      v-if="fichas"
      v-model="getPage"
      :total-rows="fichas.total"
      :per-page="fichas.per_page"
    />
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'

import store from '@/store'

import Tabla from './components/Tabla.vue'
import { BPagination } from 'bootstrap-vue'

export default {
  components: {
    Tabla,
    BPagination,
  },
  setup() {
    const paises = ref(null)
    const fichas = ref(null)

    const loading = ref(false)

    const getPage = ref(1)
    const getPaginate = ref(20)
    const searchQuery = ref('')

    const getPaises = () => {
      store.dispatch(`getPaises`).then(response => {
        paises.value = response.data
      })
    }

    const getFichas = () => {
      store
        .dispatch(`getFichas`, {
          search: searchQuery.value,
          getPaginate: getPaginate.value,
          getPage: getPage.value,
          user_id: 5,
          // 1 - admin,
          // 2 - peru,
          // 3 - ecuador,
          // 4 - chile,
          // 5 - SM,
          // 6 - México
        })
        .then(response => {
          console.log(response.data)
          fichas.value = response.data
        })
    }

    getPaises()
    getFichas()

    watch([getPage], () => {
      getFichas()
    })

    return {
      paises,
      fichas,
      // paginación
      getPage,
      getFichas,
      loading,
    }
  },
}
</script>

<style></style>
