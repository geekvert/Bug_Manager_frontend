import React, { Component } from 'react'
import { Button, Grid, Menu } from 'semantic-ui-react'

export default class Logout extends Component {
    logoutHandler() {
        console.log('removed?')
        window.localStorage.removeItem('bug_manager_acs_token')
        window.location = 'http:localhost:3000/'
    }
    render() {
        if (window.localStorage.getItem('bug_manager_acs_token')===null) {
            return null
        }

        return (
            <Menu.Item>
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column>
                        <Button className='logoutBtn' primary size='medium' centered circular onClick={this.logoutHandler}>
                            Logout
                        </Button>
                    </Grid.Column>
                </Grid>
            </Menu.Item>
        )
    }
}
