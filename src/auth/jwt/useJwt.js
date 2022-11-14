import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'

const { jwt } = useJwt(axios, {
    // Endpoints
    loginEndpoint: '/auth/login',
    registerEndpoint: '',
    refreshEndpoint: '/auth/refresh',
    logoutEndpoint: '/auth/logout',

    // This will be prefixed in authorization header with token
    // e.g. Authorization: Bearer <token>
    tokenType: 'Bearer',

    // Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'access_token',
    storageRefreshTokenKeyName: 'refresh_token',
})
export default jwt
