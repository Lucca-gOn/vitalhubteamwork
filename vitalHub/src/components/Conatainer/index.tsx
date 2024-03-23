import { StatusBar } from "react-native";
import styled, { css } from "styled-components/native";

const heigthStatusBar = StatusBar.currentHeight;
// console.log(heigthStatusBar);

export interface ContainerMarginProps {
  $margin?: string;
  $mt?: number;
  $mb?: number;
  $ml?: number;
  $mr?: number;
  $gap?: number;
  $fd?: string;
  $pd?: string;
  $pdL?: number;
  $pdR?: number;
  $pdB?: number;
  $pdT?: number;
  $justContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $alingItens?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  $width?: string;
  $height?: string;
  $bgColor?: "";
  $borderRadius?: number;
}

interface ContainerProps {
  $justContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $alingItens?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  $pdT?: number;
  $bgColor?: "";
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  justify-content: ${({ $justContent }) =>
    $justContent !== undefined ? `${$justContent}` : "start"};
  align-items: ${({ $alingItens }) =>
    $alingItens !== undefined ? `${$alingItens}` : "center"};
  padding-top: ${({ $pdt }) => ($pdt !== undefined ? `${$pdt}px` : `0px`)};
  background-color: ${({ $bgColor }) => ($bgColor !== undefined ? `${$bgColor}` : '#FAFAFA')};
`;

export const ContainerMarginStatusBar = styled(Container)`
  padding-top: ${({ $mt }) => $mt !== undefined ? `${$mt}px` : `${heigthStatusBar}px`};
`

export const ContainerSafeArea = styled.SafeAreaView<ContainerMarginProps>`
  flex-basis: content;
  padding: ${({ $pd }) => ($pd !== undefined ? $pd : "0px")};
  margin: ${({ $margin }) => ($margin !== undefined ? $margin : "0px")};
  margin-top: ${({ $mt }) =>
    $mt !== undefined ? `${$mt}px` : `${heigthStatusBar}px`};
  margin-bottom: ${({ $mb }) => ($mb !== undefined ? `${$mb}px` : "0px")};
  margin-left: ${({ $ml }) => ($ml !== undefined ? `${$ml}px` : "0px")};
  margin-right: ${({ $mr }) => ($mr !== undefined ? `${$mr}px` : "0px")};
  gap: ${({ $gap }) => ($gap !== undefined ? `${$gap}px` : "0px")};
  flex-direction: ${({ $fd }) => ($fd !== undefined ? `${$fd}` : "column")};
  width: ${({ $width }) => ($width !== undefined ? `${$width}` : "100%")};
  height: ${({ $height }) => ($height !== undefined ? `${$height}` : "auto")};
  justify-content: ${({ $justContent }) =>
    $justContent !== undefined ? `${$justContent}` : "center"};
  align-items: ${({ $alingItens }) =>
    $alingItens !== undefined ? `${$alingItens}` : "center"};
  background-color: ${({ $bgColor }) =>
    $bgColor !== undefined ? `${$bgColor}` : "transparente"};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius !== undefined ? `${$borderRadius}px` : "0px"};
`;

export const ContainerMargin = styled.View<ContainerMarginProps>`
  padding: ${({ $pd }) => ($pd !== undefined ? $pd : "0px")};
  margin: ${({ $margin }) => ($margin !== undefined ? $margin : "0px")};
  margin-top: ${({ $mt }) => ($mt !== undefined ? `${$mt}px` : "0px")};
  margin-bottom: ${({ $mb }) => ($mb !== undefined ? `${$mb}px` : "0px")};
  margin-left: ${({ $ml }) => ($ml !== undefined ? `${$ml}px` : "0px")};
  margin-right: ${({ $mr }) => ($mr !== undefined ? `${$mr}px` : "0px")};
  gap: ${({ $gap }) => ($gap !== undefined ? `${$gap}px` : "0px")};
  flex-direction: ${({ $fd }) => ($fd !== undefined ? `${$fd}` : "column")};
  width: ${({ $width }) => ($width !== undefined ? `${$width}` : "90%")};
  height: ${({ $height }) => ($height !== undefined ? `${$height}` : "auto")};
  justify-content: ${({ $justContent }) =>
    $justContent !== undefined ? `${$justContent}` : "center"};
  align-items: ${({ $alingItens }) =>
    $alingItens !== undefined ? `${$alingItens}` : "center"};
  background-color: ${({ $bgColor }) =>
    $bgColor !== undefined ? `${$bgColor}` : "transparente"};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius !== undefined ? `${$borderRadius}px` : "0px"};
`;

interface ContainerScrollViewProps {
  $margin?: string;
  $mt?: number;
  $mb?: number;
  $ml?: number;
  $mr?: number;
  $gap?: number;
  $fd?: string;
  $width?: string;
}

export const ContainerScrollView = styled.ScrollView.attrs<ContainerScrollViewProps>(
  (props) => ({
    contentContainerStyle: {
      justifyContent: props.$justContent || "center",
      alignItems: props.$alingItens || "center",
    },
  })
)`
  flex: 1;
  margin: ${({ $margin }) => ($margin !== undefined ? $margin : "0px")};
  margin-top: ${({ $mt }) => ($mt !== undefined ? `${$mt}px` : "0px")};
  margin-bottom: ${({ $mb }) => ($mb !== undefined ? `${$mb}px` : "0px")};
  margin-left: ${({ $ml }) => ($ml !== undefined ? `${$ml}px` : "0px")};
  margin-right: ${({ $mr }) => ($mr !== undefined ? `${$mr}px` : "0px")};
  gap: ${({ $gap }) => ($gap !== undefined ? `${$gap}px` : "0px")};
  flex-direction: ${({ $fd }) => ($fd !== undefined ? `${$fd}` : "column")};
  width: ${({ $width }) => ($width !== undefined ? `${$width}` : "100%")};

  /* Estes 2 comandos abaixo deixa o scrollView oculpando apenas o tamanho do conteudeu interdo sendo possivel o scrollView ficar no centro */
  flex-grow: 0;
  flex-basis: content;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  height: 144px;
  /* background-color: black; */
  border-radius: 0 0 15px 15px;
`;

export const ContanierTime = styled.View<{ selectStatus?: boolean}>`
  ${({ selectStatus }) => {
    if (selectStatus) {
      return css`
        background-color: #E8FCFD;
      `
    }else{
      return css`        
        background-color: #F1F0F5;
      `
    }
  }}
  padding: 4px 23px;
  border-radius: 5px;
  flex-direction:row;
  align-items: center;
  gap: 4px;
`;
