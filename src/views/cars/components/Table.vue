<template>
	<div>
		<!-- {{ Cars }} -->
		<b-card>
			<div class="m-2">
				<b-row>
					<!-- Per Page -->
					<!-- <b-col
						cols="12"
						md="6"
						class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
					>
						<b-button 
							variant="primary" 
							:to="{ name: 'car-create' }"
						>
							<feather-icon
								icon="PlusIcon"
								size="16"
								class="align-middle text-body"
							/>  
								Nuevo
						</b-button>
					</b-col> -->

					<!-- Search -->
					<b-col cols="12" md="6">
						<div class="d-flex align-items-center justify-content-end">
							<b-form-input
								v-model="searchQuery"
								class="d-inline-block mr-1"
								placeholder="Buscar..."
								@input="getCars"
							/>
						</div>
					</b-col>
				</b-row>
			</div>
			<b-table
				v-if="cars"
				responsive
				:busy="loading"
				:items="cars.data"
				:fields="camposTH"
			>
				<template #table-busy>
					<div class="d-flex justify-content-center mb-3">
						<b-spinner
							style="width: 3rem; height: 3rem; color: #9187f4"
							label="Loading..."
						/>
					</div>
				</template>

				<!-- Column: Status -->
				<template #cell(status)="data">
					<b-badge v-if="data.item.status == true" variant="success">
						Activo
					</b-badge>
					<b-badge v-else variant="secondary">Inactivo </b-badge>
				</template>

				<template #cell(backgroundImage)="data">
					<img
						:src="data.item.backgroundImage"
						width="200"
						class="
							img-fluid
							${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}
						"
						alt=""
					/>
				</template>

				<!-- Column: Actions -->
				<template #cell(accion)="data">
					<b-dropdown variant="link" no-caret>
						<template #button-content>
							<feather-icon
								icon="MoreVerticalIcon"
								size="16"
								class="align-middle text-body"
							/>
						</template>
						<b-dropdown-item
							:to="{ name: 'car-id-edit', params: { id: data.item.id } }"
						>
							<feather-icon icon="EditIcon" />
							<span class="align-middle ml-50">Editar</span>
						</b-dropdown-item>

						<b-dropdown-item
							v-if="!data.item.status"
							@click="activateCar(data.item.id)"
						>
							<feather-icon icon="CheckIcon" />
							<span class="align-middle ml-50">Activar</span>
						</b-dropdown-item>
						<b-dropdown-item
							v-else
							@click="deactivateCar(data.item.id)"
						>
							<feather-icon icon="XIcon" />
							<span class="align-middle ml-50">Desactivar</span>
						</b-dropdown-item>
					</b-dropdown>
				</template>
			</b-table>
			<b-row>
				<b-col
					cols="12"
					md="6"
					class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
				>
					<label class="ml-1">Entries</label>
					<v-select
						v-model="getPaginate"
						:options="perPageOptions"
						:clearable="false"
						class="per-page-selector d-inline-block ml-50 mr-1"
						@input="getCars"
						:appendToBody="true"
      					:calculate-position="withPopper"
					/>
				</b-col>
				<b-col 
					cols="12" 
					md="6" 
					class="d-flex align-items-center justify-content-end"
				>
					<b-pagination
						class="pr-2 pt-1"
						align="right"
						v-if="cars"
						v-model="getPage"
						:total-rows="cars.total"
						:per-page="cars.per_page"
					/>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
import {
	BRow,
	BCol,
	BTable,
	BButton,
	BSpinner,
	BCard,
	BFormInput,
	BPagination,
	BDropdown,
	BDropdownItem,
	BBadge,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

import { ref, watch, computed } from '@vue/composition-api'

import store from '@/store'

import withPopper from '@/libs/vue-select'

export default {
	components: {
		vSelect,
		BRow,
		BCol,
		BTable,
		BButton,
		BSpinner,
		BCard,
		BFormInput,
		BPagination,
		BDropdown,
		BDropdownItem,
		BBadge,
	},
	setup() {
		const searchQuery = ref('')
		const perPageOptions = [5, 10, 25, 50, 100]
		const getPage = ref(1)
		const getPaginate = ref(10)

		const baseUrl = process.env.VUE_APP_API_RONCO

		const definition = 'cars'

		const loading = ref(false)

		const cars = computed(() => store.state.cars.cars)

		const camposTH = ref([
			{ key: 'nombre', label: 'Nombre' },	
			{ key: 'apellido', label: 'Apellido' },
			{ key: 'dni', label: 'Dni' },])

		const getCars = () => {
			loading.value = true
			store
				.dispatch(`${definition}/getCars`, {
					search: searchQuery.value,
					getPaginate: getPaginate.value,
					getPage: getPage.value,
				})
				.then((response) => {
					loading.value = false
				})
				.catch((error) => {
					console.log(error)
					loading.value = false
				})
		}

		const activateCar = (id) => {
			loading.value = true
			store
				.dispatch(`${definition}/activateCar`, { id })
				.then((response) => {
					loading.value = false
					getCars()
				})
				.catch((error) => {
					console.log(error)
					loading.value = false
				})
		}

		const deactivateCar = (id) => {
			loading.value = true
			store
				.dispatch(`${definition}/deactivateCar`, { id })
				.then((response) => {
					loading.value = false
					getCars()
				})
				.catch((error) => {
					console.log(error)
					loading.value = false
				})
		}

		getCars()

		watch([getPage], () => {
			getCars()
		})

		return {
			baseUrl,
			camposTH,
			perPageOptions,
			searchQuery,
			getPage,
			getPaginate,
			loading,
			cars,
			withPopper,
			getCars,
			activateCar,
			deactivateCar
		}
	},
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.card-body {
	padding: 0px !important;
}
.per-page-selector {
	width: 90px;
}

.invoice-filter-select {
	min-width: 190px;

	::v-deep .vs__selected-options {
		flex-wrap: nowrap;
	}

	::v-deep .vs__selected {
		width: 100px;
	}
}
</style>
