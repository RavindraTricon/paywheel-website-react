import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://schedular-27ac2.firebaseio.com/'
});

export default instance;