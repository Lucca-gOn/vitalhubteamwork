import { useFonts, MontserratAlternates_500Medium, MontserratAlternates_600SemiBold, MontserratAlternates_700Bold } from "@expo-google-fonts/montserrat-alternates";
import { Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import RecoveryPassWord from "./src/screens/RecoveryPassword";
import CheckEmail from "./src/screens/CheckEmail";
import NewPassword from "./src/screens/NewPassword";
import CreateAccount from "./src/screens/CreateAccount";
import Home from "./src/screens/Home";

import SelectClinic from "./src/screens/SelectClinic";
import MedicalRecord from "./src/screens/MedicalRecord";

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold
  })

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown:false}}
      >

        <Stack.Screen name='Splash' component={Splash}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='RecoveryPassWord' component={RecoveryPassWord}/>
        <Stack.Screen name='CheckEmail' component={CheckEmail}/>
        <Stack.Screen name='NewPassword' component={NewPassword}/>
        <Stack.Screen name='CreateAccount' component={CreateAccount}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='MedicalRecord' component={MedicalRecord}/>
        <Stack.Screen name='SelectClinic' component={SelectClinic}/>

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
