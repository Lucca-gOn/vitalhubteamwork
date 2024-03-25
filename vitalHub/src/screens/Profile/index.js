
import { StatusBar } from "react-native"
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer"
import { ImageUser } from "../../components/Images/style"
import { Description2, TextLabel, TextQuickSandRegular, Title } from "../../components/Texts/style"
import { InputGray, InputGreen, InputGreenMultiLine } from "../../components/Inputs/styled"
import { ButtonDefault, ButtonGray } from "../../components/Buttons"
import { LinkUnderlineDefault } from "../../components/Links"
import { Stethoscope } from "../../components/Stethoscope"
import { userDecodeToken } from '../../utils/Auth';
import { useEffect, useState } from "react";

export default function Profile({
  navigation,
}) {
  const [profile, setProfile] = useState({})

  async function profileLoad() {
    const token = await userDecodeToken();

    setProfile(token);
  }

  useEffect(() => {
    profileLoad();
  }, [])
  return (
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />

      <ImageUser source={require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >


        <ContainerMargin $mt={20} $width="100%">
          <Title>
            Nome do Paciente
          </Title>
        </ContainerMargin>
        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
          <Description2>
            {profile.email}
          </Description2>

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>
          <TextLabel>Data de nascimento:</TextLabel>
          <InputGray
            placeholder="DD/MM/AAAA"
            inputMode="decimal"
            autoComplete="birthdate-full"
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>CPF</TextLabel>
          <InputGray
            placeholder="xxx.xxx.xxx-xx"
            inputMode="decimal"
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço</TextLabel>
          <InputGray
            placeholder="Rua niteroi, 80"
            autoComplete="address-line1"
            autoCapitalize="words"
            inputMode="text"
          />

        </ContainerMargin>

        <ContainerMargin $fd="row" $gap={32}>

          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
            <TextLabel>Cep</TextLabel>
            <InputGray
              placeholder="XXXXX-XXX"
              inputMode="decimal"
              autoComplete="postal-code"
            />
          </ContainerMargin>
          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
            <TextLabel>Cidade</TextLabel>
            <InputGray
              placeholder="Moema-SP"
              inputMode="text"
              autoCapitalize="words"
            />
          </ContainerMargin>
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Salvar" />

          <ButtonDefault textButton="Editar" />

          <ButtonGray textButton="Sair do app" />
        </ContainerMargin>
      </ContainerScrollView>


    </Container>
  )
}