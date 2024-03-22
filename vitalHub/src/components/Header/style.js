import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const LinearGradienteHeader = styled(LinearGradient).attrs({
  colors:['#60BFC5',  '#496BBA' ],
  start:{x:0,y:0},
  end:{x:1,y:1} 
})`
  border-radius: 0 0 15px 15px;
  width:100%;
  height:100%;
`