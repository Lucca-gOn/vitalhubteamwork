import styled, { css } from "styled-components"
import { ButtoTitleStatus, ButtonStatus } from "../StatusQuery/Style"

export const ButtonLevelQueryStyle = styled.TouchableHighlight`
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 40px;
    border-radius: 5px;
    
    ${props => props.clickButton ? css`background-color: #60BFC5` : css`background-color: transparent; border: 2px solid #60BFC5`}
`
export const ButtoLevelQueryTitleStatus = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 12px;
    text-transform: none;

    ${props => props.clickButton ? css`color: #fbfbfb` : css`color: #60BFC5`}
`