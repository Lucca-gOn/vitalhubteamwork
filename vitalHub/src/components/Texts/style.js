import styled, { css } from "styled-components/native"

export const TextQuickSandRegular = styled.Text`
  font-family: 'Quicksand_400Regular';
  font-size: 14px;
  color: #8C8A97;
`

export const Description = styled.Text`
  font-family: 'Quicksand_500Medium';
  font-size: 16px;
  color: #5F5C6B;
  text-align: center;
`
export const Description2 = styled(Description)`
  color: #4e4b59;
`

export  const DescriptionBlack = styled(Description)`
  color: #000;
`

export const TitleHeader = styled(Description)`
  font-size: 14px;
  color: #4E4B59;
`

export const TextData = styled.Text`
  font-family: 'Quicksand_500Medium';
  font-size: 14px;
  color: #4E4B59;
`

export const NivelConsult = styled(TitleHeader)`
  color: #8C8A97;
`

export const TextSlogan = styled.Text`
  font-family: 'Quicksand_600SemiBold';
  color: #fff;
  font-size: 18px;
  text-align:center;
  width:203px;
`

export const TextLabel = styled.Text`
  font-family: 'Quicksand_600SemiBold';
  color: #33303E;
  font-size: 16px;
`

export const TextLabelBlack = styled(TextLabel)`
  color: #000;
  font-size: 14px;
`

export const TextGrade = styled(TextLabel)`
  color: #F9A620;
`

export const TextAdress = styled(TextGrade)`
  color: #4E4B59;
`

export const TextWeek = styled(TextAdress)`
  color: #49B3BA;
`

export const TextTime = styled.Text`
  ${({ selectStatus }) => {
    if (selectStatus) {
      return css`
        color: #49B3BA;
      `
    } else {
      return css`
        color: #4E4B59;
      `
    }
  }}
  font-family: 'Quicksand_600SemiBold';
  font-size: 14px;
`

export const TextCancelAppointment = styled.Text`
  font-family:'MontserratAlternates_500Medium';
  color:  #c81d25;
  font-size: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
`

export const TextInformation = styled.Text`
  font-family:'MontserratAlternates_500Medium';
  font-size:14px;
  color:  #4E4B59;
`

export const TextPontuarioAppointment = styled(TextCancelAppointment)`
  color: #344F8F;
`
export const Title = styled.Text`
  font-family:'MontserratAlternates_600SemiBold';
  font-size: 20px;
  color: #33303E;
`
export const TitleCard = styled(Title)`
  font-size:16px;
`

export const TextGrayDark = styled.Text`
  font-family:'MontserratAlternates_600SemiBold';
  font-size: 14px;
  color: #4E4B59;
`

export const TextWhiteMontBold = styled(TextGrayDark)`
  color:#FFFFFF;
`

export const TextNameUserWhite = styled(TextGrayDark)`
  font-size: 16px;
  color: #FBFBFB;
`

export const TextNameUserBlack = styled(TextNameUserWhite)`
  color: #33303E;
`

export const TextSelect = styled(TextNameUserWhite)`
  ${({ selectStatus }) => {
    if (!selectStatus) {
      return css`
        color: #607EC5;      
      `
    }
  }}
  font-size: 12px; 
  text-align:center;
`

export const TextSelectGreen = styled(TextSelect)`
${({ selectStatus }) => {
    if (!selectStatus) {
      return css`
        color: #34898F;      
      `
    }
  }}
  font-size:14px;
`


export const TextButtonBlue = styled.Text`
  font-family: 'MontserratAlternates_700Bold';
  font-size:14px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
`

export const TextButtonGoogle = styled(TextButtonBlue)`
  color: #496bba;
`


