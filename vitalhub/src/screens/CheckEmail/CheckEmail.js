
import { Container } from "../../components/Container/Style";
import { LogoVital } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { TextBlueEmail, TextGray } from "../../components/Text/Style";
import { ContentCheckEmail } from "../../components/Content/Style";
import { InputNumber } from "../../components/Input/Style";
import { ButtonMarginBlue, ButtonTitle } from "../../components/Button/Style";
import { LinkBlueMontserratMargin } from "../../components/Links/Style";

export function CheckEmail ({ navigation }) {
    return (
        <Container>
            
            <LogoVital/>

            <Title>Verifique seu e-mail</Title>
            
            <TextGray>Digite o código de 4 dígitos enviado para </TextGray>
            <TextBlueEmail>username@email.com</TextBlueEmail>

            <ContentCheckEmail>
                <InputNumber placeholder="0" maxLength={1}/>
                <InputNumber placeholder="0" maxLength={1}/>
                <InputNumber placeholder="0" maxLength={1}/>
                <InputNumber placeholder="0" maxLength={1}/>
            </ContentCheckEmail>

            <ButtonMarginBlue onPress={() => navigation.navigate('ResetPassword')}>
                <ButtonTitle>Entrar</ButtonTitle>
            </ButtonMarginBlue>

            <LinkBlueMontserratMargin>Reenviar Código</LinkBlueMontserratMargin>
        </Container>
    );
}