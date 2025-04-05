import apiClient from './config'; 
export const getAllDepartamentos = async () => { 
try { 
const response = await apiClient.get('/departamentos'); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const getDepartamento = async (id) => { 
try { 
const response = await apiClient.get(`/departamentos/${id}`); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const createDepartamento = async (data) => { 
try { 
const response = await apiClient.post('/departamentos', data); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const updateDepartamento = async (id, data) => { 
try { 
const response = await apiClient.put(`/departamentos/${id}`, data); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
}; 
export const deleteDepartamento = async (id) => { 
try { 
const response = await apiClient.delete(`/departamentos/${id}`); 
return response.data; 
} catch (error) { 
throw error.response ? error.response.data : error; 
} 
};