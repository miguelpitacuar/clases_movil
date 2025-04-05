import React from 'react'; 
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'; 
const Loading = ({ message = 'Cargando...' }) => { 
return ( 
<View style={styles.container}> 
<ActivityIndicator size="large" color="#007BFF" /> 
<Text style={styles.message}>{message}</Text> 
</View> 
); 
}; 
const styles = StyleSheet.create({ 
container: { 
flex: 1, 
justifyContent: 'center', 
alignItems: 'center', 
backgroundColor: '#f5f5f5', 
}, 
message: { 
marginTop: 10, 
fontSize: 16, 
color: '#333', 
}, 
}); 
export default Loading;