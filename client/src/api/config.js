import axios from 'axios'

/////////////////////////////////////////////////
const API_BASE_URL = 'http://localhost:5000/api';
/////////////////////////////////////////////////

export const conect = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // будет каждый раз отпровлять куки
});




// Я БЫ ЭТО ИСПОЛЬЗОВАЛ ЕСЛИ БЫ ХРАНИЛ JWT В LOCALSTORAGE
//
//  auth = axios.create({
//      baseURL: API_BASE_URL,
//      headers: {
//          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//      }
//  })

