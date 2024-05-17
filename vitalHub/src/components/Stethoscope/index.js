import { View } from "react-native";
import { ButtonStethoscope } from "../Buttons/style";
import { ContainerMargin } from "../Conatainer"
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export const Stethoscope = ({
  onPress
}) => {
  return (
    <ButtonStethoscope onPress={onPress} style={{gap:5}}>
    {/* <View style={{position:"relative"}}>
          <FontAwesome name="plus-circle" size={15} color="#FFF" style={{position:"absolute",bottom:-5,left:-5 }}/>
          <FontAwesome6 name="stethoscope" size={32} color="#FFF" />

    </View> */}
    <FontAwesome5 name="notes-medical" size={30} color="#FFF" />
    </ButtonStethoscope>
    
  )
}