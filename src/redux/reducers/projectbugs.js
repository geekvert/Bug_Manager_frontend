import * as ActionTypes from '../ActionTypes'

// projectBug reducer
export const ProjectBugs = (state = { bugs: [], loading: false, error: null }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_BUGS:
            return {...state, bugs: action.payload, loading: false, error: null}
        case ActionTypes.BUGS_LOADING:
            return {...state, loading: true, error: null}
        case ActionTypes.BUGS_FAILED:
            return {...state, error: action.payload, loading: false, bugs: []}
        default:
            return state
    }
}
