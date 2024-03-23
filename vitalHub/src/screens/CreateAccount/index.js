
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";

export default function CreateAccount({
  navigation
}) {
  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <BrandLogoBlue />
      </ContainerMargin>

      <ContainerScrollView>

        <Title>Criar conta</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Insira seu endereço de e-mail e senha para realizar seu cadastro.
          </Description>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20}>
          <InputGreen
            placeholder="Email"
            enterKeyHint="next"
            keyboardType="email-address"
            maxLength={50}
          />

          <InputGreen
            placeholder="Senha"
            enterKeyHint="next"
            keyboardType="default"
            maxLength={50}
            secureTextEntry={true}
          />
          <InputGreen
            placeholder="Confirmar senha"
            enterKeyHint="enter"
            keyboardType="default"
            maxLength={50}
            secureTextEntry={true}
          />
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Confirmar nova senha" onPress={() => navigation.replace('Login')} />

          <LinkUnderlineDefault onPress={()=> {navigation.replace('Login')}}>Cancelar</LinkUnderlineDefault>
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 