import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from '../../utils/Auth';
import api from "../../service/Service";
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer";
import { ImageUser } from "../../components/Images/style";
import { Description2, TextLabel, Title } from "../../components/Texts/style";
import { InputGray } from "../../components/Inputs/styled";
import { ButtonDefault, ButtonGray } from "../../components/Buttons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from "moment";
import { ModalCamera } from "../../components/Modals";

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [crm, setCRM] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [foto, setFoto] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [showModalCamera, setShowModalCamera] = useState(false)
  const [disabledInput, setDisableInput] = useState(false)
  const [uriFotoCam,setUriFotoCam] = useState(null);
  

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
              setFoto(userSearched.data.foto)
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

  async function alterarFotoPerfil(){
    alert('Chamou a função alterarFotoPerfil')
    const formData = new FormData();

    formData.append("Arquivo", {
      uri: uriFotoCam,
      name: `image.jpg`,
      type: `image/jpg`,
    })

    await api.put(`/Usuario/AlterarFotoPerfil?id=${profile.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then( () => {

      setFoto(uriFotoCam)
    }
    ).catch(error =>{console.log('Erro ao alterar a foto : ',error.request)})
  }

  async function alterarDadosProfile() {
    console.log('Acessou alterar');
    const userType = profile.role === 'Medico' ? 'Medicos' : 'Pacientes';
    const url = `/${userType}/UpdateProfile?idUsuario=${profile.id}`;

    console.log(profile.id);
    await api.put(url, {
      cep: cep,
      logradouro: endereco,
      cidade: cidade,
    })
      .then(() => {
        alert('Dados salvos com sucesso');
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(`Erro ao fazer alteração dos dados: ${error}`);
        console.log(`Erro ao fazer alteração dos dados: ${error}`);
      });
  }

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(()=>{
    if(uriFotoCam){
      alterarFotoPerfil()      
    }
  },[uriFotoCam]);

  

  return (
    <Container>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />
      <ContainerMargin style={{ position: "relative" }}>
        <ImageUser source={uri=foto} $width="100%" $height="280px" />
        <TouchableOpacity 
        activeOpacity={0.8} 
        style={{backgroundColor:'#496BBA',position: "absolute", bottom: -20, right: 15, padding: 12, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: 'white',zIndex: 1}}
        onPress={()=> setShowModalCamera(true)}
        >
          <MaterialCommunityIcons name="camera-plus" size={24} color="white" />
        </TouchableOpacity>
      </ContainerMargin>
      <ContainerScrollView  showsVerticalScrollIndicator={false}>

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
                editable={false}
                onChangeText={(text) => {
                  setCRM(text);
                }}
                style={{zIndex:0}}
              />
            </ContainerMargin>

            <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
              <TextLabel>Especialidade:</TextLabel>
              <InputGray
                placeholder="Especialidade"
                inputMode="text"
                editable={false}
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
                  editable={false}
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
                  inputMode="decimal"
                  value={cpf}
                  editable={false}
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
            editable={disabledInput}
            disabledInput={disabledInput}
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
              editable={disabledInput}
              disabledInput={disabledInput}
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
              editable={disabledInput}
              disabledInput={disabledInput}
              onChangeText={(text) => {
                setCidade(text);
              }}
            />
          </ContainerMargin>

        </ContainerMargin>


        <ContainerMargin $mt={30} $gap={30} $mb={30}>

          <ButtonDefault textButton="Salvar" onPress={() => { alterarDadosProfile() }} />
          <ButtonDefault textButton="Editar" onPress={() => setDisableInput(true)} />
          <ButtonGray textButton="Sair do app" onPress={Logout} />

        </ContainerMargin>
      </ContainerScrollView>
      <ModalCamera setUriFotoCam={setUriFotoCam} getMediaLibary={true} showModalCamera={showModalCamera} setShowModalCamera={setShowModalCamera} navigation={navigation} />
    </Container>    
  );

}
