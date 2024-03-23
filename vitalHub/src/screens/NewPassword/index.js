
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { IconX } from "../../components/Icons/style";
import { ButtonIcon } from "../../components/Buttons/style";

export default function NewPassword({
  navigation
}) {
  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <ButtonIcon onPress={() => navigation.replace('Login')}>
          <IconX />
        </ButtonIcon>
        <BrandLogoBlue />
      </ContainerMargin>

      <ContainerScrollView>

        <Title>Redefinir senha</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Insira e confirme a sua nova senha
          </Description>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20}>
          <InputGreen
            placeholder="Nova Senha"
            enterKeyHint="next"
            keyboardType="default"
            maxLength={50}
            secureTextEntry={true}
          />
          <InputGreen
            placeholder="Confirmar nova senha"
            enterKeyHint="enter"
            keyboardType="default"
            maxLength={50}
            secureTextEntry={true}
          />
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={15} $mb={30}>
          <ButtonDefault textButton="Confirmar nova senha" onPress={() => navigation.replace('Login')} />
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 