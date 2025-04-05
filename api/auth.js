import apiClient from './config'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
export const login = async (email, password) => { 
try { 
const response = await apiClient.post('/auth/login', { email, password }); 
const { token } = response.data; 
await AsyncStorage.setItem('token', token); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const register = async (userData) => { 
try { 
const response = await apiClient.post('/auth/register', userData); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const logout = async () => { 
try { 
await apiClient.post('/auth/logout'); 
await AsyncStorage.removeItem('token'); 
} catch (error) { 
throw error.response ? error.response.data : error; 
} finally { 
// Incluso si falla en el servidor, eliminamos el token 
await AsyncStorage.removeItem('token'); 
} 
}; 
export const isAuthenticated = async () => { 
const token = await AsyncStorage.getItem('token'); 
return !!token; 
}; 