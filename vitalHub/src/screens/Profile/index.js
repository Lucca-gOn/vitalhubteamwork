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
  const [user, setUser] = useState([]);

  //Decodifica o Token, set profile chama o token decodificado, apos isso, condicional para ver se o token do user foi obetido com sucesso, se achar, chama ListarUsuario(), com o token.id como argumento.
  async function profileLoad() {
    const token = await userDecodeToken();
    //Tive que formatar o token para vir como string 
    const tokenObj = JSON.parse(token.token);
    const jwtToken = tokenObj.token;
    await ListarUsuario(jwtToken);

    //console.log(jwtToken); 
  }

  async function ListarUsuario(tokenJwt) {
    await api.get(`/Pacientes/PerfilLogado`, {
      headers: {
        'Authorization': `Bearer ${tokenJwt}`
      }
    })
    .then(response => {
      console.log(response.data);
      const userData = response.data.item1 || response.data.item2;
      setUser(userData);
  }).catch(error => {
      console.log(error);
  })
  }

  useEffect(() => {
    profileLoad();
  }, []);

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

  return (
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />

      <ImageUser source={require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView showsVerticalScrollIndicator={false}>

        <ContainerMargin $mt={20} $width="100%">
          <Title>{user?.idNavigation?.nome}</Title>
        </ContainerMargin>

        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
          <Description2>{user?.idNavigation?.email}</Description2>
        </ContainerMargin>
        <ContainerMargin $alingItens="flex-start" $gap={10}>
          <TextLabel>Data de nascimento:</TextLabel>
          <InputGray
            placeholder="DD/MM/AAAA"
            inputMode="decimal"
            autoComplete="birthdate-full"
            value={user?.dataNascimento ? new Date(user?.dataNascimento).toLocaleDateString() : ''}
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>
          <TextLabel>CPF</TextLabel>
          <InputGray
            placeholder="xxx.xxx.xxx-xx"
            inputMode="decimal"
            value={user?.cpf}
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>
          <TextLabel>Endereço</TextLabel>
          <InputGray
            placeholder="Rua niteroi, 80"
            autoComplete="address-line1"
            autoCapitalize="words"
            inputMode="text"
            value={user?.endereco?.logradouro}
          />
        </ContainerMargin>

        <ContainerMargin $fd="row" $gap={32}>
          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
            <TextLabel>Cep</TextLabel>
            <InputGray
              placeholder="XXXXX-XXX"
              inputMode="decimal"
              autoComplete="postal-code"
              value={user?.endereco?.cep}
            />
          </ContainerMargin>

          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
            <TextLabel>Cidade</TextLabel>
            <InputGray
              placeholder="Moema-SP"
              inputMode="text"
              autoCapitalize="words"
              value={user?.endereco?.cidade}
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
