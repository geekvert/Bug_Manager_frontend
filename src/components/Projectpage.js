import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchBugs } from '../redux/ActionCreator'
import { Table, Header, Button, Container, Grid, List, Form, TextArea, Modal, Icon } from 'semantic-ui-react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import { acs_token } from './Main'

const mapStateToProps = (state) => ({
	bugs: state.bugs,
	thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
	fetchBugs: (project_name) => {dispatch(fetchBugs(project_name))}
})

class Projectpage extends Component {
    constructor(props) {
        super(props)
		const name = props.thisUser.thisUser ? props.thisUser.thisUser.name : ''

        this.state = {
            input: false,
			iconName: 'edit',
			member: props.thisUser.thisUser ? props.thisUser.thisUser.admin_status : false,
			team: [],
			bugForm: {
				heading: '',
				description: '',
				project: props.match.params.projectName,
				reported_by: name,
				assigned_to: '',
				tags: []
			}
		}
    }
	
    editWiki(e, {project}) {
        if (this.state.iconName==='edit') {
            this.setState({
                input: true,
				iconName: 'save',
            })
        }
        else {
			// ajax call to server to update wiki
			axios
				.patch(`http://localhost:8000/backend/projects/${project.name}/`, {wiki: this.state.wiki, acs_token: acs_token})
				.then(res => window.location.reload())
				.catch(err => {alert('Some error occured in updating Wiki.')})
            this.setState({
                input: false,
                iconName: 'edit',
            })
        }
    }

	// function for adding team members
    handleSubmit(e, value) {
		// put request to update team members in project
		const team = value.project.team.concat(this.state.team)
		axios
			.patch(`http://localhost:8000/backend/projects/${value.project.name}/`, {team: team, acs_token: acs_token})
			.then(res => {
				alert('Team successfully updated.')
				window.location.reload()
			})
			.catch(err => alert('Something went wrong :('))
	}
	
	// function for adding bug
	handleBugSubmit(e, value) {
		axios
			.post('http://localhost:8000/backend/project_bug/', {...this.state.bugForm, acs_token: acs_token})
			.then(res => {
				alert('Bug reported, thanks for contributing.')
				window.location.reload()
			})
			.catch(err => alert('Some error occured in repoting the bug.'))
	}

	handleChange = (e, { name, value }) => this.setState({ bugForm: { ...this.state.bugForm, [name]: value } })

	getTags() {
		axios
		.get('http://localhost:8000/backend/tags/', {acs_token: acs_token})
		.then(res => {
			this.setState({
				tagOptions: res.data.map((tag) => ({
					key: tag.id,
					text: tag.name,
					value: tag.name,
				}))
			})
		})
	}

    componentDidMount() {
		this.props.fetchBugs(this.props.match.params.projectName)
		this.getTags()
	}

