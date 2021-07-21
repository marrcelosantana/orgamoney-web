import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://orgamoney-api.herokuapp.com/',
})

export default api;