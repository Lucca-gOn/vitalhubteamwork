import styled from "styled-components";

//import lib linear gradient
import {LinearGradient} from 'expo-linear-gradient';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FAFAFA;
`

export const ContainerHeader = styled(LinearGradient).attrs({ colors: ['#60BFC5', '#496BBA'], start: {x: -0.05, y: 1.08}, end: {x: 1, y: 0} })`
    width: 100%;
    height: 144px;
    border-radius: 0px 0px 15px 15px;

    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 20px;
`

export const PatientContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0, 0.6);
`

export const InsertMedicalRecordImageContainer = styled.View`
    width: 100%;
    height: 280px;
`
export const ContainerHeaderHome = styled(Container)`
    flex: none;
`

export const ScheduleContainer = styled(PatientContainer)`
    justify-content: flex-end;
`

