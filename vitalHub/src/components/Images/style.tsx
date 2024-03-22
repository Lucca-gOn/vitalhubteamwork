import styled from "styled-components/native";
import { Image } from 'expo-image'

interface ImageUserProps {
  $width: string;
  $height: string;
  $borderRadius: string;
}

export const ImageUser = styled(Image)<ImageUserProps>`
  width: ${props => props.$width !== undefined ? `${props.$width}` : '60px'};
  height: ${props => props.$height !== undefined ? `${props.$height}` : '60px'};
  border-radius: ${props => props.$borderRadius !== undefined ? `${props.$borderRadius}` : '5px'};
  
`