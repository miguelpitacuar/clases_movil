import React from 'react'; 
import { StatusBar } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import AppNavigator from './navigation/AppNavigator'; 
import { AuthProvider } from './context/AuthContext'; 
// You may need to import font packages if you're using them 
// import { useFonts } from 'expo-font'; 
// import AppLoading from 'expo-app-loading'; 
export default function App() { 
// If you're using custom fonts, uncomment this block 
/* 
const [fontsLoaded] = useFonts({ 
'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'), 
'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'), 
// Add other fonts as needed 
}); 
if (!fontsLoaded) { 
return <AppLoading />; 
} 
*/ 
return ( 
<SafeAreaProvider> 
<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> 
<AuthProvider> 
<NavigationContainer> 
<AppNavigator /> 
</NavigationContainer> 
</AuthProvider> 
</SafeAreaProvider> 
); 
}