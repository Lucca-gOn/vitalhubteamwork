import { ScrollView, StatusBar } from "react-native";
import { ButtonImage } from "../../components/Button/Style";
import { AgeContainer, BoxAreaImage, ButtonContainer, Container, ImageContainer, ScrollViewContainer, TextBoxArea, TextBoxAreaImage, TextBoxContainer } from "../../components/Container/Style";
import { AgeTitle, ButtonTitle, EmailTitle, TextBoxText, TextBoxTitle, Title } from "../../components/Title/Style";
import { AttentionIcon, CameraIcon } from "../../components/Icons/Style";
import { LinkAction, LinkActionRed } from "../../components/Links/Style";
import { Line } from "../../components/Line/Style";

export const ViewPrescription = () => {
    return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageContainer source={require("../../assets/images/doctor_image.png")} />
            <ScrollViewContainer>
                <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} overScrollMode="never">
                    <Title>Dr. Claudio</Title>
                    <AgeContainer>
                        <AgeTitle>Cliníco Geral</AgeTitle>
                        <EmailTitle>CRM-15286</EmailTitle>
                    </AgeContainer>
                    <TextBoxContainer>
                        <TextBoxTitle>Descrição da consulta</TextBoxTitle>
                        <TextBoxArea>
                            <TextBoxText>O paciente possuí uma infecção no
                                ouvido. Necessário repouse de 2 dias
                                e acompanhamento médico constante</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <TextBoxContainer>
                        <TextBoxTitle>Diagnóstico do paciente</TextBoxTitle>
                        <TextBoxArea>
                            <TextBoxText>Infecção no ouvido</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <TextBoxContainer>
                        <TextBoxTitle>Prescrição médica</TextBoxTitle>
                        <TextBoxArea>
                            <TextBoxText>Medicamento: Advil</TextBoxText>
                            <TextBoxText>Dosagem: 50mg</TextBoxText>
                            <TextBoxText>Frequência: 3 Vezes ao dia</TextBoxText>
                            <TextBoxText>Duração: 3 Dias</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <TextBoxContainer>
                        <TextBoxTitle>Exames médicos</TextBoxTitle>
                        <TextBoxAreaImage>
                            <BoxAreaImage>
                                <AttentionIcon />
                                <TextBoxText>Nenhuma foto informada</TextBoxText>
                            </BoxAreaImage>
                        </TextBoxAreaImage>
                    </TextBoxContainer>
                    <ButtonContainer>
                        <ButtonImage width={"50%"}>
                            <CameraIcon />
                            <ButtonTitle>Enviar</ButtonTitle>
                        </ButtonImage>
                        <LinkActionRed>Cancelar</LinkActionRed>
                    </ButtonContainer>
                    <Line />
                    <TextBoxContainer>
                        <TextBoxArea>
                            <TextBoxText>Resultado do exame de sangue :</TextBoxText>
                            <TextBoxText>tudo normal</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <LinkAction>Voltar</LinkAction>
                </ScrollView>
            </ScrollViewContainer>
        </Container>
    );
};