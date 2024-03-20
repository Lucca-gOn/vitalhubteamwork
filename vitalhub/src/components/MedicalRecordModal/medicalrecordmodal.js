import { Modal } from "react-native";
import { ImageModalMedic } from "./Style";
import { PatientContainer } from "../Container/Style";
import { ContentTextModalPatient, ModalContent, ModalContentMedicalRecord } from "../Content/Style";
import { Title } from "../Title/Style";
import { TextGrayModalPatient } from "../Text/Style";
import { ButtonMarginBlue, ButtonTitle } from "../Button/Style";
import { LinkBlueMontserratMargin } from "../Links/Style";

export const MedicalRecordModal = ({ visible, setshowModalMedicalRecord, ...rest }) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientContainer>
                <ModalContentMedicalRecord>
                    <ImageModalMedic
                        source={{ uri: "https://github.com/MagiLogus.png" }}
                    />

                    <Title>Paulo Oliveira</Title>

                    <ContentTextModalPatient>
                        <TextGrayModalPatient>22 Anos</TextGrayModalPatient>
                        <TextGrayModalPatient>lucas.oliveira@gmail.com</TextGrayModalPatient>
                    </ContentTextModalPatient>

                    <ButtonMarginBlue onPress={() => setshowModalMedicalRecord(false)}>
                        <ButtonTitle>Inserir prontuário</ButtonTitle>
                    </ButtonMarginBlue>

                    <LinkBlueMontserratMargin  onPress={() => setshowModalMedicalRecord(false)}>Cancelar</LinkBlueMontserratMargin>
                </ModalContentMedicalRecord>
            </PatientContainer>

        </Modal>
    );
};