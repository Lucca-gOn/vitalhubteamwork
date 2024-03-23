
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreenCode } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { IconX } from "../../components/Icons/style";
import { LinkBlueMedium, LinkUnderlineDefault } from "../../components/Links";
import { ButtonIcon } from "../../components/Buttons/style";


export default function CheckEmail({
  navigation
}) {
  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <ButtonIcon onPress={()=> navigation.replace('Login')}>
          <IconX />
        </ButtonIcon>
        <BrandLogoBlue />
      </ContainerMargin>

      <ContainerScrollView>

        <Title>Verifique seu e-mail</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Digite o código de 4 dígitos enviado para 
          </Description>
          <LinkBlueMedium>
            username@email.com
          </LinkBlueMedium>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20} $fd="row" $justContent="space-between">
          <InputGreenCode/>
          <InputGreenCode/>
          <InputGreenCode/>
          <InputGreenCode/>
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Continuar" onPress={() => navigation.navigate('NewPassword')}/>

          <LinkUnderlineDefault>Reenviar código</LinkUnderlineDefault>
        </ContainerMargin>



      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 