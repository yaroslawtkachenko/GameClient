import './app.scss';
import './reset.scss';
import React, { Component } from 'react';

let gameState = {
    whosTurn: undefined,
    playerID: undefined,
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};
let isSetuped = false;

class TTTClient extends Component {
    constructor (props) {
        super(props);
        this.state = {
            winnerPresent: false,
            winnerName: ''
        };
        this.props.websocket.onmessage = this.onMessage;
    }
    initializeBoard = () => {
        document.querySelector('.game-info__players-name').innerText = `${gameState.playerID} Player`;
        this.updateBoard();
    };
    updateBoard = () => {
        let myTurn = gameState.whosTurn === gameState.playerID ? 'My Turn' : 'Opponents Turn';
        document.querySelector('.game-info__players-turn').innerText = myTurn;

        let board = gameState.board;
        for (let i = 0; i < board.length; i++) {
            let element = document.querySelector(`.game-board__cell[data-id='${i}']`);
            element.classList.remove('game-board__cell--blue');
            element.classList.remove('game-board__cell--red');
            if (board[i] < 0) {
                element.classList.add('game-board__cell--blue');
            }
            if (board[i] > 0) {
                element.classList.add('game-board__cell--red');
            }
        }
    };
    onMessage = (message) => {
        let action = JSON.parse(message.data);
        let loadingEl = document.querySelector('.game-loading');
        switch (action.type) {
        case 'setup':
            if (isSetuped !== true) {
                gameState = action.playerData;
                this.initializeBoard();
                loadingEl.style.display = 'none';
                isSetuped = true;
            }
            break;
        case 'update':
            loadingEl.style.display = 'block';
            gameState.whosTurn = action.whosTurn;
            gameState.board = action.board;
            this.updateBoard();
            loadingEl.style.display = 'none';
            break;
        case 'winner':
            this.setState({winnerPresent: true, winnerName: action.winner});
            break;
        }
    };
    handleClick = (event) => {
        let element = event.target;
        let message = {
            type: 'move',
            playerID: gameState.playerID,
            cellID: element.dataset.id
        };
        this.props.websocket.send(JSON.stringify(message));
    };
    render () {
        if (this.state.winnerPresent === false) {
            this.props.websocket.send(JSON.stringify({ type: 'setupRequest'}));
        }
        return (
            <div className='TTT'>
                <h1 className="game-title">Websocket Tic Tac Toe</h1>
                {this.state.winnerPresent ? <h2>{this.state.winnerName}</h2>
                    : <div className="game">
                        <table className="game-board" onClick={this.handleClick}>
                            <tr>
                                <td className="game-board__cell" data-id="0"/>
                                <td className="game-board__cell" data-id="1"/>
                                <td className="game-board__cell" data-id="2"/>
                            </tr>
                            <tr>
                                <td className="game-board__cell" data-id="3"/>
                                <td className="game-board__cell" data-id="4"/>
                                <td className="game-board__cell" data-id="5"/>
                            </tr>
                            <tr>
                                <td className="game-board__cell" data-id="6"/>
                                <td className="game-board__cell" data-id="7"/>
                                <td className="game-board__cell" data-id="8"/>
                            </tr>
                        </table>
                        <div className="game-info">
                            <div className="game-info__players-name">Player Name</div>
                            <div className="game-info__players-turn">Player Turn</div>
                        </div>
                    </div>
                }

                <div className="game-loading">
                    <div className="loader">Loading...</div>
                </div>
            </div>
        );
    }
}

export default TTTClient;
