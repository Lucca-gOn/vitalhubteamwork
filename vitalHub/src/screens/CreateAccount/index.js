import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Description, TextLabel, Title } from "../../components/Texts/style";
import { InputGreen, MaskInputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import { useState } from "react";
import { validarCPF, formatarDataNascimento } from "../../utils/validForm/";
import api from '../../service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createGlobalStyle } from "styled-components";
import { validDataNasciemnto, validEmail, validName, validNewPassWord, validRG } from "../../utils/validForm";
import { FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import MaskInput from "react-native-mask-input";

export default function CreateAccount({
  navigation
}) {

  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [erroCpf, setErroCpf] = useState('');
  const [rg, setRg] = useState('');
  const [erroRg, setErroRg] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erroDataNacimento, setErroDataNacimento] = useState('');
  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
  const [validCpf, setValidCpf] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirPassword, setShowConfirPassword] = useState(false);

  const [erroGeral, setErroGeral] = useState('');

  const [buttonDisable, setButtonDisable] = useState(false);
  const [statusResponseCadastro, setStatusResponseCadastro] = useState(false);
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
  const handleRgChange = (text) => setRg(text);
  const handleConfirmarSenhaChange = (text) => setConfirmarSenha(text);



  // Funções de API
  async function account() {

    console.log(`
      nome: ${nome}
      email: ${email}
      data: ${dataNascimento}
      rg : ${rg}
      cpf: ${cpf}
      senha: ${senha}
    `)

    console.log('criando conta')
    const formData = new FormData();
    formData.append('Cpf', cpf.replace(/[^\d]/g, ""));
    formData.append('Rg', rg);
    formData.append('DataNascimento', dataNascimento);
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
      console.log("Erro ao criar conta:", error.response.data);
      if ((error.response.status == 400) && Array.isArray(error.response.data)) {
        const mensagensErro = error.response.data;
        const mensagensFormatadas = mensagensErro.join('\n');
        setErroGeral(mensagensFormatadas);
      }
      setButtonDisable(false)
      setStatusResponseCadastro(false)
    }
  }

  async function Login() {
    try {
      console.log('entrou no login')
      console.log(email)
      console.log(senha)
      const response = await api.post('/Login', { email, senha });
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      navigation.replace("Profile");
      setTimeout(() => {
        setButtonDisable(false)
        setStatusResponseCadastro(false)
      }, 250)
    } catch (error) {
      console.log(error);
      setButtonDisable(false)
      setStatusResponseCadastro(false)
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
            autoCapitalize={"words"}
            enterKeyHint="next"
            onEndEditing={() => {
              setNome(nome.trim())
              if (!validName(nome.trim())) {
                setErroNome('O campo deve ter no mínimo três caracteres!')
              } else {
                setErroNome('');
              }
            }}
          />

          {erroNome !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroNome}</Text> : <></>}

          <MaskInputGreen
            placeholder="RG"
            value={rg}
            onChangeText={(masked, unmasked) => { handleRgChange(unmasked) }}
            keyboardType="default"
            maxLength={12}
            onEndEditing={() => {
              if (!validRG(rg)) {
                setErroRg('RG digitado está inválido.')
              } else {
                setErroRg('');
              }
            }}
            mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /[\dA-Za-z]/]}
          />

          {erroRg !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroRg}</Text> : <></>}

          <MaskInputGreen
            placeholder="CPF"
            value={cpf}
            onChangeText={(masked, unmasked) => { handleCPFChange(unmasked) }}
            keyboardType="numeric"
            maxLength={14}
            onEndEditing={() => {
              if (!validarCPF(cpf)) {
                setErroCpf('Cpf digitado está inválido.')
              } else {
                setErroCpf('');
              }
            }}
            mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          />

          {erroCpf !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroCpf}</Text> : <></>}

          <InputGreen
            placeholder="Data nascimento"
            value={dataNascimento}
            onChangeText={handleDataNascimentoChange}
            keyboardType="numeric"
            maxLength={10}
            enterKeyHint="next"
            onEndEditing={() => {
              if (!validDataNasciemnto(dataNascimento)) {
                setErroDataNacimento('A data inserida não é válida!')
              } else {
                setErroDataNacimento('');
              }
            }}
          />

          {erroDataNacimento !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroDataNacimento}</Text> : <></>}

          <InputGreen
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            maxLength={50}
            onEndEditing={() => {
              setEmail(email.trim())
              if (!validEmail(email)) {
                setErroEmail('Email inválido, ex: teste@teste.com')
              } else {
                setErroEmail('');
              }
            }}
          />

          {erroEmail !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroEmail}</Text> : <></>}

          <ContainerMargin $width="100%" style={{ position: "relative" }}>

            <InputGreen
              placeholder="Senha"
              value={senha}
              onChangeText={handleSenhaChange}
              keyboardType="default"
              maxLength={50}
              secureTextEntry={!showPassword}
              enterKeyHint="next"
              onEndEditing={() => {
                if (!validNewPassWord(senha)) {
                  setErroSenha('A senha deve conter 8 catacteres e incluir no minimo uma letra minuscula, uma maisucula um numero e um caracter especial. ')
                } else {
                  setErroSenha('');
                }
              }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 0, padding: 10 }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color="#34898F" />

            </TouchableOpacity>

          </ContainerMargin>


          {erroSenha !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroSenha}</Text> : <></>}

          <ContainerMargin $width="100%" style={{ position: "relative" }}>

            <InputGreen
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChangeText={handleConfirmarSenhaChange}
              keyboardType="default"
              maxLength={50}
              secureTextEntry={!showConfirPassword}
              enterKeyHint="enter"
              onEndEditing={() => {
                if (!(senha === confirmarSenha)) {
                  setErroConfirmarSenha('Senhas não são iguais')
                } else {
                  setErroConfirmarSenha('');
                }
              }}

            />
            <TouchableOpacity
              style={{ position: "absolute", right: 0, padding: 10 }}
              onPress={() => setShowConfirPassword(!showConfirPassword)}
            >
              <FontAwesome name={showConfirPassword ? "eye-slash" : "eye"} size={24} color="#34898F" />

            </TouchableOpacity>

          </ContainerMargin>

          {erroConfirmarSenha !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroConfirmarSenha}</Text> : <></>}

          {erroGeral !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroGeral}</Text> : <></>}
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault
            disabled={buttonDisable}
            statusResponse={statusResponseCadastro}
            textButton="Cadastrar"
            onPress={() => {
              if (nome !== '' && cpf !== '' && dataNascimento !== '' && email !== '' && senha !== '' && confirmarSenha !== '') {
                if (validName(nome) && validDataNasciemnto(dataNascimento) && validEmail(email) && validNewPassWord(senha) && (senha === confirmarSenha)) {
                  account()
                  setErroGeral('')
                  setButtonDisable(true)
                  setStatusResponseCadastro(true)
                } else {

                  setErroGeral('Necessário rever os erros acima antes de continuar.')
                }
              } else {
                console.log('erro')
                setErroGeral('Favor preencher todos os campos')
              }
            }}
          />

          <LinkUnderlineDefault onPress={() => {
            navigation.goBack()
          }}>Cancelar</LinkUnderlineDefault>
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 