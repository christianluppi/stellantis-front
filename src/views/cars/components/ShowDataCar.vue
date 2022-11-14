<template>
	<b-form @submit.prevent>
		<b-row>
			<!-- Name -->
			<b-col>
				<b-form-group label="Nombre" label-for="v-nombre">
					<b-form-input v-model="car.location" id="v-nombre" 
					disabled placeholder="Nombre" />
				</b-form-group>
			</b-col>

		</b-row>
		<b-row>
			<!-- last_name -->
			<b-col cols="6">
				<b-form-group label="Apellido" label-for="v-apellido">
					<b-form-input v-model="car.cms_id" id="v-apellido" 
					disabled placeholder="Apellido" />
				</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- dni -->
			<b-col cols="6">
				<b-form-group label="DNI" label-for="v-dni">
					<b-form-input v-model="car.license_plate" id="v-dni" 
					disabled placeholder="DNI" />
				</b-form-group>
			</b-col>
		</b-row>
	</b-form>
</template>

<script>
import {
	BRow,
	BCol,
	BForm,
	BButton,
	BFormInput,
	BFormGroup,
	BFormTextarea,
	BFormCheckbox,
	BFormDatepicker,
	BFormInvalidFeedback,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

import vSelect from 'vue-select'

import { useRouter } from '@core/utils/utils'

import { ref, computed, watch } from '@vue/composition-api'

import store from '@/store'

export default {
	components: {
		BRow,
		BCol,
		BForm,
		vSelect,
		BButton,
		BFormGroup,
		BFormInput,
		BFormTextarea,
		BFormCheckbox,
		BFormDatepicker,
		BFormInvalidFeedback,
	},
	directives: {
		Ripple,
	},
	props: ['data'],
	setup(props) {
		
		const definition = 'cars'

		const { router } = useRouter()

		const options = computed(() => store.state.cars.options)

		const car = computed({
			get: () => store.state.cars.car,
			set: (val) => {
				store.commit('cars/setCar', val)
			},
		})

		const onSubmit = async () => {
			store
				.dispatch(`${definition}/editCar`, car.value)
				.then((response) => {
					router.push({ name: definition })
				})
				.catch((error) => {
					console.log(error)
				})
		}

		//const hasNameAndTitle = computed(() => store.state.article.hasTitle && store.state.article.hasName)
		const priceState = computed(() => 0 < car.value.price)
		//const contentState = computed(() => !!article.value.content && article.value.content.length > 9)
		const submitButtonState = computed(() => !priceState.value)

		return {
			car,
			onSubmit,
			options,
			priceState,
			//contentState,
			submitButtonState,
		}
	},
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.customClass {
	.ql-snow .ql-stroke {
	  /* aqui */
	  stroke: #ea5455;
	}
	.ql-toolbar.ql-snow {
	  /* aqui */
	  border: 1px solid #ea5455;
	}
	.ql-container.ql-snow {
	  /* aqui */
	  border: 1px solid #ea5455;
	}
	.ql-snow .ql-fill,
	.ql-snow .ql-stroke.ql-fill {
	  fill: #ea5455;
	}
	.ql-snow .ql-tooltip {
	  color: #ea5455;
	}
}
</style>
