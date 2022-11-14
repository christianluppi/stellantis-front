import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import cars from './modules/cars'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		cars,
		appConfig,
		verticalMenu,
	},
	actions: {

	},

	strict: process.env.DEV,
})

