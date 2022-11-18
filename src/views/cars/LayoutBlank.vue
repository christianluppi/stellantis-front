<template>
  <b-row class="match-height">
		<b-col lg="6">
			<LayoutBlank v-if="car" />
		</b-col>
	</b-row>
</template>

<script>
import LayoutBlank from './components/LayoutBlank.vue'

import { ref, computed } from '@vue/composition-api'

import { useRouter } from '@core/utils/utils'

import { BRow, BCol } from 'bootstrap-vue'

import store from '@/store'

export default {
	components: {
    BRow,
    BCol,
    LayoutBlank,
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
