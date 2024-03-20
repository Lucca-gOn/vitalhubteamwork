import styled from "styled-components";
import { ContainerCardsList, ContentCard, ViewRow } from "../CardQuery/Style";

export const ContentSelectClinic = styled.View`
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`
export const IconContent = styled.View`
    width: 42px;
    height: 20px;
    flex-direction: row;
    gap: 2px;
`
export const NumberStar = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 14px;
    color: #F9A620;
`

export const Local = styled(NumberStar)`
    color: #4E4B59;
`

export const ContainerCardsListCard = styled(ContainerCardsList)`
    width: 90%;
    flex-direction: column;
    padding: 18px 18px 10px 18px;
`
export const ViewRowClinicCard = styled(ViewRow)`
    flex-direction: column;
`
