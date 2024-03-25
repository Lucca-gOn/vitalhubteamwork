import AsyncStorage from "@react-native-async-storage/async-storage";
//biblioteca para decodificar a chave (token)  npm i jwt-decode
import { jwtDecode } from "jwt-decode";
//oferece funcionalidades para codificação e decodificação de dados em formato Base64
import { decode, encode} from 'base-64'

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

//atob: Esta função decodifica uma string de dados que foi codificada usando a codificação base64.
//btoa: Esta função codifica uma string de texto em uma string base64.

//Funcao de decodificar o token
export const userDecodeToken = async () => {
    //Capturar o token
    const token = await AsyncStorage.getItem('token');

    if (token === null) {
      return null;  
    }

    //Descriptografando o token
    const decoded = jwtDecode(token)

    return{
        role : decoded.role,
        name : decoded.name,
        email : decoded.email
    }
}
