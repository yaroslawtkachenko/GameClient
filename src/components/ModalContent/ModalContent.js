import './ModalContent.scss';
import PropTypes from 'prop-types';
import React from 'react';
import RoomInfo from './RoomInfo/RoomInfo';
import TTTClient from './TTTClient/TTTClient';

class ModalContent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isJoinedToGame: false,
            websocket: new WebSocket(this.props.room.WebSocketUrl)
        };
    }
    changeJoinGameState =() => {
        this.setState({isJoinedToGame: true});
    };
    closeConnectionOnClose = () => {
        this.state.websocket.close();
        this.props.onRequestClose();
    };
    render () {
        return (
            <div className='modal-content'>
                <div className='room-info'>
                    <RoomInfo room={this.props.room} websocket={this.state.websocket}/>
                    <div className='modalButtons'>
                        <button onClick={this.changeJoinGameState}>Join Game</button>
                        <button onClick={this.closeConnectionOnClose}>Exit Room</button>
                    </div>
                </div>
                <div className='game-instance'>
                    {this.state.isJoinedToGame &&
                    <TTTClient websocket={this.state.websocket}/>}
                </div>
            </div>
        );
    }
}

ModalContent.propTypes = {
    room: PropTypes.object.isRequired
};

export default ModalContent;
