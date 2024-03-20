import styled from "styled-components";
import { TextAccount } from "../Text/Style";

export const LinkMedium = styled.Text`
    font-size: 14px;
    font-family: "MontserratAlternates_500Medium";
    text-decoration: underline;
    color: #8C8A97;
    align-self: flex-start;
    margin: 10px 0px 15px 20px;
`

export const LinkBlueMontserrat = styled(TextAccount)`
    color: #4D659D;
    text-decoration: underline;
`

export const LinkBlueMontserratMargin = styled(LinkBlueMontserrat)`
    margin-top: 30px;
`
