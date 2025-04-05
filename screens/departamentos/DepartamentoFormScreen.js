import React, { useState, useEffect } from 'react'; 
import {  
View,  
Text,  
StyleSheet,  
ScrollView,  
Alert,  
TextInput, 
KeyboardAvoidingView, 
Platform 
} from 'react-native'; 
import {  
createDepartamento,  
updateDepartamento,  
getDepartamento  
} from '../../api/departamentos'; 
import Loading from '../../components/Loading'; 
import Button from '../../components/Button'; 
const DepartamentoFormScreen = ({ route, navigation }) => { 
// Check if we're editing an existing departamento or creating a new one 
const editMode = route.params?.departamento ? true : false; 
const departamentoId = route.params?.departamento?.id; 
const [formData, setFormData] = useState({ 
nombre: '', 
descripcion: '', 
ubicacion: '', 
presupuesto: '', 
responsable: '', 
// Add other fields as needed 
}); 
const [loading, setLoading] = useState(editMode); 
const [submitting, setSubmitting] = useState(false); 
const [errors, setErrors] = useState({}); 
useEffect(() => { 
if (editMode) { 
loadDepartamento(); 
    } 
  }, []); 
 
  const loadDepartamento = async () => { 
    try { 
      const data = await getDepartamento(departamentoId); 
      setFormData({ 
        nombre: data.nombre || '', 
        descripcion: data.descripcion || '', 
        ubicacion: data.ubicacion || '', 
        presupuesto: data.presupuesto?.toString() || '', 
        responsable: data.responsable || '', 
        // Initialize other fields 
      }); 
    } catch (error) { 
      Alert.alert('Error', 'No se pudo cargar la información del departamento'); 
      navigation.goBack(); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  const validateForm = () => { 
    const newErrors = {}; 
     
    if (!formData.nombre.trim()) { 
      newErrors.nombre = 'El nombre es obligatorio'; 
    } 
     
    // Add other validations as needed 
    // For example: 
    if (formData.presupuesto && isNaN(Number(formData.presupuesto))) { 
      newErrors.presupuesto = 'El presupuesto debe ser un número'; 
    } 
     
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  }; 
 
  const handleChange = (field, value) => { 
    setFormData({ 
      ...formData, 
      [field]: value 
    }); 
    // Clear error when user types 
    if (errors[field]) { 
      setErrors({ 
        ...errors, 
        [field]: null 
      }); 
    } 
  }; 
 
  const handleSubmit = async () => { 
    if (!validateForm()) { 
      return; 
    } 
     
    setSubmitting(true); 
     
    try { 
      const dataToSend = { 
        ...formData, 
        presupuesto: formData.presupuesto ? Number(formData.presupuesto) : undefined, 
      }; 
       
      if (editMode) { 
        await updateDepartamento(departamentoId, dataToSend); 
        Alert.alert('Éxito', 'Departamento actualizado correctamente'); 
      } else { 
        await createDepartamento(dataToSend); 
        Alert.alert('Éxito', 'Departamento creado correctamente'); 
      } 
       
      navigation.goBack(); 
    } catch (error) { 
      const errorMsg = editMode ?  
        'No se pudo actualizar el departamento' :  
        'No se pudo crear el departamento'; 
      Alert.alert('Error', errorMsg); 
    } finally { 
      setSubmitting(false); 
    } 
  }; 
 
  if (loading) { 
    return <Loading />; 
  } 
 
  return ( 
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }} 
    > 
      <ScrollView style={styles.container}> 
        <View style={styles.card}> 
          <Text style={styles.title}> 
            {editMode ? 'Editar Departamento' : 'Nuevo Departamento'} 
          </Text> 
           
          <View style={styles.formGroup}> 
            <Text style={styles.label}>Nombre *</Text> 
            <TextInput 
              style={[styles.input, errors.nombre && styles.inputError]} 
              value={formData.nombre} 
              onChangeText={(value) => handleChange('nombre', value)} 
              placeholder="Nombre del departamento" 
            /> 
            {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>} 
          </View> 
 
          <View style={styles.formGroup}> 
            <Text style={styles.label}>Descripción</Text> 
            <TextInput 
              style={styles.input} 
              value={formData.descripcion} 
              onChangeText={(value) => handleChange('descripcion', value)} 
              placeholder="Descripción del departamento" 
              multiline 
              numberOfLines={3} 
            /> 
          </View> 
 
          <View style={styles.formGroup}> 
            <Text style={styles.label}>Ubicación</Text> 
            <TextInput 
              style={styles.input} 
              value={formData.ubicacion} 
              onChangeText={(value) => handleChange('ubicacion', value)} 
              placeholder="Ubicación física" 
            /> 
          </View> 
 
          <View style={styles.formGroup}> 
            <Text style={styles.label}>Presupuesto</Text> 
            <TextInput 
              style={[styles.input, errors.presupuesto && styles.inputError]} 
              value={formData.presupuesto} 
              onChangeText={(value) => handleChange('presupuesto', value)} 
              placeholder="Presupuesto asignado" 
              keyboardType="numeric" 
            /> 
            {errors.presupuesto && <Text style={styles.errorText}>{errors.presupuesto}</Text>} 
          </View> 
 
          <View style={styles.formGroup}> 
            <Text style={styles.label}>Responsable</Text> 
            <TextInput 
              style={styles.input} 
              value={formData.responsable} 
              onChangeText={(value) => handleChange('responsable', value)} 
              placeholder="Nombre del responsable" 
            /> 
          </View> 
 
          <View style={styles.buttonsContainer}> 
            <Button 
              title={editMode ? "Actualizar" : "Crear"} 
              onPress={handleSubmit} 
              disabled={submitting} 
              loading={submitting} 
              style={styles.saveButton} 
            /> 
            <Button 
              title="Cancelar" 
              onPress={() => navigation.goBack()} 
              type="secondary" 
              style={styles.cancelButton} 
              disabled={submitting} 
            /> 
          </View> 
        </View> 
      </ScrollView> 
    </KeyboardAvoidingView> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    padding: 15, 
  }, 
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 20, 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2, 
  }, 
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 25, 
    color: '#333', 
    textAlign: 'center', 
  }, 
  formGroup: { 
    marginBottom: 20, 
  }, 
  label: { 
    fontSize: 16, 
    marginBottom: 8, 
    color: '#555', 
    fontWeight: '500', 
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    backgroundColor: '#fafafa', 
  }, 
  inputError: { 
    borderColor: '#FF6B6B', 
  }, 
  errorText: { 
    color: '#FF6B6B', 
    marginTop: 5, 
    fontSize: 14, 
  }, 
  buttonsContainer: { 
    marginTop: 10, 
  }, 
  saveButton: { 
    marginBottom: 10, 
  }, 
cancelButton: { 
marginBottom: 20, 
}, 
}); 
export default DepartamentoFormScreen;