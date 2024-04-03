import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from '../../utils/Auth';
import api from "../../service/Service";
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer";
import { ImageUser } from "../../components/Images/style";
import { Description2, TextLabel, Title } from "../../components/Texts/style";
import { InputGray } from "../../components/Inputs/styled";
import { ButtonDefault, ButtonGray } from "../../components/Buttons";

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState(null);

  async function profileLoad() {
    try {
      const token = await userDecodeToken();
      if (token.id) {
        const response = await api.get(`/Usuario/BuscarUsuarioPorId/${token.id}`);
        setUser(response.data);
        setProfile(token);

        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }


  async function ListarUsuario(userId) {
    try {
      const response = await api.get(`/Usuario/BuscarUsuarioPorId/${userId}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const { role } = profile

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      console.error("Erro ao ListarUsuario:", error.response);
    }
  };
  useEffect(() => {
    profileLoad();
  }, []);

  return (
    <Container>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />

      <ImageUser source={require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView showsVerticalScrollIndicator={false}>

        <ContainerMargin $mt={20} $width="100%">
          <Title>{user?.nome}</Title>
        </ContainerMargin>

        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
          <Description2>{user?.email}</Description2>
        </ContainerMargin>

        {user?.medico && (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CRM:</TextLabel>
              <InputGray
                placeholder="Número do CRM"
                inputMode="numeric"
                value={user.medico.crm}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Especialidade:</TextLabel>
              <InputGray
                placeholder="Especialidade"
                inputMode="text"
                value={user.medico.especialidade.especialidade1}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Endereço:</TextLabel>
              <InputGray
                placeholder="Endereço do consultório"
                inputMode="text"
                value={user.medico.endereco.logradouro}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Número:</TextLabel>
              <InputGray
                placeholder="Número do consultório"
                inputMode="numeric"
                value={user.medico.endereco.numero.toString()}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CEP:</TextLabel>
              <InputGray
                placeholder="CEP do consultório"
                inputMode="numeric"
                value={user.medico.endereco.cep}
              />
            </ContainerMargin>
          </>

        )}

        {user?.paciente && (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Data de nascimento:</TextLabel>
              <InputGray
                placeholder="DD/MM/AAAA"
                inputMode="decimal"
                autoComplete="birthdate-full"
                value={user.paciente.dataNascimento ? new Date(user.paciente.dataNascimento).toLocaleDateString() : ''}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CPF</TextLabel>
              <InputGray
                placeholder="xxx.xxx.xxx-xx"
                inputMode="decimal"
              //value={user.paciente.cpf}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Endereço</TextLabel>
              <InputGray
                placeholder="Rua niteroi, 80"
                autoComplete="address-line1"
                autoCapitalize="words"
                inputMode="text"
              //value={user.paciente.endereco?.logradouro}
              />
            </ContainerMargin>

            <ContainerMargin $fd="row" $gap={32}>
              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
                <TextLabel>Cep</TextLabel>
                <InputGray
                  placeholder="XXXXX-XXX"
                  inputMode="decimal"
                  autoComplete="postal-code"
                //value={user.paciente.endereco?.cep}
                />
              </ContainerMargin>

              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
                <TextLabel>Cidade</TextLabel>
                <InputGray
                  placeholder="Moema-SP"
                  inputMode="text"
                  autoCapitalize="words"
                //value={user.paciente.endereco?.cidade}
                />
              </ContainerMargin>

            </ContainerMargin>
          </>
        )}

        <ContainerMargin $mt={30} $gap={30} $mb={30}>

          <ButtonDefault textButton="Salvar" />
          <ButtonDefault textButton="Editar" />
          <ButtonGray textButton="Sair do app" onPress={Logout} />

        </ContainerMargin>
      </ContainerScrollView>
    </Container>
  );
}
