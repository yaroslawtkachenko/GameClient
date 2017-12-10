import './User.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className='user'>
                <div className='user-img'>
                    <img src='http://www.sp-fan.ru/upload/iblock/a94/sp_wow_guy.png'/>
                </div>
                <div className='user-info'>
                    <p><text><strong>User:</strong> {this.props.nickname}</text></p>
                    <p><text><strong>Favorite game:</strong> {this.props.favoriteGame}</text></p>
                    <p><text><strong>Favorite game rating:</strong> {this.props.favoriteGameRating}</text></p>
                </div>
            </div>
        );
    }
}

User.propTypes = {
    nickname: PropTypes.string.isRequired,
    favoriteGame: PropTypes.string.isRequired,
    favoriteGameRating: PropTypes.string.isRequired
};

export default User;
