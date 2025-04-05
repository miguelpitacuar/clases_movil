import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'; 
import { useAuth } from '../../context/AuthContext'; 
import Input from '../../components/Input'; 
import Button from '../../components/Button'; 
 
const RegisterScreen = ({ navigation }) => { 
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    password_confirmation: '', 
  }); 
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({}); 
   
  const { register } = useAuth(); 
 
  const updateField = (field, value) => { 
    setFormData({ 
      ...formData, 
      [field]: value, 
    }); 
  }; 
 
  const validate = () => { 
    let valid = true; 
    const newErrors = {}; 
     
    if (!formData.name) { 
      newErrors.name = 'El nombre es obligatorio'; 
      valid = false; 
    } 
     
    if (!formData.email) { 
      newErrors.email = 'El correo es obligatorio'; 
      valid = false; 
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { 
      newErrors.email = 'El correo no es válido'; 
      valid = false; 
    } 
     
    if (!formData.password) { 
      newErrors.password = 'La contraseña es obligatoria'; 
      valid = false; 
    } else if (formData.password.length < 6) { 
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'; 
      valid = false; 
    } 
     
    if (formData.password !== formData.password_confirmation) { 
      newErrors.password_confirmation = 'Las contraseñas no coinciden'; 
      valid = false; 
    } 
     
    setErrors(newErrors); 
    return valid; 
  }; 
 
  const handleRegister = async () => { 
    if (!validate()) return; 
     
    setLoading(true); 
    try { 
      await register(formData); 
      Alert.alert( 
        'Registro exitoso', 
        'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.', 
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }] 
      ); 
    } catch (error) { 
      Alert.alert( 
        'Error de registro', 
        error.message || 'No se pudo completar el registro. Inténtalo de nuevo.' 
      ); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  return ( 
    <ScrollView style={styles.container}> 
      <View style={styles.header}> 
        <Text style={styles.title}>Crear cuenta</Text> 
        <Text style={styles.subtitle}>Completa el formulario para registrarte</Text> 
      </View> 
       
      <View style={styles.form}> 
        <Input  
          label="Nombre" 
          value={formData.name} 
          onChangeText={(value) => updateField('name', value)} 
          placeholder="Ingresa tu nombre" 
          error={errors.name} 
        /> 
         
        <Input  
          label="Correo electrónico" 
          value={formData.email} 
          onChangeText={(value) => updateField('email', value)} 
          placeholder="Ingresa tu correo" 
          keyboardType="email-address" 
          autoCapitalize="none" 
          error={errors.email} 
        /> 
         
        <Input  
          label="Contraseña" 
          value={formData.password} 
          onChangeText={(value) => updateField('password', value)} 
          placeholder="Ingresa tu contraseña" 
          secureTextEntry 
          error={errors.password} 
        /> 
         
        <Input  
          label="Confirmar contraseña" 
          value={formData.password_confirmation} 
          onChangeText={(value) => updateField('password_confirmation', value)} 
          placeholder="Confirma tu contraseña" 
          secureTextEntry 
          error={errors.password_confirmation} 
        /> 
         
        <Button  
          title="Registrarse"  
          onPress={handleRegister}  
          loading={loading}  
        /> 
         
        <TouchableOpacity  
          style={styles.loginLink} 
          onPress={() => navigation.navigate('Login')} 
        > 
          <Text style={styles.loginText}> 
            ¿Ya tienes cuenta? <Text style={styles.loginTextBold}>Inicia sesión</Text> 
          </Text> 
        </TouchableOpacity> 
      </View> 
    </ScrollView> 
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
    marginTop: 40, 
    marginBottom: 30, 
  }, 
  title: { 
    fontSize: 28, 
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
  loginLink: { 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 30, 
  }, 
  loginText: { 
    fontSize: 16, 
    color: '#666', 
  }, 
  loginTextBold: { 
    fontWeight: 'bold', 
    color: '#007BFF', 
}, 
}); 
export default RegisterScreen;