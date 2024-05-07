import styled, { css } from "styled-components/native";

export const LinkGray = styled.Text`
  width:90%;
  
  font-family: 'MontserratAlternates_500Medium';
  font-size: 14px;
  text-decoration:underline;
  text-align:left;
  
  color: #8C8A97;
  padding: 8px 0px;
`

export const LinkBlueLigth = styled.Text`
  font-size: 14px;
  font-family:'MontserratAlternates_600SemiBold';
  color: #4D659D;
  text-decoration: underline;
  padding: 8px 0px;
`

export const LinkUnderlineDefault  = styled(LinkBlueLigth)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        color: #b5b5b5;     
      `
    }else{
      return css`
        color: #344F8F;
      `
    }
  }}
`

export const LinkBlueMedium = styled(LinkBlueLigth)`
  font-size:16px;
  color: #496BBA ;
  text-decoration: none;
`