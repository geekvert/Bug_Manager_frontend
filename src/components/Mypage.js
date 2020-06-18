import React, { Component } from 'react'
import { Table, Segment, Image, Divider, Header, Button, Search, Menu, Container, Dropdown, Grid, List, Item, Icon, Input, Form, TextArea } from 'semantic-ui-react'

export default class Mypage extends Component {
    render() {
        return (
            <>
            <Container style={{ marginTop: '7em' }}>
                <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Bugs assigned to me</Header>
                <Table>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={12}>
                            Bug
                        </Table.HeaderCell>
                        <Table.HeaderCell width={4}>
                            Project
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Upload a pic.
                        </Table.Cell>
                        <Table.Cell>
                            LecTut
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Mobile view broken.
                        </Table.Cell>
                        <Table.Cell>
                            Slambook
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
            </Container>

            <Container style={{ marginTop: '7em' }}>
                <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Bugs reported by me</Header>
                <Table>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={12}>
                            Bug
                        </Table.HeaderCell>
                        <Table.HeaderCell width={4}>
                            Project
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Active status not in sidebar.
                        </Table.Cell>
                        <Table.Cell>
                            Bhawan app
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Unable to fetch pictures.
                        </Table.Cell>
                        <Table.Cell>
                            Buy & Sell
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
            </>
        )
    }
}
