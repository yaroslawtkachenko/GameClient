import React from 'react';

const UPDATE_USERS = 'updateUsers';
// const GET_ONLINE_USERS = 'getOnlineUsers';

class Players extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            webSocket: new WebSocket('ws://localhost:8888/Users'),
            users: []
        };
        this.state.webSocket.onmessage = this.onMessage;
    }
    onMessage = (data) => {
        const response = JSON.parse(data.data);
        switch (response.type) {
        case UPDATE_USERS:
            this.setState({users: response.data});
            break;
        }
    };
    render () {
        return (
            <div >
                {this.state.users.map((user) => <div key={user.Id}><text>{user.Name}</text></div>)}
            </div>
        );
    }
}

export default Players;
