import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// Cambia esta URL por la de tu API 
const API_URL = 'http://localhost/clases/public/api/'; 
const apiClient = axios.create({ 
baseURL: API_URL, 
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/json', 
}, 
}); 
// Interceptor para añadir token de autenticación 
apiClient.interceptors.request.use( async (config) => {
const token = await AsyncStorage.getItem('token'); 
if (token) { 
config.headers.Authorization = `Bearer ${token}`; 
} 
return config; 
}, 
(error) => { 
return Promise.reject(error); 
} 
); 
export default apiClient;