    render() {
		const {projects, match, users, bugs, thisUser} = this.props
		const {member, bugForm} = this.state
		
		if (projects.error) {
            return <h1 style={{ marginTop: '5em' }}>Something went wrong in fetching project details: {projects.error.toString()}</h1>
        }

		else if (projects.loading || projects.projects.length===0) {
            return <Loading />
        }
		
		else {
			const options = (!users.users.loading) ? users.users.map((user) => ({
				key: user.enrollment_no,
				text: user.username,
				value: user.username,
			})) : null

			const project = projects.projects.find((pro) => (pro.name === match.params.projectName))

			if (project===undefined) {
				return <h1 style={{marginTop: '5em'}}>Project '{match.params.projectName}' does not exists!</h1>
			}

			const wiki = this.state.input ? <TextArea placeholder='Type your project description here...' onChange={(e, {value}) => this.setState({wiki: value})}>{project.wiki}</TextArea> : <p>{project.wiki}</p>
			const timestamp = new Date(project.timestamp)
			const team = project.team.map((member) => <List.Item>{member}</List.Item>)

			// Bugs
			let count = 1
			const bugList = bugs.bugs.map((bug) => {
				const initStatus = {
					neagtive: false,
					positive: false,
					warning: false
				}
				const getStatus = (bug, inis=initStatus) => {
					switch(bug.status) {
						case 'R':
							return { positive: true, text: 'resolved' }
						case 'T':
							return { warning: true, text: 'to be discussed' }
						default:
							return { negative: true, text: 'pending' }
					}
				}
				const status = getStatus(bug)
				return (
					<Table.Row>
						<Table.Cell>{count++}</Table.Cell>
						<Table.Cell><Link to={`/project/${project.name}/${bug.heading}/`}>{bug.heading}</Link></Table.Cell>
						<Table.Cell>{bug.reported_by}</Table.Cell>
						<Table.Cell negative={status.negative} positive={status.positive} warning={status.warning}>{status.text}</Table.Cell>
					</Table.Row>
				)
				
			})
			// conditional rendering of add member button
			const Btn = () => (
				thisUser.thisUser.admin_status || project.creator===thisUser.thisUser.name || project.team.includes(thisUser.thisUser.name) ? 
				<List.Item>
				<Modal trigger={<Button primary size='mini' icon='add circle' content='Add member'/>}>
					<Modal.Header>Add team mates</Modal.Header>
					<Modal.Content>
					<Form project={project} onSubmit={(e, value) => this.handleSubmit(e, value)}>
						<Form.Field>
							<label>Team</label>
							<Form.Dropdown value={this.state.team} onChange={(e, {name, value}) => this.setState({...this.state, [name]: value})} name='team' placeholder='Pick your buddies...' fluid multiple selection options={options} />
						</Form.Field>
						<Form.Button primary>Submit</Form.Button>
					</Form>
					</Modal.Content>
				</Modal>
				</List.Item> : null
			)

			return (
				<>
				<Container style={{ marginTop: '7em' }}>
					<Grid celled stackable>
						<Grid.Row>
						<Grid.Column width={16}>
							<Header style={{margin: '0.5em'}}>
								{project.name}
								<Header.Subheader>
									added on {timestamp.toLocaleDateString()}
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
										<Icon project={project} onClick={(e, val) => this.editWiki(e, val)} name={this.state.iconName} className='hover-pointer'/>
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
									<List.Item>{project.creator}</List.Item>
									{team}
									<Btn />
								</List>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
	
				<Container style={{ marginTop: '3em' }}>
					<Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Bugs in {project.name}</Header>
					{/* <p>maybe used for additional info/note</p> */}
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
						{bugList}
						</Table.Body>
						
						<Table.Footer fullWidth>
						<Table.Cell colSpan='4'>
							<Modal trigger={<Button fluid primary icon='add circle' content='Add a bug'/>}>
								<Modal.Header>Add a bug</Modal.Header>
								<Modal.Content>
								<Form onSubmit={(e, value) => this.handleBugSubmit(e, value)}>
									<Form.Input value={match.params.projectName} fluid name='project' label='Project Associated' readOnly/>
									<Form.Input value={bugForm.heading} onChange={(e, data) => this.handleChange(e, data)} fluid name='heading' label='Bug heading' placeholder='Write Bug Heading...' />
									<Form.TextArea value={bugForm.description} onChange={(e, data) => this.handleChange(e, data)} name='description' label='Description' placeholder='Describe the Bug...' />
									<Form.Group widths='equal'>
										<Form.Input value={bugForm.reported_by} label='Reported by' name='reported_by' readOnly/>
										<Form.Field disabled={!(member||project.creator===thisUser.thisUser.name||project.team.includes(thisUser.thisUser.name))}>
											<label>Assigned to</label>
											<Form.Dropdown onChange={(e, data) => this.handleChange(e, data)} name='assigned_to' fluid selection options={options} />
										</Form.Field>
										<Form.Field>
											<label>Tags</label>
											<Form.Dropdown onChange={(e, data) => this.handleChange(e, data)} name='tags' placeholder='Pick relevant tags...' fluid multiple selection options={this.state.tagOptions} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Projectpage)
