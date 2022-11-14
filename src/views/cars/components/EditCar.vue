<template>
	<b-form @submit.prevent>
		<b-row>
			<!-- Status -->
			<b-col cols="12">
				<b-form-group label="Activo" label-for="v-status">
					<b-form-checkbox
						id="v-status" 
						class="custom-control-success"
						v-model="car.status"
						:value="1"
						:unchecked-value="0"
						checked 
						switch
					/>
				</b-form-group>
			</b-col>
		</b-row>

		<b-row>
			<!-- Price -->
			<b-col cols="4">
				<b-form-group label="Precio" label-for="v-price">
					<b-form-input v-model="car.price" id="v-price" type="number" 
					min="1" placeholder="Precio" :state="priceState" 
					aria-describedby="v-price-feedback"/>
					<b-form-invalid-feedback id="v-price-feedback">
						Ingrese un valor mayor que 0
					</b-form-invalid-feedback>
				</b-form-group>
			</b-col>
		</b-row>

		<b-row>
			<!-- Comment -->
			<b-col>
				<b-form-group label="Comentario" label-for="v-comment">
					<b-form-textarea 
						id="v-comment" 
						v-model="car.comment" 
						placeholder="Ingrese algun comentario" 
						rows="3">
					</b-form-textarea>
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
