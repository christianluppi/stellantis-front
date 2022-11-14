import axiosIns from '@axios'
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		entity: 'cars',
		cars: [],
		car: {},
		hasTitle: false,
		hasName: false,
		options:{
			fuel: [
				'inspection.field.option.compressedNaturalGas',
				'inspection.field.option.diesel',
				'inspection.field.option.dieselElectric',
				'inspection.field.option.electric',
				'inspection.field.option.liquifiedPetroleumGas',
				'inspection.field.option.petrol',
				'inspection.field.option.petrolCompressedNaturalGas',
				'inspection.field.option.petrolElectric',
				'inspection.field.option.petrolLiquifiedPetroleumGas',
			],
			transmition: [
				'inspection.field.option.automatic',
				'inspection.field.option.semiautomatic',
				'inspection.field.option.triptonic',
				'inspection.field.option.manual',

			],
			n_seats: [
				'inspection.field.option.2',
				'inspection.field.option.4',
				'inspection.field.option.5',
				'inspection.field.option.6',
				'inspection.field.option.7',
				'inspection.field.option.8',
				'inspection.field.option.9',
				'inspection.field.option.10',
				'inspection.field.option.12',
				'inspection.field.option.15',
				'inspection.field.option.16',
				'inspection.field.option.18',
				'inspection.field.option.30',

			],
			n_doors: [
				'inspection.field.option.2Doors',
				'inspection.field.option.2DoorsTrunk',
				'inspection.field.option.3Doors',
				'inspection.field.option.3DoorsTrunk',
				'inspection.field.option.4Doors',
				'inspection.field.option.4DoorsTrunk',
				'inspection.field.option.5PlusDoors',
				'inspection.field.option.5PlusDoorsTrunk',
			],
			color: [
				'inspection.field.option.beige',
				'inspection.field.option.yellow',
				'inspection.field.option.blue',
				'inspection.field.option.brown',
				'inspection.field.option.burgandy',
				'inspection.field.option.gold',
				'inspection.field.option.green',
				'inspection.field.option.grey',
				'inspection.field.option.ivory',
				'inspection.field.option.black',
				'inspection.field.option.pink',
				'inspection.field.option.purple',
				'inspection.field.option.red',
				'inspection.field.option.silver',
				'inspection.field.option.tan',
				'inspection.field.option.teal',
				'inspection.field.option.white',
				'inspection.field.option.orange',
			],
			drive_type:[ 	
				'inspection.field.option.4WheelDrive',
				'inspection.field.option.allWheelDrive',
				'inspection.field.option.frontWheelDrive',
				'inspection.field.option.rearWheelDrive',
			]
		}
	},
	getters: {
		hasFile (state) {
			return !!state.selectedFileSrc
		}
	},
	mutations: {
		setHasTitle(state, payload) {
			state.hasTitle = payload
		},
		setHasName(state, payload) {
			state.hasName = payload
		},
		setCars(state, payload) {
			state.cars = payload
		},
		setCar(state, payload) {
			state.car = payload
		},
		setSelectedCategories(state, payload) {
			state.selectedCategories = payload
		},
		setSelectedLabels(state, payload) {
			state.selectedLabels = payload
		},
		setSelectedImage(state, payload) {
			state.selectedImage = payload
		},
		setSelectedFileSrc(state, payload) {
			state.selectedFileSrc = payload
		},
		clearCar(state) {
			state.car = { status: 1 }
		},
		clearSelectedImage(state) {
			state.selectedImage = {}
		},
		clearSelectedFileSrc(state) {
			state.selectedFileSrc = null
		},
		clearselectedCategories(state) {
			state.selectedCategories = null
		},
		clearselectedLabels(state) {
			state.selectedLabels = null
		},
	},
	actions: {
		clearCar({ commit }, payload) {
			return new Promise((resolve, reject) => {
				commit('clearCar')
				resolve()
			})
		},
		clearSelectedImage({ commit }, payload) {
			return new Promise((resolve, reject) => {
				commit('clearSelectedImage')
				resolve()
			})
		},
		clearSelectedFileSrc({ commit }, payload) {
			return new Promise((resolve, reject) => {
				commit('clearSelectedFileSrc')
				resolve()
			})
		},
		clearselectedCategories({ commit }, payload) {
			return new Promise((resolve, reject) => {
				commit('clearselectedCategories')
				resolve()
			})
		},
		clearselectedLabels({ commit }, payload) {
			return new Promise((resolve, reject) => {
				commit('clearselectedLabels')
				resolve()
			})
		},
		getCars({ ctx, state, commit }, payload) {
			return new Promise((resolve, reject) => {
				const userData = JSON.parse(localStorage.getItem('userData'))
				axiosIns
					.get(`${state.entity}/?search=${payload.search}&getPaginate=${payload.getPaginate}&getPage=${payload.getPage}&user_id=${userData.id}&country_id=${userData.country_id}&country_id=${userData.country_id}`, {
					})
					.then(response => {
						commit('setCars', response.data)
						resolve(response)
					})
					.catch(error => reject(error))
			})
		},
		getCar({ ctx, state, commit }, payload) {
			return new Promise((resolve, reject) => {
				axiosIns
					.get(`${state.entity}/${payload.id}`)
					.then(response => {
						commit('setCar', response.data)
						resolve(response)
					})
					.catch(error => reject(error))
			})
		},
		getAllCars({ ctx, state, commit }, payload) {
			return new Promise((resolve, reject) => {
				const userData = JSON.parse(localStorage.getItem('userData'))
				axiosIns
					.get(`${state.entity}/get_all?country_id=${userData.country_id}`)
					.then(response => {
						console.log('response', response.data);
						// commit('setCategories', response.data)
						resolve(response)
					})
					.catch(error => reject(error))
			})
		},
		createCar({ ctx, state }, payload) {
			return new Promise((resolve, reject) => {
				axiosIns
					.post(`${state.entity}/`, payload)
					.then((response) => resolve(response))
					.catch((error) => reject(error))
			})
		},
		editCar({ ctx, state }, payload) {
			return new Promise((resolve, reject) => {
				axiosIns
					.put(`${state.entity}/${payload.id}`, payload)
					.then((response) => resolve(response))
					.catch((error) => reject(error))
			})
		},
		deactivateCar({ ctx, state }, payload) {
			return new Promise((resolve, reject) => {
				axiosIns
					.patch(`${state.entity}/change_status/${payload.id}`, { status: 0 })
					.then((response) => resolve(response))
					.catch((error) => reject(error))
			})
		},
		activateCar({ ctx, state }, payload) {
			return new Promise((resolve, reject) => {
				axiosIns
					.patch(`${state.entity}/change_status/${payload.id}`, { status: 1 })
					.then((response) => resolve(response))
					.catch((error) => reject(error))
			})
		},
	},
}
