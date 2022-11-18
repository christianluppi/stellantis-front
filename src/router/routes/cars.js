export default [
	{
		path: '/cars',
		name: 'cars',
		component: () => import('@/views/cars/LayoutBlank.vue'),
		meta: {
			pageTitle: 'Datos del Cliente',
			breadcrumb: [
				{
					text: 'Datos del Cliente',
					active: true,
				},
			],
		},
	},
	{
		path: '/cars/:id/edit',
		name: 'car-id-edit',
		component: () => import('@/views/cars/Edit.vue'),
		meta: {
			pageTitle: 'Datos del Cliente',
			breadcrumb: [
				{
					text: 'Datos del Cliente',
					active: true,
				},
				{
					text: 'Editar',
					active: true,
				},
			],
		},
	},
	{
		path: '/new-car',
		name: 'car-create',
		component: () => import('@/views/cars/New.vue'),
		meta: {
			pageTitle: 'Datos del Cliente',
			breadcrumb: [
				{
					text: 'Datos del Cliente',
					active: true,
				},
				{
					text: 'Crear',
					active: true,
				},
			],
		},
	},
]
