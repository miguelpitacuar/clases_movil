import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'; 
import { useAuth } from '../../context/AuthContext'; 
import Loading from '../../components/Loading'; 
import Button from '../../components/Button'; 
import { getAllTrabajadores } from '../../api/trabajadores'; 
import { Ionicons } from '@expo/vector-icons'; 
 
const TrabajadoresScreen = ({ navigation }) => { 
  const [trabajadores, setTrabajadores] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false); 
   
  const { logout } = useAuth(); 
 
  const loadTrabajadores = async () => { 
    setLoading(true); 
    try { 
      const data = await getAllTrabajadores(); 
      setTrabajadores(data); 
    } catch (error) { 
      Alert.alert('Error', 'No se pudieron cargar los trabajadores'); 
      console.error(error); 
    } finally { 
      setLoading(false); 
      setRefreshing(false); 
    } 
  }; 
 
  useEffect(() => { 
    const unsubscribe = navigation.addListener('focus', () => { 
      loadTrabajadores(); 
    }); 
 
    return unsubscribe; 
  }, [navigation]); 
 
  const handleRefresh = () => { 
    setRefreshing(true); 
    loadTrabajadores(); 
  }; 
 
  const handleLogout = async () => { 
    try { 
      await logout(); 
    } catch (error) { 
      Alert.alert('Error', 'No se pudo cerrar sesión'); 
    } 
  }; 
 
  const renderItem = ({ item }) => ( 
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('TrabajadorDetail', { trabajadorId: item.id })} 
    > 
      <View style={styles.cardContent}> 
        <View> 
          <Text style={styles.cardTitle}>{item.nombre} {item.apellido}</Text> 
          <Text style={styles.cardSubtitle}>{item.correo}</Text> 
          {item.departamento && ( 
            <Text style={styles.departamento}>Dept: {item.departamento.nombre}</Text> 
          )} 
        </View> 
        <Ionicons name="chevron-forward" size={24} color="#007BFF" /> 
      </View> 
    </TouchableOpacity> 
  ); 
 
  if (loading && !refreshing) { 
    return <Loading />; 
  } 
 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
        <Text style={styles.title}>Trabajadores</Text> 
        <View style={styles.actions}> 
          <TouchableOpacity  
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Departamentos')} 
          > 
            <Ionicons name="business-outline" size={24} color="#007BFF" /> 
          </TouchableOpacity> 
          <TouchableOpacity  
            style={styles.iconButton} 
            onPress={handleLogout} 
          > 
            <Ionicons name="log-out-outline" size={24} color="#FF6B6B" /> 
          </TouchableOpacity> 
        </View> 
      </View> 
 
      <FlatList 
        data={trabajadores} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem} 
        contentContainerStyle={styles.list} 
        refreshing={refreshing} 
        onRefresh={handleRefresh} 
        ListEmptyComponent={ 
          <View style={styles.emptyContainer}> 
            <Text style={styles.emptyText}>No hay trabajadores registrados</Text> 
          </View> 
        } 
      /> 
 
      <TouchableOpacity  
        style={styles.fab} 
        onPress={() => navigation.navigate('TrabajadorForm')} 
      > 
        <Ionicons name="add" size={24} color="#fff" /> 
      </TouchableOpacity> 
    </View> 
  ); 
}; 
const styles = StyleSheet.create({ 
container: { 
flex: 1, 
backgroundColor: '#f5f5f5', 
}, 
header: { 
flexDirection: 'row', 
justifyContent: 'space-between', 
alignItems: 'center', 
padding: 15, 
borderBottomWidth: 1, 
borderBottomColor: '#ddd', 
backgroundColor: '#fff', 
}, 
title: { 
fontSize: 20, 
fontWeight: 'bold', 
color: '#333', 
}, 
actions: { 
flexDirection: 'row', 
}, 
iconButton: { 
marginLeft: 15, 
padding: 5, 
}, 
list: { 
    padding: 15, 
  }, 
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 15, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2, 
  }, 
  cardContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  }, 
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4, 
  }, 
  cardSubtitle: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 4, 
  }, 
  departamento: { 
    fontSize: 14, 
    color: '#007BFF', 
  }, 
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 50, 
  }, 
  emptyText: { 
    fontSize: 16, 
    color: '#666', 
    textAlign: 'center', 
  }, 
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#007BFF', 
    borderRadius: 28, 
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
  }, 
}); 
 
export default TrabajadoresScreen;