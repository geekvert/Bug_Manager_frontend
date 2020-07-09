import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchThisUser } from '../redux/ActionCreator'

const mapStateToProps = (state) => ({
	thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
	fetchThisUser: (acs_token) => {dispatch(fetchThisUser(acs_token))}
})

class AfterLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
			loading: false,
			acs_token: null,
			error: null,
        }
    }
    
    componentDidMount() {
        const {location} = this.props
        console.log(this.props)
        const {code, state} = queryString.parse(location.search)
        const link = 'http://localhost:8000/backend/oauth/redirect/'

        if (state!=='pypy') {
            window.location = 'http://localhost:3000/' // redirect to errorpage
        }

        if (!this.state.loading) {
            this.setState({loading: true})
            axios
                .get(link, {params: {code: code}})
                .then(res => {
					console.log(res)
					this.props.fetchThisUser(res.data.access_token)
					// storing acs_token in LS
					window.localStorage.setItem('bug_manager_acs_token', res.data.access_token)
					this.setState({loading: false, error: null, acs_token: res.data.access_token})
					// then redirect to home
					window.location = 'http://localhost:3000/home'
                })
                .catch(err => {
                    this.setState({loading: false, error: err})
                })
        }
    }

    render() {
		const {acs_token, loading, error} = this.state
        if (loading) {
            return <div><Loader active /></div>
        }
		else {
			return <h1 style={{marginTop: '5em'}}>Something went wrong</h1>
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin)

/*
Take auth code and request maaro backend pe
if (acs_token received) store it in LS & userInfo in state and redirect to the homepage
else redirect to error component along with error
*/