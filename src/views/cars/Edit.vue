<template>
	<b-row class="match-height">
		<b-col lg="6">
			<h2 class="mb-2">Datos del Cliente</h2>
			<EditCar v-if="car" />
		</b-col>
		<b-col lg="6">
		<!--<h2 class="mb-2">Datos del Vehículo</h2>-->
			<ShowDataCar v-if="car" />
		</b-col>
	</b-row>
</template>

<script>
import EditCar from './components/EditCar.vue'
import ShowDataCar from './components/ShowDataCar.vue'

import { ref, computed } from '@vue/composition-api'

import { useRouter } from '@core/utils/utils'

import { BRow, BCol } from 'bootstrap-vue'

import store from '@/store'

export default {
	components: {
    BRow,
    BCol,
    EditCar,
    ShowDataCar,
},
	setup() {
		const { route } = useRouter()

		const car = computed(() => store.state.cars.car)

		const getCar = async () => {
			store
				.dispatch('cars/getCar', { id: route.value.params.id })
				.then((response) => {})
				.catch((error) => {
					console.log(error)
				})
		}

		getCar()

		return {
			car,
		}
	},
}
</script>
