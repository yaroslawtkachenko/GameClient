import './Game.scss';
import React, { Component } from 'react';
import Modal from 'react-modal';
import ModalContent from '../../../ModalContent/ModalContent';
import PropTypes from 'prop-types';

const GAME_CREATED = 'gameCreated';
const CREATE_GAME = 'createGame';

class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isShowingModal: false,
            room: {}
        };
        this.props.webSocket.addEventListener('message', this.onMessageGame);
    }
    onMessageGame = (data) => {
        const response = JSON.parse(data.data);
        switch (response.type) {
        case GAME_CREATED:
            this.setState({isShowingModal: true, room: response.data});
            break;
        }
    };
    handleClick = () => {
        this.props.webSocket.send(JSON.stringify({
            type: CREATE_GAME,
            data: {
                title: 'Room',
                imageUrl: this.props.game.image,
                maxPlayers: this.props.game.maxPlayers,
                host: 'Vampirqer'
            }
        }));
    };
    closeModal = () => {
        this.setState({isShowingModal: false});
    };
    render () {
        return (
            <div className='game'>
                {this.state.isShowingModal &&
                <Modal isOpen={true} contentLabel="Game Lobby">
                    <ModalContent room={this.state.room} onRequestClose={this.closeModal}/>
                </Modal>}
                <div className='game-img'>
                    <img src={this.props.game.image} onClick={this.handleClick}/>
                </div>
            </div>
        );
    }
}

Game.propTypes = {
    game: PropTypes.object.isRequired
};

export default Game;
