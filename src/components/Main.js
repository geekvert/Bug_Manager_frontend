import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import AppHeader from './header'
import Homepage from './Homepage'
import Projectpage from './Projectpage'
import Mypage from './Mypage'
import Memberspage from './Memberspage'
import Bugpage from './Bugpage'
import Welcome from './Welcome'
import AfterLogin from './afterLogin'
import { connect } from 'react-redux'
import { fetchProjects, fetchUsers, fetchThisUser } from '../redux/ActionCreator'

import TestComponent from './testing'
import { Loader } from 'semantic-ui-react'

const mapStateToProps = (state) => ({
	projects: state.projects,
    users: state.users,
    thisUser: state.thisUser,
})
const mapDispatchToProps = (dispatch) => ({
    fetchProjects: () => {dispatch(fetchProjects())},
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchThisUser: (acs_token) => {dispatch(fetchThisUser(acs_token))}
})

class Main extends Component {
    componentWillMount() {
        const acs_token = window.localStorage.getItem('bug_manager_acs_token')
		if (acs_token) {
			this.props.fetchThisUser(acs_token)
		}
    }

	componentDidMount() {
        this.props.fetchProjects()
		this.props.fetchUsers()
	}

    render() {
        const {users, projects, thisUser} = this.props
        
        if (thisUser.loading) {
            return <Loader active />
        }
        else if (!thisUser.thisUser) {
            if (window.localStorage.getItem('bug_manager_acs_token')) {
                return <Loader active />
            }
            return (
                <>
                <AppHeader thisUser={thisUser.thisUser} />
                <Switch>
                <Route exact path='/' component={() => <Welcome thisUser={thisUser} />} />
                <Route exact path='/afterLogin' component={({location}) => <AfterLogin location={location} />} />
                <Redirect to='/' />
                </Switch>
                </>
            )
        }

        return (
			<>
			<AppHeader thisUser={thisUser.thisUser} />
            <Switch>
            <Route exact path='/' component={() => <Welcome thisUser={thisUser} />} />
            <Route exact path='/home' component={() => <Homepage projects={projects} users={users} />} />
            <Route exact path='/project/:projectName' component={({match}) => <Projectpage users={users} projects={projects} match={match} />} />
            <Route exact path='/project/:projectName/:heading' component={({match}) => <Bugpage projects={projects} users={users} match={match} />} />
            <Route exact path='/mypage' component={Mypage} />
            <Route exact path='/members' component={() => <Memberspage users={users} />} />
            <Route exact path='/afterLogin' component={({location}) => <AfterLogin location={location} />} />
            <Route exact path='/test' component={TestComponent} />
            <Redirect to='/' />
            </Switch>
			</>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
