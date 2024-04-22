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
  const [formEdit, setFormEdit] = useState(false);
  const [user, setUser] = useState();
  const [tokenUser, setTokenUser] = useState();

  async function Profileload() {
    try {
      const token = await userDecodeToken();
      // Verifique o token decodificado
      console.log("Token Decoded:", token);

      setTokenUser(token);
      const id = token.id;
      console.log("User ID:", id);

      let profile;
      if (token.role === 'Paciente') {
        profile = await api.get(`/Pacientes/BuscarPorID?id=${id}`);
      } else if (token.role === 'Medico') {
        profile = await api.get(`/Medicos/BuscarPorID?id=${id}`);
      }
      console.log(profile);
      if (profile) setUser(profile.data);
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async () => {
    try {
      // Endpoint conforme a role do usuário
      const endpoint = `/api/${tokenUser.role === 'Paciente' ? 'Pacientes' : 'Medicos'}/Atualizar`;
  
      // Preparando os dados para atualização
      const updatedUser = { 
        cep: user.endereco?.cep,
        logradouro: user.endereco?.logradouro,
        cidade: user.endereco?.cidade,
      };
  
      // Enviando a requisição PUT com os dados atualizados
      const response = await api.put(`${endpoint}?id=${user.id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Verificando o resultado da atualização
      if (response.status === 200) {
        console.log('User updated successfully');
        Profileload(); // Recarrega os dados do perfil após a atualização
      } else {
        console.log('Failed to update user:', response.status);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
    Profileload();
  }, []);

  return (
    <Container>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />
      <ImageUser source={require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView showsVerticalScrollIndicator={false}>
        <ContainerMargin $mt={20} $width="100%">
          <Title>{user?.idNavigation?.nome}</Title>
        </ContainerMargin>

        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
          <Description2>{user?.idNavigation?.email}</Description2>
        </ContainerMargin>

        {tokenUser?.role === "Medico" && (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CRM:</TextLabel>
              <InputGray
                placeholder="Número do CRM"
                inputMode="numeric"
                editable={formEdit}
                value={user?.crm || ''}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Especialidade:</TextLabel>
              <InputGray
                placeholder="Especialidade"
                inputMode="text"
                editable={formEdit}
                value={user?.especialidade.especialidade1 || ''}
              />
            </ContainerMargin>
          </>
        )}

        {tokenUser?.role !== "Medico" && (
          <>
            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Data de nascimento:</TextLabel>
              <InputGray
                editable={formEdit}
                placeholder="DD/MM/AAAA"
                inputMode="decimal"
                autoComplete="birthdate-full"
                value={user?.dataNascimento ? new Date(user.dataNascimento).toLocaleDateString('pt-BR') : ''}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>CPF:</TextLabel>
              <InputGray
                placeholder="xxx.xxx.xxx-xx"
                inputMode="decimal"
                editable={formEdit}
                value={user?.cpf || ''}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>RG:</TextLabel>
              <InputGray
                placeholder="xx.xxx.xxx-x"
                inputMode="decimal"
                editable={formEdit}
                value={user?.rg || ''}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Cidade:</TextLabel>
              <InputGray
                editable={formEdit}
                placeholder="Cidade"
                value={user?.endereco?.cidade || ''}
                onChangeText={text => setUser(prevState => ({
                  ...prevState,
                  endereco: { ...prevState.endereco, cidade: text }
                }))}
              />
            </ContainerMargin>
          </>
        )}

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço:</TextLabel>
          <InputGray
            editable={formEdit}
            placeholder="Endereço"
            value={user?.endereco?.logradouro || ''}
            onChangeText={text => setUser(prevState => ({
              ...prevState,
              endereco: { ...prevState.endereco, logradouro: text }
            }))}
          />
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>CEP:</TextLabel>
          <InputGray
            editable={formEdit}
            placeholder="CEP"
            value={user?.endereco?.cep || ''}
            onChangeText={text => setUser(prevState => ({
              ...prevState,
              endereco: { ...prevState.endereco, cep: text }
            }))}
          />
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Salvar" onPress={() => { setFormEdit(false); updateUser(); }} />
          <ButtonDefault textButton="Editar" onPress={() => { setFormEdit(true); }} />
          <ButtonGray textButton="Sair do app" onPress={Logout} />
        </ContainerMargin>
      </ContainerScrollView>
    </Container>
  );
}
