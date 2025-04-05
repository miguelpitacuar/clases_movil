import React from 'react'; 
import { View, TextInput, Text, StyleSheet } from 'react-native'; 
const Input = ({  
label,  
value,  
onChangeText,  
placeholder,  
secureTextEntry, 
error, 
keyboardType = 'default', 
...props  
}) => { 
return ( 
<View style={styles.container}> 
      {label && <Text style={styles.label}>{label}</Text>} 
      <TextInput  
        style={[styles.input, error && styles.errorInput]} 
        value={value} 
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        secureTextEntry={secureTextEntry} 
        keyboardType={keyboardType} 
        {...props} 
      /> 
      {error && <Text style={styles.errorText}>{error}</Text>} 
    </View> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    marginBottom: 16, 
  }, 
  label: { 
    marginBottom: 8, 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333', 
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 10, 
fontSize: 16, 
borderRadius: 8, 
backgroundColor: '#f9f9f9', 
}, 
errorInput: { 
borderColor: '#ff6b6b', 
}, 
errorText: { 
color: '#ff6b6b', 
fontSize: 12, 
marginTop: 4, 
}, 
}); 
export default Input;