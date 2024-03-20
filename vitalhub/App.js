import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './src/screens/Navigation/Navigation';
import { Login } from './src/screens/Login/Login';
import { ForgotPassword } from './src/screens/ForgotPassword/ForgotPassword';
import { CheckEmail } from './src/screens/CheckEmail/CheckEmail';
import { ResetPassword } from './src/screens/ResetPassword/ResetPassword';
import { CreateAccount } from './src/screens/CreateAccount/CreateAccount';
import { MedicQuery } from './src/screens/MedicQuery/MedicQuery';
import { Image } from 'react-native';
import {Main} from "./src/screens/Main/Main"


//Instancia do stack navigator
const Stack = createNativeStackNavigator();

//Import fonts
import { useFonts, MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from "@expo-google-fonts/montserrat-alternates"
import { Quicksand_500Medium, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand"
import { InsertMedicalRecord } from './src/screens/InsertMedicalRecord/InsertMedicalRecord';
import { PatientQuery } from './src/screens/PatientQuery/PatientQuery';
import { SelectClinic } from './src/screens/SelectClinic/SelectClinic';
import { SelectMedic } from './src/screens/SelectMedic/SelectMedic';
import { SelectDate } from './src/screens/SelectDate/SelectDate';
import { ConsultationLocal } from './src/screens/ConsultationLocal/ConsultationLocal';


export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_500Medium,
    Quicksand_600SemiBold
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  };

  return (
    /*Navegação*/

    //Container
    //StackNavigator
    //StackScreen

    // envolve a estrutura da navegação
    <NavigationContainer>

      {/*Componente para navegação*/}
      <Stack.Navigator>
        {/*    Nome da tela                  componente da tela            titulo*/}
        <Stack.Screen name="Navegacao" component={Navigation} options={{ title: "Navegação" }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Esqueci senha" }} />
        <Stack.Screen name="CheckEmail" component={CheckEmail} options={{ title: "Código E-mail" }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "Redefinir senha" }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title: "Criar conta" }} />
        <Stack.Screen name="MedicQuery" component={MedicQuery} options={{ title: "Médico consulta" }} />
        <Stack.Screen name="InsertMedicalRecord" component={InsertMedicalRecord} options={{ title: "Inserir Prontuário" }} />
        <Stack.Screen name="PatientQuery" component={PatientQuery} options={{ title: "Paciente consulta" }} />
        <Stack.Screen name="SelectClinic" component={SelectClinic} options={{ title: "Selecionar clinica" }} />
        <Stack.Screen name="SelectMedic" component={SelectMedic} options={{ title: "Selecionar medico" }} />
        <Stack.Screen name="SelectDate" component={SelectDate} options={{ title: "Selecionar data" }} />
        <Stack.Screen name="ConsultationLocal" component={ConsultationLocal} options={{ title: "Local da consulta" }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
