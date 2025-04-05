import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'; 
import { useAuth } from '../../context/AuthContext'; 
import Input from '../../components/Input'; 
import Button from '../../components/Button'; 
 
const LoginScreen = ({ navigation }) => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({}); 
   
  const { login } = useAuth(); 
 
  const validate = () => { 
    let valid = true; 
    const newErrors = {}; 
     
    if (!email) { 
      newErrors.email = 'El correo es obligatorio'; 
      valid = false; 
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
      newErrors.email = 'El correo no es válido'; 
      valid = false; 
    } 
     
    if (!password) { 
      newErrors.password = 'La contraseña es obligatoria'; 
      valid = false; 
    } 
     
    setErrors(newErrors); 
    return valid; 
  }; 
 
  const handleLogin = async () => { 
    if (!validate()) return; 
     
    setLoading(true); 
    try { 
      await login(email, password); 
    } catch (error) { 
      Alert.alert( 
        'Error de inicio de sesión', 
        error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.' 
      ); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
        <Text style={styles.title}>Bienvenido</Text> 
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text> 
      </View> 
       
      <View style={styles.form}> 
        <Input  
          label="Correo electrónico" 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Ingresa tu correo" 
          keyboardType="email-address" 
          autoCapitalize="none" 
          error={errors.email} 
        /> 
         
        <Input  
          label="Contraseña" 
          value={password} 
          onChangeText={setPassword} 
          placeholder="Ingresa tu contraseña" 
          secureTextEntry 
          error={errors.password} 
        /> 
         
        <Button  
          title="Iniciar Sesión"  
          onPress={handleLogin}  
          loading={loading}  
        /> 
         
        <TouchableOpacity  
          style={styles.registerLink} 
          onPress={() => navigation.navigate('Register')} 
        > 
          <Text style={styles.registerText}> 
            ¿No tienes cuenta? <Text style={styles.registerTextBold}>Regístrate</Text> 
          </Text> 
        </TouchableOpacity> 
      </View> 
    </View> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    alignItems: 'center', 
    marginTop: 60, 
    marginBottom: 40, 
  }, 
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10, 
  }, 
subtitle: { 
fontSize: 16, 
color: '#666', 
}, 
form: { 
marginBottom: 20, 
}, 
registerLink: { 
alignItems: 'center', 
marginTop: 20, 
}, 
registerText: { 
fontSize: 16, 
color: '#666', 
}, 
registerTextBold: { 
fontWeight: 'bold', 
color: '#007BFF', 
}, 
}); 
export default LoginScreen;