<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userData.fullName || userData.username || 'John Doe' }}
            </p>
            <span class="user-status">{{ userData.role }}</span>
          </div>
          <b-avatar
            size="40"
            :src="userData.avatar"
            variant="light-primary"
            badge
            class="badge-minimal"
            badge-variant="success"
          >
            <feather-icon
              v-if="!userData.fullName"
              icon="UserIcon"
              size="22"
            />
          </b-avatar>
        </template>

        <b-dropdown-item 
          link-class="d-flex align-items-center"
          :to="{ name: 'profile' }"
        >
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item 
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'
import { initialAbility } from '@/libs/acl/config'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  methods: {
    logout() {
      useJwt
        .logout()
          .then(response => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Good Bye ${this.userData ? this.userData.fullName : 'John Doe'}`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `${response.data ? response.data.message : 'Logout'}`,
              },
            })
            // Remove userData from localStorage
            // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
            localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
            // localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

            // Remove userData from localStorage
            localStorage.removeItem('userData')

            // Reset ability
            // this.$ability.update(initialAbility)

            // Redirect to login page
            this.$router.push({ name: 'auth-login' })
          })
    }
  }
}
</script>
