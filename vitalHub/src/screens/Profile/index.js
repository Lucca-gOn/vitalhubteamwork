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
  const [editForm, setEditForm] = useState(false);
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');

  const nome = user?.idNavigation.nome;
  const email = user?.idNavigation.email;

  const crm = user?.crm;
  const especialidade = user?.especialidade?.especialidade1;

  const dataNascimento = user?.dataNascimento;
  const cpf = user?.cpf;
  const rg = user?.rg;

  async function userProfile() {

    try {
      const token = await userDecodeToken();
      setTokenUser(token);
      await AsyncStorage.setItem('token', JSON.stringify(token));
      const id = token.id;
      let userData;
      if (token.role === 'Paciente' || token.role === 'Medico') {
        const endpoint = token.role === 'Paciente' ? '/Pacientes/BuscarPorID' : '/Medicos/BuscarPorID';
        const response = await api.get(`${endpoint}?id=${id}`);
        if (response.data) {
          setUser(response.data);
          setEndereco(response.data.endereco.logradouro || '');
          setCep(response.data.endereco.cep || '');
          setCidade(response.data.endereco.cidade || '');
        }
      }

      if (userData) {
        setUser(userData);
      }
      //console.log(user);
      //console.log(tokenUser);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile() {
    const storedToken = await AsyncStorage.getItem('token');
    const parsedToken = JSON.parse(storedToken);
    const tokenJWT = parsedToken.token;

    const updatedData = {
      cep: cep,
      endereco: endereco,
      cidade: cidade,
    };

    try {
      const endpoint = tokenUser.role === 'Medico' ? '/Medicos/Atualizar' : '/Pacientes/Atualizar';
      const response = await api.put(endpoint, updatedData, {
        headers: {
          'Authorization': `Bearer ${tokenJWT}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log('Perfil atualizado com sucesso');
        userProfile();
      }
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
      if (error.response) {
        console.log('Dados da resposta:', error.response.data);
      }
    }
  }


  const handleEdit = () => {
    setEndereco(user.endereco.logradouro || '');
    setCep(user.endereco.cep || '');
    setCidade(user.endereco.cidade || '');
    setEditForm(true);
  };

  const handleSave = async () => {
    await updateProfile();
    setEditForm(false);
  };

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
    userProfile();
  }, [tokenUser?.id]);

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

        {tokenUser?.role !== "Medico" && (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Data de nascimento:</TextLabel>
              <InputGray
                editable={editForm}
                placeholder="DD/MM/AAAA"
                inputMode="decimal"
                autoComplete="birthdate-full"
                value={new Date(dataNascimento).toLocaleDateString('pt-BR')}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CPF</TextLabel>
              <InputGray
                placeholder="xxx.xxx.xxx-xx"
                inputMode="decimal"
                value={cpf}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>RG</TextLabel>
              <InputGray
                placeholder="xx.xxx.xxx-x"
                inputMode="decimal"
                value={rg}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Cidade:</TextLabel>
              <InputGray
                editable={editForm}
                placeholder="Cidade"
                value={cidade}
                onChangeText={text => setCidade(text)}
              />
            </ContainerMargin>
          </>
        )}

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço:</TextLabel>
          <InputGray
            editable={editForm}
            placeholder="Endereço"
            value={endereco}
            onChangeText={text => setEndereco(text)}
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>CEP:</TextLabel>
          <InputGray
            editable={editForm}
            placeholder="CEP"
            value={cep}
            onChangeText={text => setCep(text)}
          />
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          {editForm ? (
            <ButtonDefault textButton="Salvar" onPress={handleSave} />
          ) : (
            <ButtonDefault textButton="Editar" onPress={handleEdit} />
          )}
          <ButtonGray textButton="Sair do app" onPress={Logout} />
        </ContainerMargin>
      </ContainerScrollView>
    </Container>
  );
}
