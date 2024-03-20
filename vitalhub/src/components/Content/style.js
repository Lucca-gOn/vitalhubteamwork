import styled from "styled-components";

export const ContentAccount = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: center;
    margin-top: 30;
`
export const ContentCheckEmail = styled.View`
    flex-direction: row;
    gap: 20px;
`
export const ContentStatus = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-between;

    margin: 38px 0px 20px;
`
export const ContentFlatList = styled.FlatList`
    width: 90%;
    height: 216px;
    justify-content: space-between;
`
export const ModalContent = styled.View`
    width: 90%;
    height: 310px;
    padding: 30px 30px 10px;
    border-radius: 10px;
    background-color: #fff;
    align-items: center;
`

export const ModalContentMedicalRecord = styled(ModalContent)`
    height: 530px;
    padding: 30px 24px 20px 25px;
`
export const ContentTextModalPatient = styled.View`
    flex-direction: row;
    width: 100%;
    gap: 20px;
    justify-content: center;

    margin-top: 12px;
`
export const InsertMedicalRecordContent = styled.SafeAreaView`

`
export const ContentTextMedicalRecord = styled(ContentTextModalPatient)`
    margin: 0px 0px 24px 0px;
`
export const InputWithTitleContent = styled.View`
    width: 320px;
    align-items: flex-start;
`
export const ContentLinkCenter = styled.View`
    width: 100%;
    align-items: center;
`
export const ContentIconPatientQuery = styled.View`
    width: 90%;
    align-items: flex-end;
`

export const ContentSquareIcon = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    background-color: #49B3BA;
    border-radius: 7px;

    align-items: center;
    justify-content: center;

    shadow-color: black;
    shadow-offset: 4px 4px;
    shadow-opacity: 0.5;
    shadow-radius: 10px;
`
export const ModalContentSchedule = styled(ModalContent)`
    width: 100%;
    height: 518px;
    background-color: #FAFAFA;
    padding-bottom: 35px;
`

export const InputWithTitleContentPicker = styled(InputWithTitleContent)`
    
`

export const ContentLevelQuery = styled(ContentStatus)`
    margin: 0px 0px 20px 0px;
    width: 100%;
`
export const ContentText = styled.View`
    gap: 10px;
`
export const MapContent = styled.View`
    flex: 1;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    background: #fff;
    elevation: 4; 
    shadow-color: rgba(0, 0, 0, 0.1);
    shadow-offset: 0px -4px;
    shadow-opacity: 1;
    shadow-radius: 15px;
    margin-top: -25px;
    align-items: center;
`
export const AlighCardCenterContent = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const DoubleView = styled.View`
    width: 90%;
    margin-top:24px;
    flex-direction: row;
    gap: 32px;

`

export const ViewColum = styled.View`
    flex-direction: column;
    width: 45%;
`