import * as ActionTypes from '../ActionTypes'

// users reducer
export const Users = (state = { users: [], loading: false, error: null }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ALL_USERS:
            return {...state, users: action.payload.data, loading: false, error: null}
        case ActionTypes.USERS_LOADING:
            return {...state, loading: true, error: null}
        case ActionTypes.USERS_FAILED:
            return {...state, error: action.payload, loading: false, users: []}
        default:
            return state
    }
}
