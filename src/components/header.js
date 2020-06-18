import React, { Component } from 'react'
import { Segment, Image, Divider, Header, Button, Search, Menu, Container, Dropdown, Grid, List, Item, Icon, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class AppHeader extends Component {
    render() {
        return (
            <Menu fixed='top'>
              <Container>
                <Menu.Item as={Link} header to='/'>
                  <Image size='mini' src={require('../assets/channeli.svg')} style={{ marginRight: '1.5em' }} />
                  Bug Manager
                </Menu.Item>
                <Menu.Item position='right'>
                    Rahul
                </Menu.Item>
              </Container>
            </Menu>
        )
    }
}
