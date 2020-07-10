import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThisUser } from '../redux/ActionCreator'
import { Header, Button, Grid, Image } from 'semantic-ui-react'
import Loading from './Loading'

const mapStateToProps = (state) => ({
	thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
	fetchThisUser: (acs_token) => {dispatch(fetchThisUser(acs_token))}
})

class Welcome extends Component {
    // checking if access token exists in LS
    // if yes then fetch thisUser details and redirect to homepage
    // else render a welcome screen

    render() {
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
            alert('Some error occured in Login, please try again.')
			return (
                <div style={{paddingTop: '40vh'}}>
                    <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Column>
                            <Header as="h2" textAlign="center">
                                <Image src={require('../assets/channeli.svg')} alt='logo' size='tiny' />
                                Bug Manager
                            </Header>
                            <Button className='loginBtn' primary size='big' centered circular as='a' href={link}>
                                Login using Omniport
                            </Button>
                        </Grid.Column>
                    </Grid>
                </div>
            )
        }

        else {
            return (
                <div style={{paddingTop: '40vh'}}>
                    <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Column>
                            <Header as="h2" textAlign="center">
                                <Image src={require('../assets/channeli.svg')} alt='logo' size='tiny' />
                                Bug Manager
                            </Header>
                            <Button className='loginBtn' primary size='big' centered circular as='a' href={link}>
                                Login using Omniport
                            </Button>
                        </Grid.Column>
                    </Grid>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
