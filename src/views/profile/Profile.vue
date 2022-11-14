<template>
  <div>
    <b-tabs
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0"
      pills
      nav-wrapper-class="col-md-3 col-12"
      nav-class="nav-left"
    >
  
      <!-- general tab -->
      <b-tab active>
  
        <!-- title -->
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">General</span>
        </template>
  
        <profile-general
          v-if="options.fullName"
          :general-data="options"
        />
      </b-tab>
      <!--/ general tab -->
    </b-tabs>
  </div>
</template>

<script>
import { BCard, BTabs, BTab } from 'bootstrap-vue'
import ProfileGeneral from './ProfileGeneral.vue'
import axiosIns from '@axios'

export default {
  components: {
    BCard,
    BTabs,
    BTab,
    ProfileGeneral,
  },
  data() {
    return {
      options: {},
    }
  },
  beforeCreate() {
    axiosIns
      .post('/auth/me')
        .then(res => { 
          this.options = res.data 
        })
  },
}
</script>
