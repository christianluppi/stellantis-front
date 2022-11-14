<template>
	<b-form @submit.prevent>
		<b-row>
			<!-- cms_id -->
			<b-col cols="6">
				<b-form-group label="CMS ID" label-for="v-cms-id">
					<b-form-input v-model="car.cms_id" id="v-cms-id" disabled placeholder="CMS ID" />
				</b-form-group>
			</b-col>

			<!-- inspeccion_id -->
			<b-col cols="6">
				<b-form-group label="Inspeccion ID" label-for="v-inspeccion-id">
					<b-form-input v-model="car.inspeccion_id" id="v-inspeccion-id" disabled placeholder="Inspeccion ID" />
				</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- license_plate -->
			<b-col cols="6">
				<b-form-group label="Patente" label-for="v-license-plate">
					<b-form-input v-model="car.license_plate" id="v-license-plate" disabled placeholder="Patente" />
				</b-form-group>
			</b-col>

			<!-- Transmition -->
			<b-col cols="6">
					<b-form-group label="Transmision" label-for="v-transmition">
						<v-select
							v-model="car.transmition"
							id="v-transmition"
							label="transmition"
							:options="options.transmition"
						/>
					</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- make -->
			<b-col cols="6">
				<b-form-group label="Marca" label-for="v-make">
					<b-form-input v-model="car.make" id="v-make" disabled placeholder="Marca" />
				</b-form-group>
			</b-col>

			<!-- Seats -->
			<b-col cols="6">
					<b-form-group label="Asientos" label-for="v-n-seats">
						<v-select
							v-model="car.n_seats"
							id="v-n-seats"
							label="n_seats"
							:options="options.n_seats"
						/>
					</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- Model -->
			<b-col cols="6">
				<b-form-group label="Modelo" label-for="v-model">
					<b-form-input v-model="car.model" id="v-model" disabled placeholder="Modelo" />
				</b-form-group>
			</b-col>

			<!-- Doors -->
			<b-col cols="6">
					<b-form-group label="Puertas" label-for="v-n-doors">
						<v-select
							v-model="car.n_doors"
							id="v-n-doors"
							label="n_doors"
							:options="options.n_doors"
						/>
					</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- Trim -->
			<b-col cols="6">
				<b-form-group label="Version" label-for="v-trim">
					<b-form-input v-model="car.trim" id="v-trim" disabled placeholder="Version" />
				</b-form-group>
			</b-col>

			<!-- Color -->
			<b-col cols="6">
				<b-form-group label="Color" label-for="v-color">
					<v-select
						v-model="car.color"
						id="v-color"
						label="color"
						:options="options.color"
					/>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- year -->
			<b-col cols="6">
				<b-form-group label="Año" label-for="v-year">
					<b-form-input v-model="car.year" id="v-year" type="number" disabled placeholder="Año" />
				</b-form-group>
			</b-col>

			<!-- Fuel -->
			<b-col cols="6">
				<b-form-group label="Combustible" label-for="v-fuel">
					<v-select
						v-model="car.fuel"
						id="v-fuel"
						label="fuel"
						:options="options.fuel"
					/>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- mileage -->
			<b-col cols="6">
				<b-form-group label="Kilometraje" label-for="v-mileage">
					<b-form-input v-model="car.mileage" id="v-mileage" type="number" min="0" disabled placeholder="Kilometraje" />
				</b-form-group>
			</b-col>
			<!-- price -->
			<b-col cols="6">
				<b-form-group label="Precio" label-for="v-price">
					<b-form-input v-model="car.price" id="v-price" type="number" min="0" placeholder="Precio" />
				</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<!-- comment -->
			<b-col cols="6">
				<b-form-group label="Comentario" label-for="v-comment">
					<b-form-textarea 
						id="v-comment" 
						v-model="car.comment" 
						disabled
						placeholder="Ingrese algun comentario" 
						rows="3">
					</b-form-textarea>
				</b-form-group>
			</b-col>

			<!-- Drive Type -->
			<b-col cols="6">
					<b-form-group label="Tracción" label-for="v-drive-type">
						<v-select
							v-model="car.drive_type"
							id="v-drive-type"
							label="drive_type"
							:options="options.drive_type"
						/>
					</b-form-group>
			</b-col>
		</b-row>
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
			<!-- submit and cancel -->
			<b-col mb-5 cols="12">
				<b-button
					v-ripple.400="'rgba(255, 255, 255, 0.15)'"
					type="submit"
					variant="primary"
					class="mr-1"
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

import { useRouter } from '@core/utils/utils'

import { computed, ref } from '@vue/composition-api'

import vSelect from 'vue-select'

import store from '@/store'

export default {
	components: {
		BRow,
		BCol,
		BForm,
		BButton,
		BFormGroup,
		BFormTextarea,
		BFormInput,
		BFormCheckbox,
		BFormDatepicker,
		BFormInvalidFeedback,
		vSelect,
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
				.dispatch(`${definition}/createCar`, car.value)
				.then((response) => {
					router.push({ name: definition })
				})
				.catch((error) => {
					console.log(error)
				})
		}

		// const hasNameAndTitle = computed(() => store.state.car.hasTitle && store.state.car.hasName)
		// const dateState = computed(() => !!car.value.date)
		// const contentState = computed(() => !!car.value.content && car.value.content.length > 9)
		// const submitButtonState = computed(() => (!dateState.value || !contentState.value) || !hasNameAndTitle.value)

		return {
			car,
			onSubmit,
			options,
			//dateState,
			//contentState,
			//submitButtonState,
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
