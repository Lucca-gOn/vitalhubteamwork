import styled, { css } from "styled-components"

export const ButtonStatus = styled.TouchableHighlight`
    border-radius: 5px;
    padding: 12px 14px;

    ${props => props.clickButton ? css`background-color: #496bba` : css`background-color: transparent; border: 2px solid #607EC5`}
`

export const ButtoTitleStatus = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 12px;
    text-transform: none;

    ${props => props.clickButton ? css`color: #fbfbfb` : css`color: #607EC5`}
`