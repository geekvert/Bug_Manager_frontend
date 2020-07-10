import React, { Component } from 'react'
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
        const {code, state} = queryString.parse(location.search)
        const link = 'http://localhost:8000/backend/oauth/redirect/'

        if (state!=='pypy') {
            this.setState({loading: false})
            window.location = 'http://localhost:3000/' // redirect to errorpage
        }

        if (!this.state.loading) {
            this.setState({loading: true})
            axios
                .get(link, {params: {code: code}})
                .then(res => {
                    console.log('RESRESR'+res)
					this.props.fetchThisUser(res.data.access_token)
					// storing acs_token in LS
					window.localStorage.setItem('bug_manager_acs_token', res.data.access_token)
					this.setState({loading: false, error: null, acs_token: res.data.access_token})
					// then redirect to home
					window.location = 'http://localhost:3000/'
                })
                .catch(err => {
                    this.setState({loading: false, error: err})
                })
        }
    }
    render() {
		const { loading } = this.state
        if (loading) {
            return <div><Loader active /></div>
        }
		else {
			return <h1 style={{marginTop: '10vh'}}>Something went wrong</h1>
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin)
