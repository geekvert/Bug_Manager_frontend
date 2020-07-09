import React, { Component } from 'react'
import { Segment, Icon, Header, Form } from 'semantic-ui-react'

import WebSocketInstance from './services/WebSocket'


export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        WebSocketInstance.connect(props.bug.heading)

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setComments.bind(this), this.addComment.bind(this))
            WebSocketInstance.fetchComments(this.props.bug)
        })
    }
    
    setComments(comments) {
        console.log('fetched comments: '+comments)
        this.setState({comments: comments})
    }

    addComment(comment) {
        console.log('added comment: '+comment)
        this.setState({comments: [...this.state.comments, comment]})
    }

    sendCommentHandler(e, comment) {
        const object = {
            acs_token: this.props.thisUser.thisUser.acs_token,
            bug_heading: this.props.bug.heading,
            comment: this.state.comment
        }
        WebSocketInstance.addComment(object)
        this.setState({comment: ''})
        e.preventDefault()
    }

    waitForSocketConnection(callback) {
        const component = this
        setTimeout(
        function () {
            // Check if websocket state is OPEN
            if (WebSocketInstance.state()===1) {
                console.log('Connection is made')
                callback()
                return
            }
            else {
                console.log('wait for connection...')
                component.waitForSocketConnection(callback)
            }
        }, 100) // wait 100 milisecond for the connection
    }

    renderComments = (comments) => comments.map((comment) => {
        const timestamp = new Date(comment.timestamp)
        return (
            <Segment>
                <Header as='h5'>
                    <span>{comment.commentator}</span>
                    <span style={{color: 'grey', fontSize: '80%'}}>{timestamp.toLocaleDateString()}</span>
                </Header>
                {comment.body}
            </Segment>
        )
    })

    render() {
        const { comments } = this.state
        const { bug, thisUser } = this.props
        console.log(this.props)

        return (
            <Segment.Group>
                <Segment>
                    <Icon name='comments' />
                    Comments
                </Segment>

                <Segment.Group>
                    {comments && this.renderComments(comments)}
                    <Segment>
                        <Form onSubmit={(e) => this.sendCommentHandler(e, this.state.comment)}>
                            <Form.Input value={this.state.comment} onChange={(e, {value}) => this.setState({comment: value})} label='Add Comment' name='comment' placeholder='Write comment...'/>
                            <Form.Button primary>Submit</Form.Button>
                        </Form>
                    </Segment>
                </Segment.Group>
            </Segment.Group>  
        )
    }
}
