import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'; 
import { getTrabajador, deleteTrabajador } from '../../api/trabajadores'; 
import Loading from '../../components/Loading'; 
import Button from '../../components/Button'; 
import { Ionicons } from '@expo/vector-icons'; 
 
const TrabajadorDetailScreen = ({ route, navigation }) => { 
  const { trabajadorId } = route.params; 
  const [trabajador, setTrabajador] = useState(null); 
  const [loading, setLoading] = useState(true); 
 
  const loadTrabajador = async () => { 
    try { 
      const data = await getTrabajador(trabajadorId); 
      setTrabajador(data); 
    } catch (error) { 
      Alert.alert('Error', 'No se pudo cargar la información del trabajador'); 
      navigation.goBack(); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  useEffect(() => { 
    loadTrabajador(); 
  }, [trabajadorId]); 
 
  const handleEdit = () => { 
    navigation.navigate('TrabajadorForm', { trabajador }); 
  }; 
 
  const handleDelete = () => { 
    Alert.alert( 
      'Confirmar eliminación', 
      '¿Estás seguro de que deseas eliminar este trabajador? Esta acción no se puede deshacer.', 
      [ 
        { text: 'Cancelar', style: 'cancel' }, 
        {  
          text: 'Eliminar',  
          style: 'destructive', 
          onPress: async () => { 
            try { 
              await deleteTrabajador(trabajadorId); 
              Alert.alert('Éxito', 'Trabajador eliminado correctamente'); 
              navigation.goBack(); 
            } catch (error) { 
              Alert.alert('Error', 'No se pudo eliminar el trabajador'); 
            } 
          }  
        }, 
      ] 
    ); 
  }; 
 
  if (loading) { 
    return <Loading />; 
  } 
 
  return ( 
    <ScrollView style={styles.container}> 
      <View style={styles.card}> 
        <View style={styles.header}> 
          <View> 
            <Text style={styles.title}>{trabajador.nombre} {trabajador.apellido}</Text> 
            {trabajador.departamento && ( 
              <Text style={styles.subtitle}> 
                Departamento: {trabajador.departamento.nombre} 
              </Text> 
            )} 
          </View> 
          <View style={styles.actions}> 
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleEdit} 
            > 
              <Ionicons name="create-outline" size={24} color="#007BFF" /> 
            </TouchableOpacity> 
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleDelete} 
            > 
              <Ionicons name="trash-outline" size={24} color="#FF6B6B" /> 
            </TouchableOpacity> 
          </View> 
        </View> 
 
        <View style={styles.infoSection}> 
          <View style={styles.infoRow}> 
            <Text style={styles.infoLabel}>Correo:</Text> 
            <Text style={styles.infoValue}>{trabajador.correo}</Text> 
          </View> 
           
          <View style={styles.infoRow}> 
            <Text style={styles.infoLabel}>Teléfono:</Text> 
            <Text style={styles.infoValue}>{trabajador.telefono || 'No especificado'}</Text> 
          </View> 
           
          <View style={styles.infoRow}> 
            <Text style={styles.infoLabel}>Dirección:</Text> 
            <Text style={styles.infoValue}>{trabajador.direccion || 'No especificada'}</Text> 
          </View> 
        </View> 
      </View> 
 
      <View style={styles.buttonsContainer}> 
        <Button 
          title="Volver a la lista" 
          onPress={() => navigation.goBack()} 
          style={styles.button} 
        /> 
      </View> 
    </ScrollView> 
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
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    paddingBottom: 15, 
  }, 
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5, 
  }, 
  subtitle: { 
    fontSize: 16, 
    color: '#007BFF', 
    marginBottom: 5, 
  }, 
  actions: { 
    flexDirection: 'row', 
  }, 
  iconButton: { 
    marginLeft: 15, 
    padding: 5, 
  }, 
  infoSection: { 
    marginBottom: 20, 
  }, 
  infoRow: { 
    flexDirection: 'row', 
    marginBottom: 12, 
  }, 
  infoLabel: { 
fontWeight: 'bold', 
width: 100, 
fontSize: 16, 
color: '#555', 
}, 
infoValue: { 
flex: 1, 
fontSize: 16, 
color: '#333', 
}, 
buttonsContainer: { 
marginBottom: 30, 
}, 
button: { 
marginVertical: 10, 
}, 
}); 
export default TrabajadorDetailScreen;