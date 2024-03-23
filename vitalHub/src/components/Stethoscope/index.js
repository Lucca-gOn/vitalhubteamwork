import { ButtonStethoscope } from "../Buttons/style";
import { ContainerMargin } from "../Conatainer"
import { FontAwesome6 } from '@expo/vector-icons';

export const Stethoscope = ({
  onPress
}) => {
  return (
    <ButtonStethoscope onPress={onPress}>
          <FontAwesome6 name="stethoscope" size={32} color="#FFF" />
    </ButtonStethoscope>
    
  )
}