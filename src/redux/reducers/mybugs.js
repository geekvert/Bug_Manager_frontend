import * as ActionTypes from '../ActionTypes'


// mybugs reducer
export const MyBugs = (state = { myBugs: [], loading: false, error: null }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MY_BUGS:
            return {...state, myBugs: action.payload, loading: false, error: null}
        case ActionTypes.MY_BUGS_LOADING:
            return {...state, loading: true, error: null}
        case ActionTypes.MY_BUGS_FAILED:
            return {...state, error: action.payload, loading: false, myBugs: []}
        default:
            return state
    }
}
