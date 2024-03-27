
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
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"

export default function Profile({
  navigation,
}) {
  
  const [profile, setProfile] = useState({})
  const [user, setUser] = useState([])
  
  async function profileLoad() {
    const token = await userDecodeToken();

    setProfile(token);
  }

  useEffect(() => {
    profileLoad();
  }, [])

  async function ListarUsuario() {
    try {
      // Instanciar a chamada da api
      const response = await api.get(`/Usuario/BuscarUsuarioPorId/${profile.id}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    ListarUsuario();
  }, [])

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}]
      });
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };
  return (
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />

      <ImageUser source={require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >
        <ContainerMargin $mt={20} $width="100%">
          <Title>
            {profile.name}
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
            // value={user.paciente.dataNascimento}
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>CPF</TextLabel>
          <InputGray
            placeholder="xxx.xxx.xxx-xx"
            inputMode="decimal"
            // value={user.paciente.cpf}
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço</TextLabel>
          <InputGray
            placeholder="Rua niteroi, 80"
            autoComplete="address-line1"
            autoCapitalize="words"
            inputMode="text"
            // value={user.paciente.endereco.logradouro}
          />

        </ContainerMargin>

        <ContainerMargin $fd="row" $gap={32}>

          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
            <TextLabel>Cep</TextLabel>
            <InputGray
              placeholder="XXXXX-XXX"
              inputMode="decimal"
              autoComplete="postal-code"
              // value={user.paciente.endereco.cep}
            />
          </ContainerMargin>
          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
            <TextLabel>Cidade</TextLabel>
            <InputGray
              placeholder="Moema-SP"
              inputMode="text"
              autoCapitalize="words"
              // value={user.paciente.endereco.cidade}
            />
          </ContainerMargin>
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Salvar" />

          <ButtonDefault textButton="Editar" />

          <ButtonGray textButton="Sair do app" onPress={Logout}/>
        </ContainerMargin>
      </ContainerScrollView>


    </Container>
  )
}