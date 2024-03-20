import { Modal } from "react-native";
import { Title } from "../Title/Style";
import { ButtonMarginBlue, ButtonSecondary, ButtonTitle } from "../Button/Style";
import { LinkBlueMontserrat, LinkBlueMontserratMargin } from "../Links/Style";
import { TextGrayCancelModal } from "../Text/Style";
import { PatientContainer } from "../Container/Style";
import { ModalContent } from "../Content/Style";
import * as Notifications from '"expo-notifications"';

export const CancellationModal = ({ visible, setShowModalCancel, handleCallNotifications, ...rest }) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientContainer>
                <ModalContent>
                    <Title>Cancelar Consulta</Title>

                    <TextGrayCancelModal>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</TextGrayCancelModal>

                    <ButtonMarginBlue onPress={() => setShowModalCancel(false)}>
                        <ButtonTitle onPress={handleCallNotifications}>Confirmar</ButtonTitle>
                    </ButtonMarginBlue>

                    <LinkBlueMontserratMargin onPress={() => setShowModalCancel(false)}>Cancelar</LinkBlueMontserratMargin>
                </ModalContent>
            </PatientContainer>
        </Modal>
    );
}