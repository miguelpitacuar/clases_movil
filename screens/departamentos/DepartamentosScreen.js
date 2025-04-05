import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'; 
import { getAllDepartamentos } from '../../api/departamentos'; 
import Loading from '../../components/Loading'; 
import { Ionicons } from '@expo/vector-icons'; 
 
const DepartamentosScreen = ({ navigation }) => { 
  const [departamentos, setDepartamentos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false); 
 
  const loadDepartamentos = async () => { 
    setLoading(true); 
    try { 
      const data = await getAllDepartamentos(); 
      setDepartamentos(data); 
    } catch (error) { 
      Alert.alert('Error', 'No se pudieron cargar los departamentos'); 
      console.error(error); 
    } finally { 
      setLoading(false); 
      setRefreshing(false); 
    } 
  }; 
 
  useEffect(() => { 
    const unsubscribe = navigation.addListener('focus', () => { 
      loadDepartamentos(); 
    }); 
 
    return unsubscribe; 
  }, [navigation]); 
 
  const handleRefresh = () => { 
    setRefreshing(true); 
    loadDepartamentos(); 
  }; 
 
  const renderItem = ({ item }) => ( 
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('DepartamentoDetail', { departamentoId: item.id })} 
    > 
      <View style={styles.cardContent}> 
        <Text style={styles.cardTitle}>{item.nombre}</Text> 
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
        <Text style={styles.title}>Departamentos</Text> 
        <TouchableOpacity  
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Trabajadores')} 
        > 
          <Ionicons name="people-outline" size={24} color="#007BFF" /> 
        </TouchableOpacity> 
      </View> 
 
      <FlatList 
        data={departamentos} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem} 
        contentContainerStyle={styles.list} 
        refreshing={refreshing} 
        onRefresh={handleRefresh} 
        ListEmptyComponent={ 
          <View style={styles.emptyContainer}> 
            <Text style={styles.emptyText}>No hay departamentos registrados</Text> 
          </View> 
        } 
      /> 
 
      <TouchableOpacity  
        style={styles.fab} 
        onPress={() => navigation.navigate('DepartamentoForm')} 
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
iconButton: { 
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
export default DepartamentosScreen;