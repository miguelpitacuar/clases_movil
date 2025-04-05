import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'; 
import { createTrabajador, updateTrabajador } from '../../api/trabajadores'; 
import { getAllDepartamentos } from '../../api/departamentos'; 
import Input from '../../components/Input'; 
import Button from '../../components/Button'; 
import { Picker } from '@react-native-picker/picker'; 
import Loading from '../../components/Loading'; 
 
const TrabajadorFormScreen = ({ route, navigation }) => { 
  const { trabajador } = route.params || {}; 
  const isEditing = !!trabajador; 
   
  const [formData, setFormData] = useState({ 
    nombre: '', 
    apellido: '', 
    correo: '', 
    telefono: '', 
    direccion: '', 
    id_departamento: '', 
  }); 
   
  const [departamentos, setDepartamentos] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [submitting, setSubmitting] = useState(false); 
  const [errors, setErrors] = useState({}); 
 
  useEffect(() => { 
    const loadDepartamentos = async () => { 
      setLoading(true); 
      try { 
        const data = await getAllDepartamentos(); 
        setDepartamentos(data); 
      } catch (error) { 
        Alert.alert('Error', 'No se pudieron cargar los departamentos'); 
      } finally { 
        setLoading(false); 
      } 
    }; 
 
    loadDepartamentos(); 
 
    if (isEditing) { 
      setFormData({ 
        nombre: trabajador.nombre || '', 
        apellido: trabajador.apellido || '', 
        correo: trabajador.correo || '', 
        telefono: trabajador.telefono || '', 
        direccion: trabajador.direccion || '', 
        id_departamento: trabajador.id_departamento ? trabajador.id_departamento.toString() : '', 
      }); 
    } 
  }, [isEditing, trabajador]); 
 
  const updateField = (field, value) => { 
    setFormData({ 
      ...formData, 
      [field]: value, 
    }); 
  }; 
 
  const validate = () => { 
    let isValid = true; 
    const newErrors = {}; 
 
    if (!formData.nombre.trim()) { 
      newErrors.nombre = 'El nombre es obligatorio'; 
      isValid = false; 
    } 
 
    if (!formData.apellido.trim()) { 
      newErrors.apellido = 'El apellido es obligatorio'; 
      isValid = false; 
    } 
 
    if (!formData.correo.trim()) { 
      newErrors.correo = 'El correo es obligatorio'; 
      isValid = false; 
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) { 
      newErrors.correo = 'El correo no es válido'; 
      isValid = false; 
    } 
 
    if (!formData.id_departamento) { 
      newErrors.id_departamento = 'Debes seleccionar un departamento'; 
      isValid = false; 
    } 
 
    setErrors(newErrors); 
    return isValid; 
  }; 
 
  const handleSubmit = async () => { 
    if (!validate()) return; 
 
    setSubmitting(true); 
    try { 
      if (isEditing) { 
        await updateTrabajador(trabajador.id, formData); 
        Alert.alert('Éxito', 'Trabajador actualizado correctamente'); 
      } else { 
        await createTrabajador(formData); 
        Alert.alert('Éxito', 'Trabajador creado correctamente'); 
      } 
      navigation.goBack(); 
    } catch (error) { 
      console.error(error); 
      Alert.alert( 
        'Error', 
        isEditing  
        ? 'No se pudo actualizar el trabajador'  
        : 'No se pudo crear el trabajador' 
      ); 
    } finally { 
      setSubmitting(false); 
    } 
  }; 
 
  if (loading) { 
    return <Loading />; 
  } 
 
  return ( 
    <ScrollView style={styles.container}> 
      <View style={styles.form}> 
        <Text style={styles.title}> 
          {isEditing ? 'Editar Trabajador' : 'Nuevo Trabajador'} 
        </Text> 
 
        <Input 
          label="Nombre" 
          value={formData.nombre} 
          onChangeText={(value) => updateField('nombre', value)} 
          placeholder="Ingresa el nombre" 
          error={errors.nombre} 
        /> 
 
        <Input 
          label="Apellido" 
          value={formData.apellido} 
          onChangeText={(value) => updateField('apellido', value)} 
          placeholder="Ingresa el apellido" 
          error={errors.apellido} 
        /> 
 
        <Input 
          label="Correo electrónico" 
          value={formData.correo} 
          onChangeText={(value) => updateField('correo', value)} 
          placeholder="Ingresa el correo" 
          keyboardType="email-address" 
          autoCapitalize="none" 
          error={errors.correo} 
        /> 
 
        <Input 
          label="Teléfono" 
          value={formData.telefono} 
          onChangeText={(value) => updateField('telefono', value)} 
          placeholder="Ingresa el teléfono" 
          keyboardType="phone-pad" 
          error={errors.telefono} 
        /> 
 
        <Input 
          label="Dirección" 
          value={formData.direccion} 
          onChangeText={(value) => updateField('direccion', value)} 
          placeholder="Ingresa la dirección" 
          multiline 
          numberOfLines={3} 
          error={errors.direccion} 
        /> 
 
        <View style={styles.pickerContainer}> 
          <Text style={styles.label}>Departamento</Text> 
          <View style={[ 
            styles.pickerWrapper,  
            errors.id_departamento ? styles.pickerError : null 
          ]}> 
            <Picker 
              selectedValue={formData.id_departamento} 
              onValueChange={(value) => updateField('id_departamento', value)} 
              style={styles.picker} 
            > 
              <Picker.Item label="Selecciona un departamento" value="" /> 
              {departamentos.map((depto) => ( 
                <Picker.Item  
                  key={depto.id.toString()} 
                  label={depto.nombre}  
                  value={depto.id.toString()}  
                /> 
              ))} 
            </Picker> 
          </View> 
          {errors.id_departamento && ( 
            <Text style={styles.errorText}>{errors.id_departamento}</Text> 
          )} 
        </View> 
 
        <Button 
          title={isEditing ? 'Actualizar Trabajador' : 'Crear Trabajador'} 
          onPress={handleSubmit} 
          loading={submitting} 
        /> 
 
        <Button 
          title="Cancelar" 
          onPress={() => navigation.goBack()} 
          style={styles.cancelButton} 
          textStyle={styles.cancelButtonText} 
        /> 
      </View> 
    </ScrollView> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
  }, 
  form: { 
    padding: 20, 
  }, 
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333', 
    textAlign: 'center', 
  }, 
  label: { 
    marginBottom: 8, 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333', 
  }, 
  pickerContainer: { 
    marginBottom: 16, 
  }, 
  pickerWrapper: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    backgroundColor: '#f9f9f9', 
    marginBottom: 5, 
    overflow: 'hidden', 
  }, 
  pickerError: { 
    borderColor: '#ff6b6b', 
  }, 
  picker: { 
    height: 50, 
  }, 
  errorText: { 
    color: '#ff6b6b', 
    fontSize: 12, 
    marginTop: 4, 
  }, 
  cancelButton: { 
    backgroundColor: '#f5f5f5', 
    borderWidth: 1, 
    borderColor: '#ddd', 
  }, 
  cancelButtonText: { 
    color: '#666', 
  }, 
}); 
export default TrabajadorFormScreen;