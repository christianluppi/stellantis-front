<template>
	<input type="file" accept="image/*" @change="uploadImage" />
</template>

<script>
import axios from '@axios'

export default {
	methods: {
		async uploadImage(event) {
			const URL = 'http://blog-api.test/api/imagenes'
			const data = new FormData()
			data.append('name', 'my-picture')
			data.append('file', event.target.files[0])
			const config = {
				header: {
					'Content-Type': 'image/png',
				},
			}

			await axios.post(URL, data, config)
		},
	},
}
</script>
