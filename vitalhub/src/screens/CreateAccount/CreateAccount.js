import { ButtonMarginBlue, ButtonTitle } from "../../components/Button/Style";
import { Container } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { LinkBlueMontserratMargin } from "../../components/Links/Style";
import { LogoVital } from "../../components/Logo/Style";
import { TextGrayCreateAccount } from "../../components/Text/Style";
import { Title } from "../../components/Title/Style";

export function CreateAccount({navigation}) {
    return (
        <Container>
            <LogoVital/>

            <Title>Criar conta</Title>

            <TextGrayCreateAccount>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextGrayCreateAccount>

            <Input placeholder="Usuário ou E-mail"/>
            <Input placeholder="Senha"/>
            <Input placeholder="Confirmar senha"/>

            <ButtonMarginBlue onPress={() => navigation.navigate('Login')}> 
                <ButtonTitle>Cadastrar</ButtonTitle>
            </ButtonMarginBlue>

            <LinkBlueMontserratMargin onPress={() => navigation.navigate('Login')}>Cancelar</LinkBlueMontserratMargin>
        </Container>
    );
}