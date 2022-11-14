import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn } from '@/auth/utils'
import { canNavigate } from '@/libs/acl/routeProtection'

import cars from './routes/cars'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
	routes: [
		...cars,
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/Home.vue'),
			meta: {
				pageTitle: 'Home',
				resource: 'Auth',
				breadcrumb: [
				  {
					text: 'Home',
					active: true,
				  },
				],
			},
		},
		{
			path: '/login',
			name: 'auth-login',
			component: () => import('@/views/Login.vue'),
			meta: {
				layout: 'full',
				resource: 'Auth',
				redirectIfLoggedIn: true,
			},
		},
		{
			path: '/error-404',
			name: 'error-404',
			component: () => import('@/views/error/Error404.vue'),
			meta: {
				layout: 'full',
				resource: 'Auth',
			},
		},
		{
			path: '/not-authorized',
			name: 'misc-not-authorized',
			component: () => import('@/views/error/NotAuthorized.vue'),
			meta: {
			  layout: 'full',
			  resource: 'Auth',
			},
		},
		{
			path: '/forgot-password',
			name: 'auth-forgot-password-v2',
			component: () => import('@/views/auth/ForgotPassword-v2.vue'),
			meta: {
			  layout: 'full',
			  resource: 'Auth',
			},
		},
		{
			path: '/reset-password',
			name: 'auth-reset-password-v2',
			component: () => import('@/views/auth/ResetPassword-v2.vue'),
			meta: {
			  layout: 'full',
			  resource: 'Auth',
			},
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('@/views/profile/Profile.vue'),
			meta: {
			  pageTitle: 'Profile',
			  breadcrumb: [
				{
				  text: 'Profile',
				  active: true,
				},
			  ],
			},
		},
		{
			path: '*',
			redirect: 'error-404',
		},
	],
})

router.beforeEach((to, _, next) => {
	const isLoggedIn = isUserLoggedIn()
	if (!canNavigate(to)) {
	  // Redirect to login if not logged in
	  
	  if (!isLoggedIn) {
		return next({ name: 'auth-login' })
	  }
	  // If logged in => not authorized
	  return next({ name: 'misc-not-authorized' })
	}
  
	if(to.path === '/forgot-password'
	  || to.path === '/reset-password'
	  || to.path === '/not-authorized'
	){
	  if(!isLoggedIn){
		return next()
	  }
	}
  
	if(to.path !== '/login'){
	  if(!isLoggedIn){
		return next({ name: 'misc-not-authorized'} )
	  }
	}else{
	  if(isLoggedIn){
		return next({ name: "home" })
	  }
	}
	return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
	// Remove initial loading
	const appLoading = document.getElementById('loading-bg')
	if (appLoading) {
		appLoading.style.display = 'none'
	}
})

export default router
