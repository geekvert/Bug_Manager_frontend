import React, { Component } from 'react'
import { Message, Progress } from 'semantic-ui-react'

export default class Dimmer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            percent: 0
        }
    }
    
    componentDidMount() {
        
    }

    render() {
        const message = 'Something went wrong :('
        if (this.state.percent==100)
            return null
        else if (this.props.success)
            message = 'Action executed successfully!'

        setTimeout(() => {
            this.setState({
                percent: this.state.percent + 0.2
            })
        }, 200);

        return (
            <Message>
                {message}
                <Progress percent={this.state.percent} attached='bottom'/>
            </Message>
        )
    }
}
