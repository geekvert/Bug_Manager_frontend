import React, { Component } from 'react'
import { Table, Segment, Image, Divider, Header, Button, Search, Menu, Container, Dropdown, Grid, List, Item, Icon, Input, Form, TextArea, Modal } from 'semantic-ui-react'

export default class Projectpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            input: false,
            iconName: 'edit',
            member: true,
        }
    }
    
    editWiki() {
        if (this.state.iconName==='edit') {
            this.setState({
                input: true,
                iconName: 'save',
            })
        }
        else {
            // ajax call to server to update wiki
            this.setState({
                input: false,
                iconName: 'edit',
            })
        }
    }

    handleSubmit(e, value) {
        console.log(value.children)
        e.preventDefault()
    }

    render() {
        const wiki = this.state.input ? <TextArea  placeholder='Type your project description here...'></TextArea> : <p>its a paragraph</p>
        const assigned_to = this.state.member ? '' : 'readonly'

        return (
            <>
            <Container style={{ marginTop: '7em' }}>
                <Grid celled stackable>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        <Header style={{margin: '0.5em'}}>
                            Lectut
                            <Header.Subheader>
                                added on 08-05-2020
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={11}>
                            <Grid verticalAlign='middle' style={{marginBottom: '1em'}}>
                                <Grid.Row>
                                <Grid.Column width={1}>
                                    <Icon size='big' name='file alternate outline'/>
                                </Grid.Column>
                                <Grid.Column computer='14' mobile='12'>
                                    <Header content='Wiki'/>
                                </Grid.Column>
                                <Grid.Column width={1}>
                                    <Icon onClick={() => this.editWiki()} name={this.state.iconName} className='hover-pointer'/>
                                </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Form style={{margin: '1em'}}>
                                {wiki}
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header icon='group' content='Team' style={{margin: '0.5em'}}/>
                            <List style={{margin: '0.5em'}}>
                                <List.Item>Rahul Kumar</List.Item>
                                <List.Item>Sundar Pichai</List.Item>
                                <List.Item>
                                    <Modal trigger={<Button primary size='mini' icon='add circle' content='Add member'/>}>
                                        <Modal.Header>Add team mates</Modal.Header>
                                        <Modal.Content>
                                        <Form onSubmit={(e, value) => this.handleSubmit(e, value)}>
                                            <Form.Field>
                                                <label>Team</label>
                                                <Form.Dropdown name='team' lable='Team' placeholder='Pick your buddies...' fluid multiple selection options={this.options} />
                                            </Form.Field>
                                            <Form.Button primary>Submit</Form.Button>
                                        </Form>
                                        </Modal.Content>
                                    </Modal>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

            <Container style={{ marginTop: '3em' }}>
                <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Bugs in LecTut</Header>
                {/* <p>This is a paragraph.</p> */}
                <Table celled selectable stackable='false'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>S. No.</Table.HeaderCell>
                        <Table.HeaderCell>Heading</Table.HeaderCell>
                        <Table.HeaderCell>Reported by</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>                        
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>Sidebar not working</Table.Cell>
                        <Table.Cell>Rahul</Table.Cell>
                        <Table.Cell negative>pending</Table.Cell>                        
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>unable to upload picture</Table.Cell>
                        <Table.Cell>Rahul</Table.Cell>
                        <Table.Cell warning>TBD</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>3</Table.Cell>
                        <Table.Cell>Mobile view broken</Table.Cell>
                        <Table.Cell>Rahul</Table.Cell>
                        <Table.Cell positive>Resolved</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                    
                    <Table.Footer fullWidth>
                    <Table.Cell colSpan='4'>
                        <Modal trigger={<Button fluid primary icon='add circle' content='Add a bug'/>}>
                            <Modal.Header>Add a bug</Modal.Header>
                            <Modal.Content>
                            <Form onSubmit={(e, value) => this.handleSubmit(e, value)}>
                                <Form.Input fluid name='project_assoc' label='Project Associated' value='LecTut' readOnly/>
                                <Form.Input fluid name='bug_heading' label='Bug heading' placeholder='Write Bug Heading...' />
                                <Form.TextArea name='bug_description' label='Description' placeholder='Describe the Bug...' />
                                <Form.Group widths='equal'>
                                    <Form.Input  label='Reported by' name='reported_by' value='Rahul' readOnly/>
                                    <Form.Input  label='Assigned to' name='assigend_to' value=''/>
                                    <Form.Field>
                                        <label>Tags</label>
                                        <Form.Dropdown name='tags' placeholder='Pick relevant tags...' fluid multiple selection options={this.tags} />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Button primary>Submit</Form.Button>
                            </Form>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                    </Table.Footer>
                </Table>
            </Container>
            </>
        )
    }
}
