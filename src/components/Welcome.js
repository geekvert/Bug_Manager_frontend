import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThisUser } from '../redux/ActionCreator'
import { Header, Button, Image } from 'semantic-ui-react'
import Loading from './Loading'
import axios from 'axios'

const mapStateToProps = (state) => ({
	thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
	fetchThisUser: (acs_token) => {dispatch(fetchThisUser(acs_token))}
})

class Welcome extends Component {
    // check if access token exists in LS
    // if yes then fetch thisUser details and redirect to homepage
    // else render a welcome screen

    render() {
		console.log(this.props)
        const {thisUser} = this.props
        const client_id = 'er1eJX5UyeQgVLdDLICTjuUJKHogSrLRKfKLLIN9'
        const redirect_url = 'http://localhost:3000/afterLogin'
        const link = `https://internet.channeli.in/oauth/authorise?client_id=${client_id}&redirect_url=${redirect_url}&state=pypy`
        
		if (thisUser.loading) {
            return <Loading />
        }

        else if (thisUser.thisUser) {
            window.location = 'http://localhost:3000/home'
        }

        else if (thisUser.error) {
			return (
                <div style={{marginTop: '5em'}}>
                    <h1>Something went wrong, please try again :(</h1>
                    <Button primary size='huge' centered circular as='a' href={link}>
                        Login using Omniport
                    </Button>
                </div>
            )
        }

        else {
            return (
                <div style={{marginTop: '5em'}}>
                    <Button primary size='huge' centered circular as='a' href={link}>
                        Login using Omniport
                    </Button>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

/*
yaha se omni par request maari
ab omni above waale url par redirect krega
waha i'll take auth_code & state and then backend par fir request maarunga
*/
