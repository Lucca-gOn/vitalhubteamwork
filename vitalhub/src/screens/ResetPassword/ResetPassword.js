import { Container } from "../../components/Container/Style";
import { LogoVital } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { TextGray } from "../../components/Text/Style";
import { Input } from "../../components/Input/Style";
import { ButtonMarginBlue, ButtonTitle } from "../../components/Button/Style";

export function ResetPassword ({navigation}) {
    return (
        <Container>
            <LogoVital/>

            <Title>Redefinir Senha</Title>

            <TextGray>Insira e confirme a sua nova senha</TextGray>

            <Input placeholder="Nova senha"/>
            <Input placeholder="Confirmar nova senha"/>

            <ButtonMarginBlue>
                <ButtonTitle onPress={() => navigation.navigate('Login')}>Confirmar nova senha</ButtonTitle>
            </ButtonMarginBlue>
        </Container>
    );
}