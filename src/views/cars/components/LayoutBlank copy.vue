<template>
	<b-form @submit.prevent>
		<b-row>
			<!-- Name -->
			<b-col>
			<b-form-group label="Nombre" label-for="v-nombre">
				<b-form-input v-model="car.nombre" id="v-nombre"/>
			</b-form-group>
			</b-col>
			<b-col cols="6">
				<pdf src="C:/Users/ChristianLuppi/Downloads/prueba.pdf"></pdf>
			</b-col>
		</b-row>
		<b-row>
			<!-- Apellido -->
			<b-col>
			<b-form-group label="Apellido" label-for="v-apellido">
				<b-form-input v-model="car.apellido" id="v-apellido"/>
			</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- submit and cancel -->
			<b-col mb-5 cols="12">
				<b-button
					v-ripple.400="'rgba(255, 255, 255, 0.15)'"
					type="submit"
					variant="primary"
					class="mr-1"
					:disabled="submitButtonState"
					@click="onSubmit"
				>
					Guardar
				</b-button>
				<b-button
					v-ripple.400="'rgba(186, 191, 199, 0.15)'"
					type="reset"
					variant="outline-secondary"
					@click="$router.go(-1)"
				>
					Cancelar
				</b-button>
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

import pdf from 'vue-pdf'

export default{
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
		pdf,
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

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';

#pdfviewer {
		height: 640px;
	}
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
