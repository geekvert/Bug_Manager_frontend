import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Projects } from './reducers/projects'
import { Users } from './reducers/users'
import { ProjectBugs } from './reducers/projectbugs'
import { MyBugs } from './reducers/mybugs'
import { ThisUser } from './reducers/thisUser'

import thunk from 'redux-thunk'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            projects: Projects,
            users: Users,
            bugs: ProjectBugs,
            myBugs: MyBugs,
            thisUser: ThisUser,
        }),
        applyMiddleware(thunk)
    )
    return store
}

// thunk, a middleware that allows us to make asynchronous actions in Redux[]
// combine reducer({ name_of_var_in_state: reducer_for_that_var })