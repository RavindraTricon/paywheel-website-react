import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.altof.io:4000/',
    headers: {
      'Content-Type': 'application/json',      
    },
});

export default instance;