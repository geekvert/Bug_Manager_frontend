import React, { Component } from 'react'
import { Table, Segment, Image, Divider, Header, Button, Search, Menu, Container, Dropdown, Grid, List, Item, Icon, Input, Form, TextArea } from 'semantic-ui-react'

export default class Memberspage extends Component {
    handleDisable(e, data) {
        console.log(data)
    }

    handleEnable(e, data) {
        console.log(data)
    }

    render() {
        return (
            <>
            <Container style={{ marginTop: '7em' }}>
                <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Members</Header>
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={14}>Rahul</Table.Cell>
                            <Table.Cell>
                                <Button widht={2} negative onClick={(e, d) => this.handleDisable(e, 'Rahul')}>Disable</Button>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell width={14}>Aditya</Table.Cell>
                            <Table.Cell>
                                <Button widht={2} positive onClick={(e, d) => this.handleEnable(e, 'something')}>Enable</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
            </>
        )
    }
}
