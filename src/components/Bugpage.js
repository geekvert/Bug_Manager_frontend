import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBugs, fetchProjects } from '../redux/ActionCreator'
import { Grid, Header, Icon, Table, Container, Segment, TextArea, Form, Item, Button, Label, Dropdown, Input } from 'semantic-ui-react'
import Loading from './Loading'
import axios from 'axios'
import Comments from './comments'

const mapStateToProps = (state) => ({
    bugs: state.bugs,
    thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
    fetchProjects: () => {dispatch(fetchProjects())},
	fetchBugs: (project_name) => {dispatch(fetchBugs(project_name))}
})

class Bugpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            input: false,
            iconName: 'edit',
            description: '',
            assigned_to: '',
            images: [],
			file: null,
        }
	}
	
	fileInputRef = React.createRef()
	
	onFormSubmit = (e, {bug}) => {
        e.preventDefault()
        this.fileUpload(this.state.file, bug)
	}

	fileUpload = (file, bug) => {
		const url = `http://localhost:8000/backend/bug_images/`;
		const formData = new FormData()
        formData.append('image', file)
        formData.append('bug', bug.id)
        
		const config = {
			headers: {
                'Content-type': 'multipart/form-data',
            },
		}
		return axios
            .post(url, formData, config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    
    fileChange = e => {
		this.setState({ file: e.target.files[0] }, () => {
			console.log("File chosen --->", this.state.file)
		})
	}

    handleStatusChange(e, {bug}) {
        // ajax call to change status
        console.log(bug)
        let status
        switch(bug.status) {
            case 'P':
                status = 'T'
                break
            case 'T':
                status = 'R'
                break
            default:
                status = 'P'
        }

        axios
            .patch(`http://localhost:8000/backend/project_bug/${bug.heading}/?project_name=${bug.project}`, {status: status})
            .then(res => {
                alert('Status successfully changed.')
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    handleCommentSubmit(e, val) {
        console.log(val);
        
    }

    changeAssignment(e, {bug}) {
		console.log(bug.heading, bug.project, this.state.assigned_to)
        // ajax call to server to update assigned_to
        axios
            .patch(`http://localhost:8000/backend/project_bug/${bug.heading}/?project_name=${bug.project}`, {assigned_to: this.state.assigned_to})
            .then(res => {
				alert(`Now assigned to ${this.state.assigned_to}!`)
				window.location.reload()
			})
            .catch(err => alert('Something went wrong in assigning bug  :('))
    }

    editDesp(e, {bug}) {
        if (this.state.iconName==='edit') {
            this.setState({
                description: bug.description,
                input: true,
                iconName: 'save',
            })
        }
        else {
			console.log(bug.heading, bug.project, this.state.description)
            // ajax call to server to update desp
            axios
                .patch(`http://localhost:8000/backend/project_bug/${bug.heading}/?project_name=${bug.project}`, {description: this.state.description})
                .then(res => {
					alert('Description updated successfully  :)')
					console.log(res)
                    // window.location.reload()
                })
                .catch(err => alert('Something went wrong in updating bug.'))
            this.setState({
                input: false,
                iconName: 'edit',
            })
        }
    }

    getImages(bug_heading) {
        const url = 'http://localhost:8000/backend/bug_images/'
        axios
            .get(url, {params:{bug_heading: bug_heading}})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.props.fetchBugs(this.props.match.params.projectName)
        if (this.props.projects.projects.length===0 && !this.props.projects.loading) {
            this.props.fetchProjects()
        }
    }

    render() {
        const { match, projects, users, bugs, thisUser, file } = this.props
        
        if (bugs.loading || projects.loading || users.laoding) {
            return <Loading />
        }

        else if (bugs.error || bugs.bugs.length===0) {
            return <h1>Something went wrong in fetching bug data :(</h1>
        }

        else {
            const thisProject = projects.projects.find((pro) => pro.name===match.params.projectName)
            
            const bug = bugs.bugs.find((bug) => bug.heading===match.params.heading)
            if (bug===undefined) {
                return <h1 style={{marginTop: '5em'}}>Bug '{match.params.heading}' not found</h1>
            }

            // IMAGES HERE
            this.getImages(bug.heading)
            
            const description = this.state.input ? <TextArea name='description' value={this.state.description} onChange={(e, {name, value}) => this.setState({[name]: value})} placeholder='Describe the bug...' /> : <Segment>{bug.description}</Segment>
            const timestamp = new Date(bug.timestamp)

            const options = (!users.users.loading) ? users.users.map((user) => ({
				key: user.enrollment_no,
				text: user.username,
				value: user.username,
			})) : null

            const AssignedTo = () => (
                thisUser.admin_status || thisProject.creator===thisUser.thisUser.name || thisProject.team.includes(thisUser.thisUser.name) ?
                <Button.Group color='orange' size='small'>
                    <Button bug={bug} onClick={(e, {bug}) => this.changeAssignment(e, {bug})}>Assigned to : {bug.assigned_to}</Button>
                    <Dropdown
                    value={this.state.assigned_to}
                    onChange={(e, {value}) => this.setState({assigned_to: value})}
                    className='button icon'
                    floating
                    options = {options}
                    trigger={<React.Fragment />}
                    />
                </Button.Group> :
                <Label color='orange' size='large'>
                    Assigned to : {bug.assigned_to}
                </Label>
            )

            const getStatus = (bug) => {
                switch(bug.status) {
                    case 'R':
                        return {color: 'green', text: 'Resolved'}
                    case 'T':
                        return {color: 'brown', text: 'TBD'}
                    default:
                        return {color: 'red', text: 'Pending'}
                }
            }

            return (
                <>
                <Container style={{ marginTop: '7em' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Project: {bug.project}</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Header>
                                <Header.Content>{bug.heading}</Header.Content>
                                <Header.Subheader>added on: {timestamp.toLocaleDateString()}</Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button bug={bug} as='div' labelPosition='right' onClick={(e, val) => this.handleStatusChange(e, val)}>
                                <Button color={getStatus(bug).color}>Status</Button>
                                <Label color={getStatus(bug).color} basic>{getStatus(bug).text}</Label>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Segment>
                            <Icon name='tags' />
                            Tags: {bug.tags.join(', ')}
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
                                        <Icon bug={bug} onClick={(e, val) => this.editDesp(e, val)} name={this.state.iconName} className='hover-pointer'/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Form style={{marginTop: '1em'}} >
                                {description}
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header icon='images' content='Images' />
                            <Segment>
                                <label>Upload Image</label>
                                <Button content="Choose File" labelPosition="left" icon="file" onClick={() => this.fileInputRef.current.click()} />

                                <Form bug={bug} onSubmit={(e, props) => this.onFormSubmit(e, props)}>
                                <Form.Field>
									<input ref={this.fileInputRef} type='file' hidden onChange={(e) => this.fileChange(e)} />
                                </Form.Field>
                                <Button type="submit">Upload</Button>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Label color='blue' size='large'>
                                Reported by : {bug.reported_by}
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <AssignedTo />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* <Comments bug={bug} thisUser={thisUser.thisUser} /> */}
                </Container>
                </>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bugpage)

/*
comments
image upload option
*/

// user -> group pe subscribe -> whenever message send/received sabpe jaayega
