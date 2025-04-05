import apiClient from './config'; 
export const getAllTrabajadores = async () => { 
try { 
const response = await apiClient.get('/trabajadores'); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const getTrabajador = async (id) => { 
try { 
const response = await apiClient.get(`/trabajadores/${id}`); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const createTrabajador = async (data) => { 
try { 
const response = await apiClient.post('/trabajadores', data); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const updateTrabajador = async (id, data) => { 
try { 
const response = await apiClient.put(`/trabajadores/${id}`, data); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const deleteTrabajador = async (id) => { 
try { 
const response = await apiClient.delete(`/trabajadores/${id}`); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const getTrabajadoresByDepartamento = async () => { 
try { 
const response = await apiClient.get('/trabajadores/departamentos'); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
};