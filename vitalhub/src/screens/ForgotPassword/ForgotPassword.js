import { Container } from "../../components/Container/Style";
import { LogoVital } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { TextGray } from "../../components/Text/Style";
import { Input } from "../../components/Input/Style";
import { ButtonMarginBlue, ButtonTitle } from "../../components/Button/Style";

export function ForgotPassword ({navigation}) {
    return (
        <Container>
            <LogoVital/>

            <Title>Recuperar senha</Title>

            <TextGray>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextGray>
            
            <Input>Usuário ou E-mail</Input>
            
            <ButtonMarginBlue onPress={() => navigation.navigate('CheckEmail')}>
                <ButtonTitle>Continuar</ButtonTitle>
            </ButtonMarginBlue>
        </Container>
    );
}