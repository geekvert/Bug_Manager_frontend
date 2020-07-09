import * as ActionTypes from '../ActionTypes'

// thisUser reducer
export const ThisUser = (state = { thisUser: null, loading: false, error: null }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_THIS_USER:
            return {...state, thisUser: action.payload.thisUser, loading: false, error: null}
        case ActionTypes.THIS_USER_LOADING:
            return {...state, loading: true, error: null}
        case ActionTypes.THIS_USER_FAILED:
            return {...state, loading:false, error: action.payload, thisUser: []}
        default:
            return state
    }
}
