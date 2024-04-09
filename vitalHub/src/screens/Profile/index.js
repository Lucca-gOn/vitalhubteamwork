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
  const [user, setUser] = useState();
  const [tokenUser, setTokenUser] = useState();

  const nome = user?.idNavigation.nome;
  const email = user?.idNavigation.email;

  const crm = user?.crm;
  const especialidade = user?.especialidade?.especialidade1;

  const endereco = user?.endereco.logradouro;
  const cep = user?.endereco.cep;
  const cidade = user?.endereco.cidade;

  async function loadProfile() {
    try {
      try {
        const token = await userDecodeToken();

        setTokenUser(token);

        const id = token.id;
        let userData;
        if (token.role === 'Paciente' || token.role === 'Medico') {
          const endpoint = token.role === 'Paciente' ? '/Pacientes/BuscarPorID' : '/Medicos/BuscarPorID';
          const response = await api.get(`${endpoint}?id=${id}`);
          userData = response.data;
        }

        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(user);
      //console.log(tokenUser);
    } catch (error) {
      console.log(error);
    }
  }

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
    loadProfile();
  }, []);

  return (
    <Container>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />
      <ImageUser source={require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView showsVerticalScrollIndicator={false}>
        <ContainerMargin $mt={20} $width="100%">
          <Title>{nome}</Title>
        </ContainerMargin>

        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
          <Description2>{email}</Description2>
        </ContainerMargin>

        {tokenUser?.role === "Medico" && (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CRM:</TextLabel>
              <InputGray
                placeholder="Número do CRM"
                inputMode="numeric"
                value={crm} />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Especialidade:</TextLabel>
              <InputGray
                placeholder="Especialidade"
                inputMode="text"
                value={especialidade} 
              />
            </ContainerMargin>
          </>
        )}
        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço:</TextLabel>
          <InputGray
            placeholder="Rua niteroi, 80"
            autoComplete="address-line1"
            autoCapitalize="words"
            inputMode="text"
            value={endereco} />
        </ContainerMargin>

        <ContainerMargin $fd="row" $gap={32}>
          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
            <TextLabel>CEP:</TextLabel>
            <InputGray
              placeholder="XXXXX-XXX"
              inputMode="decimal"
              autoComplete="postal-code"
              value={cep} 
            />
          </ContainerMargin>

          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
            <TextLabel>Cidade:</TextLabel>
            <InputGray
              placeholder="Moema-SP"
              inputMode="text"
              autoCapitalize="words"
              value={cidade} 
            />
          </ContainerMargin>
        </ContainerMargin>



        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Salvar" />
          <ButtonDefault textButton="Editar" />
          <ButtonGray textButton="Sair do app" onPress={Logout} />
        </ContainerMargin>
      </ContainerScrollView>
    </Container>
  );
}
