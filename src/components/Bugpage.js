import React, { Component } from 'react'
import { Grid, Header, Icon, Table, Container, Segment, TextArea, Form, Item, Button, Label, Input } from 'semantic-ui-react'

export default class Bugpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            input: false,
            iconName: 'edit',
        }
    }
    

    handleStatusChange() {
        // ajax call to change status        
    }

    handleCommentSubmit(e, val) {
        console.log(val);
        
    }

    editDesp() {
        if (this.state.iconName==='edit') {
            this.setState({
                input: true,
                iconName: 'save',
            })
        }
        else {
            // ajax call to server to update desp
            this.setState({
                input: false,
                iconName: 'edit',
            })
        }
    }

    render() {
        const description = this.state.input ? <TextArea  placeholder='Describe the bug...'>desp of bug</TextArea> : <p>desp of bug</p>

        return (
            <>
            <Container style={{ marginTop: '7em' }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Project: LecTut</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={13}>
                        <Header>
                            <Header.Content>Heading: Unable to upload pic.</Header.Content>
                            <Header.Subheader>added on: 08-05-2020</Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button as='div' labelPosition='right' onClick={() => this.handleStatusChange()}>
                            <Button color='red'>Status</Button>
                            <Label color='red' basic>pending</Label>
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <Segment>
                        <Icon name='tags' />
                        Tags: UI/UX, enhancement
                    </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={14}>
                                    <Header icon='file text' content='Description' />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Icon onClick={() => this.editDesp()} name={this.state.iconName} className='hover-pointer'/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form style={{marginTop: '1em'}}>
                            {description}
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header icon='images' content='Images' />
                        <Segment>
                            No images to show.
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <span style={{borderBottom: '1px solid grey', color: 'blue', fontSize: '120%'}}>Reported by</span>: Rahul
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <span style={{borderBottom: '1px solid grey', color: 'brown', fontSize: '120%'}}>Assigned to</span>: Drumil
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Segment.Group>
                <Segment>
                    <Icon name='comments' />
                    Comments
                </Segment>

                <Segment.Group>
                    <Segment>
                        <Header as='h5'>
                            <span>Rahul</span>
                            <span style={{color: 'grey', fontSize: '80%'}}> 05-08-2020</span>
                        </Header>
                        this is not a bug ig.
                    </Segment>
                    <Segment>
                        <Header as='h5'>
                            <span>Rahul</span>
                            <span style={{color: 'grey', fontSize: '80%'}}> 05-08-2020</span>
                        </Header>
                        this is not a bug ig.
                    </Segment>
                    <Segment>
                        <Form onSubmit={(e, value) => this.handleCommentSubmit(e, value)}>
                            <Form.Input label='Add Comment' name='comment' placeholder='Write comment...'/>
                            <Form.Button primary>Submit</Form.Button>
                        </Form>
                    </Segment>
                </Segment.Group>
            </Segment.Group>
            </Container>
            </>
        )
    }
}
