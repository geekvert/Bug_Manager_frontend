import React, { Component } from 'react'
import { Table, Header, Button, Container } from 'semantic-ui-react'
import Loading from './Loading'
import axios from 'axios'

export default class Memberspage extends Component {
    handleDisable(e, data) {
		// ajax call to server to disable a user
		console.log(data.user)
		return axios({
			method: 'put',
			url: 'http://localhost:8000/backend/users/',
			data: {
				username: data.username,
				disabled_status: true,
			}
		})
		.then(res => console.log('success',res))
		.catch(err => console.log(err))
    }

    handleEnable(e, data) {
		// ajax call to server to enable a user
		console.log(data.user)
		return axios({
			method: 'put',
			url: 'http://localhost:8000/backend/users/',
			data: {
				username: data.username,
				disabled_status: false,
			}
		})
		.then(res => console.log('success',res))
		.catch(err => console.log(err))
    }

    render() {
		const {users} = this.props

		if (users.error) {
            return <h1 style={{marginTop: '5em'}}>Something went wrong in fetching users: {users.error.toString()} <br/> Are you an admin? :\</h1>
		}

        else if (users.loading || users.users.length===0) {
            return <Loading />
        }
		
		else {
			const usersList = users.users.map((user) => {
				const Btn = user.disabled_status ? 
				() => <Button user={user} widht={2} positive onClick={(e, d) => this.handleEnable(e, d)}>Enable</Button> : 
				<Button user={user} widht={2} negative onClick={(e, d) => this.handleDisable(e, d)}>Disable</Button>

				return (
					<Table.Row>
						<Table.Cell width={14}>{user.username}</Table.Cell>
						<Table.Cell>{Btn}</Table.Cell>
					</Table.Row>
				)
			})

			return (
				<>
				<Container style={{ marginTop: '7em' }}>
					<Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Members</Header>
					<Table>
						<Table.Body>
							{usersList}
						</Table.Body>
					</Table>
				</Container>
				</>
			)
		}
    }
}

/*
DISABLE ENABLE not working
*/
