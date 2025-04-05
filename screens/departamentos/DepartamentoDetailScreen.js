import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'; 
import { getDepartamento, deleteDepartamento } from '../../api/departamentos'; 
import { getTrabajadoresByDepartamento } from '../../api/trabajadores'; 
import Loading from '../../components/Loading'; 
import Button from '../../components/Button'; 
import { Ionicons } from '@expo/vector-icons'; 
 
const DepartamentoDetailScreen = ({ route, navigation }) => { 
  const { departamentoId } = route.params; 
  const [departamento, setDepartamento] = useState(null); 
  const [trabajadores, setTrabajadores] = useState([]); 
  const [loading, setLoading] = useState(true); 
 
  const loadData = async () => { 
    try { 
      const deptoData = await getDepartamento(departamentoId); 
      setDepartamento(deptoData); 
       
      // Esta API debe ser implementada en tu backend 
      // Para obtener trabajadores por departamento 
      const trabajadoresData = await getTrabajadoresByDepartamento(departamentoId); 
      setTrabajadores(trabajadoresData); 
    } catch (error) { 
      Alert.alert('Error', 'No se pudo cargar la información del departamento'); 
      navigation.goBack(); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  useEffect(() => { 
    loadData(); 
  }, [departamentoId]); 
 
  const handleEdit = () => { 
    navigation.navigate('DepartamentoForm', { departamento }); 
  }; 
 
  const handleDelete = () => { 
    Alert.alert( 
      'Confirmar eliminación',
  '¿Estás seguro de que deseas eliminar este departamento? ' +
  'Esta acción podría afectar a los trabajadores asociados.',

      [ 
        { text: 'Cancelar', style: 'cancel' }, 
        {  
          text: 'Eliminar',  
          style: 'destructive', 
          onPress: async () => { 
            try { 
              await deleteDepartamento(departamentoId); 
              Alert.alert('Éxito', 'Departamento eliminado correctamente'); 
              navigation.goBack(); 
            } catch (error) { 
              Alert.alert('Error', 'No se pudo eliminar el departamento'); 
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
          <Text style={styles.title}>{departamento.nombre}</Text> 
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
          <Text style={styles.sectionTitle}>Trabajadores en este departamento</Text> 
           
          {trabajadores.length > 0 ? ( 
            trabajadores.map((trabajador) => ( 
              <TouchableOpacity 
                key={trabajador.id} 
                style={styles.trabajadorItem} 
                onPress={() => navigation.navigate('TrabajadorDetail', { trabajadorId: trabajador.id })} 
              > 
                <Text style={styles.trabajadorName}> 
                  {trabajador.nombre} {trabajador.apellido} 
                </Text> 
                <Ionicons name="chevron-forward" size={20} color="#007BFF" /> 
              </TouchableOpacity> 
            )) 
          ) : ( 
            <Text style={styles.emptyText}>No hay trabajadores en este departamento</Text> 
          )} 
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
  }, 
  actions: { 
    flexDirection: 'row', 
  }, 
  iconButton: { 
    padding: 8, 
    marginLeft: 10, 
  }, 
  infoSection: { 
    marginBottom: 20, 
  }, 
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 15, 
    color: '#333', 
  }, 
  trabajadorItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
  }, 
  trabajadorName: { 
    fontSize: 16, 
    color: '#444', 
}, 
emptyText: { 
fontSize: 16, 
color: '#888', 
fontStyle: 'italic', 
textAlign: 'center', 
marginVertical: 20, 
}, 
buttonsContainer: { 
marginBottom: 30, 
}, 
button: { 
marginVertical: 8, 
}, 
}); 
export default DepartamentoDetailScreen; 