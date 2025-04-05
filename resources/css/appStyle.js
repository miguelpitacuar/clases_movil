import { StyleSheet } from "react-native";

export const appStyles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      texto:{
        color:'red',
        fontSize:30,
        fontWeight:'bold'
      },
      titulo:{
        color:'#b42f12',
        fontSize:15,
      },
      logo:{
        width: 200, // Ancho de la imagen
        height: 200, // Altura de la imagen
      },
      boton_visitanos:{
        padding:500,
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

})