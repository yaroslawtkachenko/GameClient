import './GameRoom.scss';
import React, { Component } from 'react';
import Games from './Games/Games';
import Rooms from './Rooms/Rooms';

class GameRoom extends Component {
    constructor (props) {
        super(props);
        this.state = {
            webSocket: new WebSocket('ws://localhost:8888/Games'),
            rooms: []
        };
    }
    render () {
        return (
            <div className='game-room'>
                <Rooms webSocket={this.state.webSocket}/>
                <Games webSocket={this.state.webSocket}/>
            </div>
        );
    }
}

export default GameRoom;
