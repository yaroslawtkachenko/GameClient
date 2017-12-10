import './Games.scss';
import React, { Component } from 'react';
import Game from './Game/Game';
import {getGames} from '../../../Requests/roomRequests';

class Games extends Component {
    constructor (props) {
        super(props);
        this.state = {
            games: []
        };
    }
    componentWillMount () {
        this.setState({ games: getGames() });
    }
    render () {
        return (
            <div className='games'>
                <h1>Games</h1>
                {this.state.games.map((game) =>
                    <Game key={game.id} webSocket={this.props.webSocket} game={game}/>
                )}
            </div>
        );
    }
}

export default Games;
