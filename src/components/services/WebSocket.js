const API_PATH = 'ws://localhost:8000/ws/comments/'

class WebSocketService {
	static instance = null
	callbacks = {}
	
	static getInstance() {
		if(!WebSocketService.instance) {
			WebSocketService.instance = new WebSocketService()
		}
		return WebSocketService.instance
	}

	constructor() {
		this.socketRef = null
	}

	connect(bug_heading) {
		const path = API_PATH+bug_heading+'/'
		this.socketRef = new WebSocket(path)

		this.socketRef.oopen = () => {
			console.log('Websocket open')
		}

		// An event listener to be called when a message is received from the server.
		this.socketRef.onmessage = e => {
			console.log('MESSAGE RECEIVED FROM SERVER: '+ e.data)
			this.socketNewMessage(e.data)
		}

		this.socketRef.onerror = e => {
			console.log(e.message)
		}

		this.socketRef.onclose = () => {
			console.log('Websocket closed let\'s reopen')
			this.connect(bug_heading)
		}
	}
	
	socketNewMessage(data) {
		const parsedData = JSON.parse(data)
		const command = parsedData.command
		if (Object.keys(this.callbacks).length===0) {
			return
		}
		if (command==='add_comment') {
			this.callbacks[command](parsedData.comment)
		}
		if (command==='fetch_comments') {
			this.callbacks[command](parsedData.comments)
		}
		console.log('parsedData: '+parsedData)
	}

	fetchComments(bug) {
		this.sendMessage({ command: 'fetch_comments', bug_heading: bug.heading })
	}

	addComment(object) {
		this.sendMessage({ command: 'add_comment', access_token: object.access_token, bug_heading: object.bug_heading, comment:object.comment })
	}

	addCallbacks(commentsCallback, newCommentCallback) {
		this.callbacks['fetch_comments'] = commentsCallback	// func which will place comments in component
		this.callbacks['add_comment'] = newCommentCallback
	}

	sendMessage(data) {
		try {
			this.socketRef.send(JSON.stringify({...data}))
		}
		catch (err) {
			console.log('error occured in sending data!')
		}
	}

	state() {
		return this.socketRef.readyState
	}
	
	waitForSocketConnection(callback) {
		const socket = this.socketRef
		const recursion = this.waitForSocketConnection

		setTimeout(
			() => {
				if (socket.readyState===1) {
					console.log('Connection is made')
					if (callback!=null) {
						callback()
					}
					return
				}
				else {
					console.log('wait for connection...')
					recursion(callback)
				}
			}, 5	// wait for 5 miliseconds for the connection
		)
	}
}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance;
