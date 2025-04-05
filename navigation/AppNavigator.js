import React from 'react';  
import { createStackNavigator } from '@react-navigation/stack';  
import { useAuth } from '../context/AuthContext';  

// Importar pantallas  
import LoginScreen from '../screens/auth/LoginScreen';  
import RegisterScreen from '../screens/auth/RegisterScreen';  
import TrabajadoresScreen from '../screens/trabajadores/TrabajadoresScreen';  
import TrabajadorDetailScreen from '../screens/trabajadores/TrabajadorDetailScreen';  
import TrabajadorFormScreen from '../screens/trabajadores/TrabajadorFormScreen';  
import DepartamentosScreen from '../screens/departamentos/DepartamentosScreen';  
import DepartamentoDetailScreen from '../screens/departamentos/DepartamentoDetailScreen';  
import DepartamentoFormScreen from '../screens/departamentos/DepartamentoFormScreen';  

const Stack = createStackNavigator();  

const AuthStack = () => (  
  <Stack.Navigator initialRouteName="Login">  
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />  
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />  
  </Stack.Navigator>  
);  

const AppStack = () => (  
  <Stack.Navigator initialRouteName="Trabajadores">  
    <Stack.Screen name="Trabajadores" component={TrabajadoresScreen} />  
    <Stack.Screen name="TrabajadorDetail" component={TrabajadorDetailScreen} options={{ title: 'Detalle de Trabajador' }} />  
    <Stack.Screen  
      name="TrabajadorForm"  
      component={TrabajadorFormScreen}  
      options={({ route }) => ({ title: route.params?.trabajador ? 'Editar Trabajador' : 'Nuevo Trabajador' })}  
    />  
    <Stack.Screen name="Departamentos" component={DepartamentosScreen} />  
    <Stack.Screen name="DepartamentoDetail" component={DepartamentoDetailScreen} options={{ title: 'Detalle de Departamento' }} />  
    <Stack.Screen  
      name="DepartamentoForm"  
      component={DepartamentoFormScreen}  
      options={({ route }) => ({ title: route.params?.departamento ? 'Editar Departamento' : 'Nuevo Departamento' })}  
    />  
  </Stack.Navigator>  
);  

const AppNavigator = () => {  
  const { user, loading } = useAuth();  

  if (loading) {  
    return null; // Puedes agregar un spinner o pantalla de carga  
  }  

  return user ? <AppStack /> : <AuthStack />;  
};  

export default AppNavigator;
