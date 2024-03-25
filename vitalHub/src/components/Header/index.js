import { ContainerHeader, ContainerMargin } from "../Conatainer";
import { ImageUser } from "../Images/style";
import { TextNameUserWhite, TitleHeader } from "../Texts/style";
import { LinearGradienteHeader } from "./style";
import { Ionicons } from '@expo/vector-icons';
//import do decode token 
import { userDecodeToken } from '../../utils/Auth';
import { useEffect, useState } from "react";

export const Header = (
  {
  
  }
) => {

  const [profile, setProfile] = useState({})

  async function profileLoad(){
    const token = await userDecodeToken();

    setProfile(token);
  }

  useEffect(() => {
    profileLoad();
  }, [])
  return (
    <ContainerHeader>
      <LinearGradienteHeader>
        <ContainerMargin $fd="row" $justContent="space-between" $width="100%" $pd="62px 5% 22px 5%">
          <ContainerMargin $fd="row" $gap={10} $width="auto">
            <ImageUser source={{ uri: 'https://github.com/AllanR1991.png' }} />
            <ContainerMargin $alingItens="flex-start" $justContent="flex-start" $width="auto" $gap={3}>
              <TitleHeader>Bem vindo!</TitleHeader>
              <TextNameUserWhite>{profile.name}</TextNameUserWhite>
            </ContainerMargin>
          </ContainerMargin>

          <Ionicons name="notifications" size={24} color="white" />
        </ContainerMargin>
      </LinearGradienteHeader>
    </ContainerHeader>
  )
}