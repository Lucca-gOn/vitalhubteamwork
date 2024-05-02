// Importar o recurso do bottom tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const BottomTab = createBottomTabNavigator()

// Importando as telas


import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { ContentIcon, TextIcon } from './style'
import Home from '../Home'
import Profile from '../Profile'



export const Main = ({
  route
}) => {  
  return (
    <BottomTab.Navigator
      // Definir a rota inicial
      initialRouteName="Home"

      screenOptions={ ({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height : 80, paddingTop: 10 },
        tabBarActiveBackgroundColor : "transparent",
        tabBarShowLabel : false,
        headerShown: false,

        tabBarIcon : ({ focused }) => {

          if( route.name === "Home" )
          {
            return (
              <ContentIcon 
                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent" }
              >
                <FontAwesome name='calendar' size={18} color="#4E4B59" />
                { focused && <TextIcon>Agenda</TextIcon> }
              </ContentIcon>
            )
          }else{
            return (
              <ContentIcon 
                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent" }
              >
                <FontAwesome5 name='user-circle' size={22} color="#4E4B59" />
                { focused && <TextIcon>Perfil</TextIcon> }
              </ContentIcon>
            )
          }
        }
      }) }
    >
      
      <BottomTab.Screen 
        name="Home"
        component={ Home }
        initialParams={{
          dateConsulta: route.params && route.params.dateConsulta? route.params.dateConsulta : null,
          situacaoSelecionada: route.params && route.params.situacaoSelecionada? route.params.situacaoSelecionada : 'Agendadas'          
          }}
      />

      <BottomTab.Screen 
        name="Perfil"
        component={ Profile }
        
      />
    </BottomTab.Navigator>
  )
}
//{"dateConsulta": "2024-04-03", "situacaoSelecionada": "Realizadas"}