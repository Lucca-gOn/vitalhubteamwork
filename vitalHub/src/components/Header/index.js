import { ContainerHeader, ContainerMargin } from "../Conatainer";
import { ImageUser } from "../Images/style";
import { TextNameUserWhite, TitleHeader } from "../Texts/style";
import { LinearGradienteHeader } from "./style";
import { Ionicons } from '@expo/vector-icons';
//import do decode token 
import { userDecodeToken } from '../../utils/Auth';
import { useEffect, useState } from "react";
import {TouchableOpacity} from 'react-native'

export const Header = (
  {
   navigation,
   name,
   role,
   foto
  }
) => {
 
  return (
    <ContainerHeader>
      <LinearGradienteHeader>
        <ContainerMargin $fd="row" $justContent="space-between" $width="100%" $pd="62px 5% 22px 5%">
          <ContainerMargin $fd="row" $gap={10} $width="auto">
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{flexDirection:"row", gap: 10, alignItems: "center"}}>
            <ImageUser source={{ uri: foto }} />
            <ContainerMargin $alingItens="flex-start" $justContent="flex-start" $width="auto" $gap={3}>
              <TitleHeader>Bem vindo!</TitleHeader>
              <TextNameUserWhite>{role !== 'Paciente'? 'Dr(ª) '+ name: name}</TextNameUserWhite>
            </ContainerMargin>
            </TouchableOpacity>
          </ContainerMargin>

          <Ionicons name="notifications" size={24} color="white" />
        </ContainerMargin>
      </LinearGradienteHeader>
    </ContainerHeader>
  )
}