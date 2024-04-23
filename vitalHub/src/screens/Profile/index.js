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
import moment from "moment";

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [crm, setCRM] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');

  const { role } = profile

  async function profileLoad() {

    await userDecodeToken()
      .then(async (token) => {
        if (token.id) {
          await api.get(`/Usuario/BuscarPorId?id=${token.id}`)
            .then(userSearched => {
              setUser(userSearched.data);
              setProfile(token);
              console.log(userSearched.data)
              if (token.role === 'Medico') {
                setCRM(userSearched.data.medico.crm)
                setEspecialidade(userSearched.data.medico.especialidade.especialidade1)

              } else {
                setDataNascimento(moment(userSearched.data.paciente.dataNascimento).format('DD/MM/YYYY'))
                setCpf(userSearched.data.paciente.cpf)
              }
              setEndereco(token.role == 'Medico' ? userSearched.data.medico.endereco.logradouro : userSearched.data.paciente.endereco.logradouro)
              setCep(token.role == 'Medico' ? userSearched.data.medico.endereco.cep : userSearched.data.paciente.endereco.cep)
              setCidade(token.role == 'Medico' ? userSearched.data.medico.endereco.cidade : userSearched.data.paciente.endereco.cidade)

            }
            ).catch(error => alert(`Erro ao BuscarPorID : ${error}`))
        }
      }).catch(error => alert(`Erro ao fazer o decode do token, erro : ${error}`))

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

        {role == 'Medico' ? (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CRM:</TextLabel>
              <InputGray
                placeholder="Número do CRM"
                inputMode="numeric"
                value={crm}
                onChangeText={(text) => {
                  setCRM(text);
                }}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Especialidade:</TextLabel>
              <InputGray
                placeholder="Especialidade"
                inputMode="text"
                value={especialidade}
                onChangeText={(text) => {
                  setEspecialidade(text);
                }}

              />
            </ContainerMargin>
          </>
        )
          :

          (
            <>
              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
                <TextLabel>Data de nascimento:</TextLabel>
                <InputGray
                  placeholder="DD/MM/AAAA"
                  inputMode="decimal"
                  autoComplete="birthdate-full"
                  value={dataNascimento}
                  onChangeText={(text) => {
                    setDataNascimento(text);
                  }}
                />
              </ContainerMargin>

              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
                <TextLabel>CPF</TextLabel>
                <InputGray
                  placeholder="xxx.xxx.xxx-xx"
                  //inputMode="decimal"
                  value={cpf}
                  onChangeText={(text) => {
                    setCpf(text);
                  }}
                />
              </ContainerMargin>
            </>
          )}
        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço</TextLabel>
          <InputGray
            placeholder="Rua niteroi, 80"
            autoComplete="address-line1"
            autoCapitalize="words"
            inputMode="text"
            value={endereco}
            onChangeText={(text) => {
              setEndereco(text);
            }}
          />
        </ContainerMargin>

        <ContainerMargin $fd="row" $gap={32}>
          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
            <TextLabel>Cep</TextLabel>
            <InputGray
              placeholder="XXXXX-XXX"
              inputMode="decimal"
              autoComplete="postal-code"
              value={cep}
              onChangeText={(text) => {
                setCep(text);
              }}
            />
          </ContainerMargin>

          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
            <TextLabel>Cidade</TextLabel>
            <InputGray
              placeholder="Moema-SP"
              inputMode="text"
              autoCapitalize="words"
              value={cidade}
              onChangeText={(text) => {
                setCidade(text);
              }}
            />
          </ContainerMargin>

        </ContainerMargin>


        <ContainerMargin $mt={30} $gap={30} $mb={30}>

          <ButtonDefault textButton="Salvar" />
          <ButtonDefault textButton="Editar" />
          <ButtonGray textButton="Sair do app" onPress={Logout} />

        </ContainerMargin>
      </ContainerScrollView>
    </Container >
  );
}
