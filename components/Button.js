import React from 'react'; 
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'; 
 
const Button = ({ title, onPress, loading, style, textStyle, disabled }) => { 
  return ( 
    <TouchableOpacity  
      style={[styles.button, disabled && styles.disabled, style]}  
      onPress={onPress} 
      disabled={loading || disabled} 
    > 
      {loading ? ( 
        <ActivityIndicator color="#fff" /> 
      ) : ( 
        <Text style={[styles.text, textStyle]}>{title}</Text> 
      )} 
    </TouchableOpacity> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  button: { 
    backgroundColor: '#007BFF', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 10, 
}, 
text: { 
color: '#fff', 
fontSize: 16, 
fontWeight: 'bold', 
}, 
disabled: { 
backgroundColor: '#CCCCCC', 
}, 
}); 
export default Button;