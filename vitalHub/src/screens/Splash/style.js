import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";


export const LinearGradienteSplash = styled(LinearGradient).attrs({
  colors:['#49B3BA', '#496BBA'] ,
})`
  justify-content:center;
  align-items:center; 
  width:100%;   
  height:100%;
`

export const  LogoBrandWhite = styled.Image.attrs({
  source: require('../../assets/images/VitalHub_Logo_Branco.png')
})`
  width:300px;
  height: 180px;
  object-fit:contain;
`