import React, { Component } from 'react'
import { Image, Menu, Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Logout from './logout'

export default class AppHeader extends Component {
	render() {
		const myPageBtn = null
		if (this.props.thisUser!==null) {
			myPageBtn =
				<Menu.Item>
					<Button size='tiny' circular content={this.props.thisUser.name} as={Link} to='/mypage'/>
				</Menu.Item>
		}
		return (
			<Menu fixed='top'>
			  <Container>
				<Menu.Item as={Link} header to='/'>
				  <Image size='mini' src={require('../assets/channeli.svg')} style={{ marginRight: '1.5em' }} />
				  Bug Manager
				</Menu.Item>
				<Menu.Menu position='right'>
				  {myPageBtn}
				  <Logout/>
				</Menu.Menu>
			  </Container>
			</Menu>
		)
	}
}
