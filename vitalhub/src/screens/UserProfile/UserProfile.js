import { ScrollView, StatusBar } from "react-native";
import { Button, ButtonLogoff } from "../../components/Button/Style";
import { Container, ImageContainer, ScrollViewContainer, TextBoxArea, TextBoxContainer, TextBoxContainerRow } from "../../components/Container/Style";
import { ButtonTitle, EmailTitle, TextBoxText, TextBoxTitle, Title } from "../../components/Title/Style";
import { InsertMedicalRecordImage } from "../../components/InsertMedialRecordImage/InsertMedialRecordImage";
import { ScrollForm } from "../InsertMedicalRecord/style";

export const UserProfile = ({ navigation }) => {
    async function Login() {
        navigation.replace("Login")
    }
    return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" />
            <InsertMedicalRecordImage />
            <ScrollForm>
                <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} overScrollMode="never">
                    <Title>Richard Kosta</Title>
                    <EmailTitle>richard.kosta@gmail.com</EmailTitle>
                    <TextBoxContainer>
                        <TextBoxTitle>Data de Nascimento:</TextBoxTitle>
                        <TextBoxArea>
                            <TextBoxText>04/05/1999</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <TextBoxContainer>
                        <TextBoxTitle>CPF:</TextBoxTitle>
                        <TextBoxArea>
                            <TextBoxText>859********</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <TextBoxContainer>
                        <TextBoxTitle>Endereço:</TextBoxTitle>
                        <TextBoxArea>
                            <TextBoxText>Rua: Vicenso Silva, 987</TextBoxText>
                        </TextBoxArea>
                    </TextBoxContainer>
                    <TextBoxContainerRow>
                        <TextBoxContainer fieldWidth={45}>
                            <TextBoxTitle>Cep:</TextBoxTitle>
                            <TextBoxArea >
                                <TextBoxText>06548-909</TextBoxText>
                            </TextBoxArea>
                        </TextBoxContainer>
                        <TextBoxContainer fieldWidth={45}>
                            <TextBoxTitle>Cidade:</TextBoxTitle>
                            <TextBoxArea >
                                <TextBoxText>Moema-SP</TextBoxText>
                            </TextBoxArea>
                        </TextBoxContainer>
                    </TextBoxContainerRow>
                    <Button>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </Button>
                    <Button>
                        <ButtonTitle>Editar</ButtonTitle>
                    </Button>
                    <ButtonLogoff onPress={() => Login()}>
                        <ButtonTitle>Sair do APP</ButtonTitle>
                    </ButtonLogoff>
                </ScrollView>
            </ScrollForm>
        </Container>
    );
};