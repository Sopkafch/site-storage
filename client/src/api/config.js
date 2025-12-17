import axios from 'axios'

/////////////////////////////////////////////////
const API_BASE_URL = 'http://127.0.0.1:5000/api';
/////////////////////////////////////////////////

export const conect = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // будет каждый раз отпровлять куки
});
