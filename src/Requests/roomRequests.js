import axios from 'axios';

export function startGame () {
    return axios.get('http://localhost:52528/rooms/1/start_game', {headers: {}})
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        });
}

export function createRoom (game) {
    return axios.post('http://localhost:52528/rooms/create', {
        title: 'Room',
        imageUrl: game.image,
        maxPlayers: game.maxPlayers,
        host: 'Vampirqer'},
    { headers: {}})
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        });
}

export function getGame (gameId) {
    return axios.get('http://localhost:3000/mini_games/' + gameId, {headers: {}})
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        });
}

export function getGames () {
    return [{
        image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/9/99/Xo_game.svg/220px-Xo_game.svg.png',
        id: 1,
        maxPlayers: 2
    }];
}

export function getRooms () {
    return axios.get('http://localhost:52528/rooms', {headers: {}})
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        });
}
