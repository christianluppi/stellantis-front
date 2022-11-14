<template>
	<b-row class="match-height">
		<b-col lg="8">
			<h2 class="mb-2">Crear Vehículo</h2>
			<CreateCar />
		</b-col>
	</b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import CreateCar from './components/CreateCar.vue'

import store from '@/store'

export default {
	components: {
		BRow,
		BCol,
		CreateCar
	},
	setup() {
		const definition = 'cars'

		const clearCar = () => {
			store.dispatch(`${definition}/clearCar`).catch((error) => {
		 		console.log(error)
			})
		}

		// const clearSelectedImage = () => {
		// 	store.dispatch(`${definition}/clearSelectedImage`).catch((error) => {
		// 		console.log(error)
		// 	})
		// }

		// const clearSelectedFileSrc = () => {
		// 	store.dispatch(`${definition}/clearSelectedFileSrc`).catch((error) => {
		// 		console.log(error)
		// 	})
		// }

		// const clearselectedCategories = () => {
		// 	store.dispatch(`${definition}/clearselectedCategories`).catch((error) => {
		// 		console.log(error)
		// 	})
		// }

		// const clearselectedLabels = () => {
		// 	store.dispatch(`${definition}/clearselectedLabels`).catch((error) => {
		// 		console.log(error)
		// 	})
		// }

		// const getCategories = () => {
		// 	store.dispatch('category/getAllCategories').catch((error) => {
		// 		console.log(error)
		// 	})
		// }

		// const getLabels = () => {
		// 	store.dispatch('label/getAllLabels').catch((error) => {
		// 		console.log(error)
		// 	})
		// }

		// const getImages = () => {
		// 	store
		// 		.dispatch('image/getAllImages')
		// 		.catch((error) => {
		// 			console.log(error)
		// 		})
		// }

		// getCategories()
		// getLabels()
		// getImages()

		clearCar()
		// clearSelectedImage()
		// clearSelectedFileSrc()
		// clearselectedCategories()
		// clearselectedLabels()

		return {
		}
	},
}
</script>
