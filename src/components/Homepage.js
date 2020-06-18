import React, { Component } from 'react'
import { Modal, Form, Segment, Image, Divider, Header, Button, Search, Menu, Container, Dropdown, Grid, List, Item, Icon, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Homepage extends Component {

    options = [
        {key: 'ra', text:'RAhul', value:'rahul'},
        {key: 'ad', text:'Aditya', value:'aditya'},
        {key: 'su', text:'Surya', value:'surya'}
    ]

    handleSubmit(e, value) {
        console.log(value)
        e.preventDefault()
    }

    deleteProject(e, project) {
        //send request to server to delete project
    }

    render() {
        return (
            <>
            <Container text style={{ marginTop: '7em' }}>
              <Header as='h1' style={{borderBottom: '1px solid grey'}}>Projects</Header>
              {/* <p>This is a paragraph.</p> */}
            </Container>

            <Container style={{ margin: '3em' }}>
                <Segment.Group attached>
                <Segment>
                    <Grid>
                    <Grid.Column computer='15' mobile='13' tablet='13' as={Link} to='/project'>
                        <Header>
                                LecTut
                                <Header.Subheader>
                                    added on : 08-05-2020
                                </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Button onClick={(e, project) => this.deleteProject(e, project)} color='red' icon='delete' />
                    </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid>
                    <Grid.Column computer='15' mobile='10' tablet='13'>
                        <Header>
                                Slambook
                                <Header.Subheader>
                                    added on : 08-05-2020
                                </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    </Grid>
                </Segment>
                <Segment textAlign='center'>
                <Modal trigger={<Button primary icon='add circle' content='Add a project'/>}>
                    <Modal.Header>Add a project</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e, value) => this.handleSubmit(e, value)}>
                        <Form.Input fluid name='project_name' label='Project name' placeholder='Write project name...' />
                        <Form.TextArea name='wiki' label='Wiki' placeholder='Your project wiki...' />
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='creator' name='creator' value='Rahul' readOnly/>
                            <Form.Field>
                                <label>Team</label>
                                <Form.Dropdown name='team' lable='Team' placeholder='Pick your buddies...' fluid multiple selection options={this.options} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Button primary>Submit</Form.Button>
                    </Form>
                    </Modal.Content>
                </Modal>
                </Segment>
                </Segment.Group>
            </Container>  
            </>
        )
    }
}

// form
// name, wiki, creator(read-only), team(sub-form)
