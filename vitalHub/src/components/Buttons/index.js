import { ActivityIndicator } from "react-native";
import { TextButtonBlue, TextButtonGoogle, TextNotSelect, TextSelect, TextSelectGreen, TextWhiteMontBold } from "../Texts/style"
import { ButtonBlueStyle, ButtonGoogleStyle, ButtonGrayStyle, ButtonGreenStyle, ButtonNotSelectStyle, ButtonSelectGreenStyle, ButtonSelectStyle } from "./style"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ButtonDefault = ({
  onPress,
  textButton = '',
  statusResponse
}) => {
  return (
    <>
      <ButtonBlueStyle onPress={onPress}>
        <TextButtonBlue>{statusResponse ? <ActivityIndicator /> : textButton}</TextButtonBlue>
      </ButtonBlueStyle>
    </>
  )
}

export const ButtonGray = ({
  onPress,
  textButton = '',
}) => {
  return (
    <ButtonGrayStyle onPress={onPress}>
      <TextButtonBlue>{textButton}</TextButtonBlue>
    </ButtonGrayStyle>
  )
}

export const ButtonGoogle = ({
  textButton = '',
  onPress,
  statusResponse
}) => {
  return (
    <>
      <ButtonGoogleStyle onPress={onPress}>
        {statusResponse ?
          <TextButtonGoogle><ActivityIndicator /></TextButtonGoogle>
          : <>
            <AntDesign name="google" size={16} color="#496BBA" />
            <TextButtonGoogle>{textButton}</TextButtonGoogle>
          </>


        }
      </ButtonGoogleStyle>
    </>
  )
}

export const ButtonSelect = ({
  onPress,
  texto,
  selectStatus
}) => {
  return (
    <ButtonSelectStyle selectStatus={selectStatus} onPress={onPress}>
      <TextSelect selectStatus={selectStatus}>{texto}</TextSelect>
    </ButtonSelectStyle>
  )
}

export const ButtonSelectGreen = ({
  onPress,
  texto,
  selectStatus
}) => {
  return (
    <ButtonSelectGreenStyle selectStatus={selectStatus} onPress={onPress}>
      <TextSelectGreen selectStatus={selectStatus}>{texto}</TextSelectGreen>
    </ButtonSelectGreenStyle>
  )
}

export const ButtonGreen = ({
  onPress
}) => {
  return (
    <ButtonGreenStyle onPress={onPress}>
      <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
      <TextWhiteMontBold>Enviar</TextWhiteMontBold>
    </ButtonGreenStyle>
  )
}