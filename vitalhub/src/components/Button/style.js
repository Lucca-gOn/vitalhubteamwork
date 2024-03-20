import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    width: 90%;
    height: 44;
    
    background-color: #496BBA;
    border-radius: 5px;
    
    justify-content: center;
    align-items: center;
    margin-top: 15;
`

export const ButtonTitle = styled.Text`
    color: #FFFFFF;
    font-family: 'MontserratAlternates_700Bold';
    font-size: 16;
    text-align: center;
    text-transform: uppercase;
`

export const ButtonGoogle = styled(Button)`
    background-color: #fafafa;
    border: #496BBA;
    flex-direction: row;
`

export const ButtonTitleGoogle = styled(ButtonTitle)`
    color: #496BBA;
`

export const ButtonMarginBlue = styled(Button)`
    margin-top: 30px;
`
export const ButtonMedicalRecord = styled(Button)`
    width: 100%;
    margin-top: 10px;
`
export const ButtonMedicalRecordEdit = styled(ButtonMedicalRecord)`
    margin-top: 30px;
    background-color: rgba(73, 107, 186, 0.33);
`
