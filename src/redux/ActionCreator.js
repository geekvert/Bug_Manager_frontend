import * as ActionTypes from './ActionTypes'
import axios from 'axios'
import { acs_token } from '../components/Main'

// projects
export const fetchProjects = () => (dispatch) => {
    dispatch(projectsLoading())

    return axios
        .get('http://localhost:8000/backend/projects/', {acs_token: acs_token})
        .then(res => {dispatch(addProjects(res.data))})
        .catch(err => {dispatch(projectsFailed(err))})
}

export const addProjects = (projects) => ({
    type: ActionTypes.ADD_PROJECTS,
    payload: projects
})

export const projectsLoading = () => ({
    type: ActionTypes.PROJECTS_LOADING
})

export const projectsFailed = (error) => ({
    type: ActionTypes.PROJECTS_FAILED,
    payload: error
})

// users
export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading())

    return axios
        .get('http://localhost:8000/backend/users/', {acs_token: acs_token})
        .then(res => {dispatch(addAllUsers(res))})
        .catch(err => {dispatch(usersFailed(err))})
}

export const addAllUsers = (users) => ({
    type: ActionTypes.ADD_ALL_USERS,
    payload: users
})

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
})

export const usersFailed = (error) => ({
    type: ActionTypes.USERS_FAILED,
    payload: error
})

// bugs
export const fetchBugs = (project_name) => (dispatch) => {
    dispatch(bugsLoading())

    return axios
        .get('http://localhost:8000/backend/project_bug/', {params: {project_name: project_name, acs_token: acs_token}})
        .then(res => {dispatch(addBugs(res.data))})
        .catch(err => {dispatch(bugsFailed(err))})
}

export const addBugs = (bugs) => ({
    type: ActionTypes.ADD_BUGS,
    payload: bugs
})

export const bugsLoading = () => ({
    type: ActionTypes.BUGS_LOADING
})

export const bugsFailed = (error) => ({
    type: ActionTypes.BUGS_FAILED,
    payload: error
})

// myBugs
export const fetchMyBugs = (enrollment_no) => (dispatch) => {
    dispatch(myBugsLoading())

    return axios
        .get('http://localhost:8000/backend/my_page/', {params: {enrollment_no: enrollment_no, acs_token: acs_token}})
        .then(res => {dispatch(addMyBugs(res.data))})
        .catch(err => {dispatch(myBugsFailed(err))})
}

export const addMyBugs = (myBugs) => ({
    type: ActionTypes.ADD_MY_BUGS,
    payload: myBugs
})

export const myBugsLoading = () => ({
    type: ActionTypes.MY_BUGS_LOADING
})

export const myBugsFailed = (error) => ({
    type: ActionTypes.MY_BUGS_FAILED,
    payload: error
})

// fetching thisUser
export const fetchThisUser = (acs_token) => (dispatch) => {
    dispatch(thisUserLoading())

    return axios
        .get('http://localhost:8000/backend/afterLogin/', {params: {acs_token: acs_token}})
        .then(res => {dispatch(addThisUser(res.data))})
        .catch(err => {dispatch(thisUserFailed(err))})
}

export const addThisUser = (acs_token) => ({
    type: ActionTypes.ADD_THIS_USER,
    payload: acs_token,
})

export const thisUserLoading = () => ({
    type: ActionTypes.THIS_USER_LOADING,
})

export const thisUserFailed = (error) => ({
    type: ActionTypes.THIS_USER_FAILED,
    payload: error
})
