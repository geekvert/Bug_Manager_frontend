import React, { Component } from 'react'
import { Modal, Form, Segment, Header, Button, Container, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchThisUser } from '../redux/ActionCreator'
import { acs_token } from './Main'

const mapStateToProps = (state) => ({
	thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
	fetchThisUser: (acs_token) => {dispatch(fetchThisUser(acs_token))}
})

class Homepage extends Component {
	constructor(props) {
		super(props)
		const name = props.thisUser.thisUser ? props.thisUser.thisUser.name : ''
		this.state = {
            open: false,
            selProject: '',
            form: {
                name: '',
                wiki: '',
                creator: name,
                team: []
            }
        }
	}

    handleSubmit(e, props) {
		// dispatching action to create a project
		const {form} = this.state
		axios
			.post('http://localhost:8000/backend/projects/', {...form, acs_token: acs_token})
			.then(res => {
                alert(`You have successfully created ${res.data.name}!`)
                window.location.reload()
            })
			.catch(err => alert('Unable to create project at the moment :('))
    }
    
    handleChange = (e, { name, value }) => this.setState({ form: { ...this.state.form, [name]: value } })

    deleteProject(e, data) {
		// sending request to the server to delete the project
		return axios
			.delete(`http://localhost:8000/backend/projects/${data.project}`, {acs_token: acs_token})
			.then(res => {
				if (res.status === 204) {
					alert(`You have deleted ${data.project}!`)
                    this.setState({open: false, selProject: ''})
                    window.location.reload()
				}
			})
			.catch(err => {
				alert(`Something went wrong in deleting ${data.project}  :(`)
			})
    }

	componentDidMount() {
	}

	render() {
        const { users, projects, thisUser } = this.props
		const { open, selProject, form } = this.state

		const Confirmation = ({project}) => selProject!=='' ? (
			<Modal size='tiny' open={open} onClose={() => this.setState({open: false, selProject: ''})}>
					<Modal.Header>Delete Project</Modal.Header>
					<Modal.Content>
						<p>Are you sure you want to delete {project}?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={() => this.setState({open: false, selProject: ''})}>No</Button>
						<Button positive project={project} onClick={(e, data) => this.deleteProject(e, data)}>Yes</Button>
					</Modal.Actions>
			</Modal>
        ) : null
        
        const options = (!users.users.loading) ? users.users.map((user) => {
            return {
                key: user.enrollment_no,
                text: user.username,
                value: user.username,
            }
        }) : null

        const projectList = projects.projects.map((project) => {
			const DelBtn = ({pro}) => (
				pro.creator===thisUser.thisUser.name || thisUser.thisUser.admin_status ?
				<Button project={pro} onClick={(e, data) => this.setState({selProject: data.project.name, open: true})} color='red' icon='delete' /> : null
			)
            const timestamp = new Date(project.timestamp)
            return (
				<>
                <Segment>
                    <Grid>
                    <Grid.Column computer='15' mobile='13' tablet='13' as={Link} to={'/project/'+project.name}>
                        <Header>
							{project.name}
							<Header.Subheader>
								added on : {timestamp.toLocaleDateString()}
							</Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        {/* Conditional rendering of DelBtn */}
						<DelBtn pro={project} />
                    </Grid.Column>
                    </Grid>
                </Segment>
			    </>
            )
        })

        if (projects.loading) {
            return <Loading />
        }

        else if (projects.error) {
            return <h1 style={{ marginTop: '5em' }}>Something went wrong in fetching projects: {projects.error.toString()}</h1>
        }

        return (
            <>
            <Container text style={{ marginTop: '7em' }}>
            <Header as='h1' style={{borderBottom: '1px solid grey'}}>Projects</Header>
            {/* <p>Additional info/note can be rendered here.</p> */}
            </Container>

            <Container style={{ margin: '3em' }}>
                <Segment.Group attached>
                {projectList}
                <Confirmation project={selProject} />

                <Segment textAlign='center'>
                <Modal trigger={<Button primary icon='add circle' content='Add a project'/>}>
                    <Modal.Header>Add a project</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e, props) => this.handleSubmit(e, props)}>
                        <Form.Input value={form.name} onChange={(e, data) => this.handleChange(e, data)} fluid name='name' label='Project name'  placeholder='Write project name...' />
                        <Form.TextArea value={form.wiki} onChange={(e, data) => this.handleChange(e, data)} name='wiki' label='Wiki' placeholder='Your project wiki...' />
                        <Form.Group widths='equal'>
                            <Form.Input value={form.creator} fluid label='creator' name='creator' readOnly/>
                            <Form.Field>
                                <label>Team</label>
                                <Form.Dropdown onChange={(e, data) => this.handleChange(e, data)} name='team' lable='Team' placeholder={options ? 'Pick your buddies...' : 'Something went wrong in fetching users :('} fluid multiple selection options={options} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
