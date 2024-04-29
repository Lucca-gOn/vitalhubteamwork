import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import { useState } from "react";
import { validarCPF, formatarDataNascimento } from "../../utils/validForm/";
import api from '../../service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreateAccount({
  navigation
}) {

  const [nome, setNome] = useState("teste");
  const [cpf, setCpf] = useState("51021784826");
  const [dataNascimento, setDataNascimento] = useState("22102001");
  const [email, setEmail] = useState("teste@teste.com");
  const [senha, setSenha] = useState("123");
  const [confirmarSenha, setConfirmarSenha] = useState("123");
  const [validCpf, setValidCpf] = useState(true);

  // Handlers
  const handleCPFChange = (text) => {
    setCpf(text);
    setValidCpf(validarCPF(text));
  };

  const handleDataNascimentoChange = (text) => {
    setDataNascimento(formatarDataNascimento(text));
  };

  const handleNomeChange = (text) => setNome(text);
  const handleEmailChange = (text) => setEmail(text);
  const handleSenhaChange = (text) => setSenha(text);
  const handleConfirmarSenhaChange = (text) => setConfirmarSenha(text);

  // Funções de API
  async function account() {
    const formData = new FormData();
    formData.append('Cpf', cpf.replace(/[^\d]/g, ""));
    formData.append('DataNascimento', "");
    formData.append('Cep', "");
    formData.append('Logradouro', "");
    formData.append('Numero', "");
    formData.append('Cidade', "");
    formData.append('Nome', nome);
    formData.append('Email', email);
    formData.append('Senha', senha);
    formData.append("IdTipoUsuario", "95636771-8410-4AC7-A0BE-F9AF57AEF3CD");
    formData.append("Arquivo", "");
    formData.append("Foto", "");

    try {
      await api.post('/Pacientes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await Login(); // Chama o login após o cadastro
    } catch (error) {
      console.log("Erro ao criar conta:", error);
    }
  }

  async function Login() {
    try {
      const response = await api.post('/Login', { email, senha });
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      navigation.replace("Profile");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <BrandLogoBlue />
      </ContainerMargin>

      <ContainerScrollView>

        <Title>Criar conta</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Insira seu endereço de e-mail e senha para realizar seu cadastro.
          </Description>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20}>
          <InputGreen
            placeholder="Nome"
            value={nome}
            onChangeText={handleNomeChange}
            keyboardType="default"
            maxLength={50}
            enterKeyHint="next"
          />

          <InputGreen
            placeholder="CPF"
            value={cpf}
            onChangeText={handleCPFChange}
            keyboardType="numeric"
            maxLength={11}
          />

          <InputGreen
            placeholder="Data nascimento"
            value={dataNascimento}
            onChangeText={handleDataNascimentoChange}
            keyboardType="numeric"
            maxLength={10}
            enterKeyHint="next"
          />

          <InputGreen
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            maxLength={50}
          />

          <InputGreen
            placeholder="Senha"
            value={senha}
            onChangeText={handleSenhaChange}
            keyboardType="default"
            maxLength={50}
            secureTextEntry={true}
            enterKeyHint="next"
          />

          <InputGreen
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChangeText={handleConfirmarSenhaChange}
            keyboardType="default"
            maxLength={50}
            secureTextEntry={true}
            enterKeyHint="enter"
          />
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault
            textButton="Confirmar nova senha"
            onPress={() => account()}
          />

          <LinkUnderlineDefault onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }]
            })
          }}>Cancelar</LinkUnderlineDefault>
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 