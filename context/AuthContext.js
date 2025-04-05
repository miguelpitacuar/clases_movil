import React, { createContext, useState, useEffect, useContext } from 'react'; 
import * as authService from '../api/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
 
const AuthContext = createContext(); 
 
export const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
 
  // Verificar si hay un token guardado al iniciar la app 
  useEffect(() => { 
    const checkToken = async () => { 
      setLoading(true); 
      try { 
        const isAuth = await authService.isAuthenticated(); 
        if (isAuth) { 
          // Aquí podrías hacer una petición para obtener los datos del usuario 
          setUser({ isAuthenticated: true }); 
        } 
      } catch (error) { 
        console.error('Error al verificar autenticación:', error); 
      } finally { 
        setLoading(false); 
      } 
    }; 
 
    checkToken(); 
  }, []); 
 
  const login = async (email, password) => { 
    setLoading(true); 
    try { 
      const data = await authService.login(email, password); 
      setUser({ isAuthenticated: true, ...data.user }); 
      return data; 
    } catch (error) { 
      throw error; 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  const register = async (userData) => { 
    setLoading(true); 
    try { 
      const data = await authService.register(userData); 
      return data; 
    } catch (error) { 
      throw error; 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  const logout = async () => { 
    setLoading(true); 
    try { 
      await authService.logout(); 
      setUser(null); 
    } catch (error) { 
      console.error('Error al cerrar sesión:', error); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  return ( 
    <AuthContext.Provider value={{ user, loading, login, register, logout }}> 
      {children} 
    </AuthContext.Provider> 
  ); 
}; 
 
export const useAuth = () => useContext(AuthContext);