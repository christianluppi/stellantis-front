<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          {{$t('titles.'+'References Generator')}}
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            :src="imgUrl"
            fluid
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Reset password-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            {{$t('titles.'+'Reset password')}}
          </b-card-title>
          <b-card-text class="mb-2">
            {{$t('subtitles.'+'Your new password must be different from previously used passwords')}}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-reset-password-form mt-2"
              method="POST"
              @submit.prevent="validationForm"
            >

              <!-- password -->
              <b-form-group>
                <label for="reset-password-new">{{$t('titles.reset.'+'new password')}}</label>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required|password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="reset-password-new"
                      v-model="password"
                      :type="password1FieldType"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      name="reset-password-new"
                      placeholder="????????????????????????"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password1ToggleIcon"
                        @click="togglePassword1Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ $t('errors.'+errors[0]) }}</small>
                </validation-provider>
              </b-form-group>

              <!-- confirm password -->
              <b-form-group>
                <label for="reset-password-confirm">{{$t('titles.reset.'+'confirm password')}}</label>
                <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  rules="required|confirmed:Password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="reset-password-confirm"
                      v-model="cPassword"
                      :type="password2FieldType"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false:null"
                      name="reset-password-confirm"
                      placeholder="????????????????????????"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password2ToggleIcon"
                        @click="togglePassword2Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ $t('errors.'+errors[0]) }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
              <b-button
                block
                type="submit"
                variant="primary"
              >
                {{$t('buttons.'+'newPassword')}}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{name:'auth-login-v2'}">
              <feather-icon icon="ChevronLeftIcon" /> {{$t('buttons.'+'backLogin')}}
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Reset password-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BCardTitle, BCardText, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BLink, BFormInput, BButton, BImg,
} from 'bootstrap-vue'
import { required } from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BImg,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
      cPassword: '',
      password: '',
      sideImg: require('@/assets/images/pages/reset-password-v2.svg'),
      // validation
      required,

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/reset-password-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          store.
              dispatch('auth/change', {
                token: this.$route.query.token,
                newPassword: this.password
              })
                .then(response => {
                  this.userEmail = null
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Contrase??a cambiada!',
                      icon: 'MailIcon',
                      variant: 'success',
                    },
                  })
                  this.$router.push({ name: 'auth-login' })
                })
                .catch(error => {
                  /* this.$refs.loginForm.setErrors(error.response.data.error) */
                  console.log(error.response.data.error)
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: error.response.data.error || 'Error!',
                      icon: 'XIcon',
                      variant: 'error',
                      text: error.response.data.message || `Error`,
                    },
                  })
                })
          
        }
      })
    },

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
