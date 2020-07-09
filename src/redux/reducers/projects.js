import * as ActionTypes from '../ActionTypes'

// project reducer
export const Projects = (state = { projects: [], loading: false, error: null }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROJECTS:
            return {...state, projects: action.payload, loading: false, error: null}
        case ActionTypes.PROJECTS_LOADING:
            return {...state, loading: true, error: null}
        case ActionTypes.PROJECTS_FAILED:
            return {...state, error: action.payload, loading: false, projects: []}
        default:
            return state
    }
}
