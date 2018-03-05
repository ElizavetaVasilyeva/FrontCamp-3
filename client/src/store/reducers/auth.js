import { USERS } from '../actions/constants'

export const auth = (state = {}, { type, payload }) => {
    switch (type) {
        case USERS.LOGIN: {
            return {
                isLoggedIn: true,
                username: payload.username
            }
        }
        case USERS.REGISTER: {
            return {
                isLoggedIn: true,
                username: payload
            }
        }
        case USERS.LOGOUT:
            return {
                isLoggedIn: false,
                username: ''
            }
        default:
            return state
    }
}
