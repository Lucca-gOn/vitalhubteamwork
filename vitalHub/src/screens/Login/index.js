import { ActivityIndicator, StatusBar, Text, TouchableOpacity } from "react-native";
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { ButtonDefault, ButtonGoogle } from "../../components/Buttons";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { InputGreen } from "../../components/Inputs/styled";
import { LinkBlueLigth, LinkGray } from "../../components/Links";
import { TextGrayDark, Title } from "../../components/Texts/style";
import { useEffect, useState } from "react";
import api from '../../service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validEmail } from "../../utils/validForm";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';


export default function Login({
  navigation
}) {
  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const [statusResponseLogin, setStatusResponseLogin] = useState(false);
  const [statusResponseLoginGoogle, setStatusResponseLoginGoogle] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [showConfirPassword, setShowConfirPassword] = useState(false);

  const isFocused = useIsFocused();

  //Chamar a funcao de login
  async function Login() {

    // chamar a api de login 
    if (isFocused) {
      try {
        const response = await api.post('/Login', {
          email: email,
          senha: senha
          //email: 'lucas@lucas.com',
          //senha: 'lucas'
          // email: 'allan@allan.com',
          // senha: 'allan'
          // email: 'caio@caio.com',
          // senha: 'caio'
        })
        //console.log(response.data)
        await AsyncStorage.setItem('token', JSON.stringify(response.data))

        setErroGeral('')

        navigation.navigate('Main')
        setTimeout(() => {
          setStatusResponseLogin(false),
            setStatusResponseLoginGoogle(false),
            setButtonDisable(false)
        }, 250)
      } catch (error) {
        setErroGeral('')
        console.log(error)
        //alert('Problema ao tentar conectar com o servidor, favor acionar o suporte');
        setStatusResponseLogin(false)
        setStatusResponseLoginGoogle(false)
        setButtonDisable(false)

        if (error.response) {
          // O servidor respondeu com um código de status diferente de 2xx
          console.log('Erro de status:', error.response.status);
          console.log('Dados de erro:', error.response.data);
          if (error.response.status == 401) {
            setErroGeral(error.response.data);
          }
        } else if (error.request) {
          // A solicitação foi feita, mas não recebeu resposta
          //console.log('Erro de solicitação:', error.request);
        } else {
          // Algo aconteceu ao configurar a solicitação que desencadeou um erro
          //console.log('Erro ao configurar a solicitação:', error.message);
        }
        //console.log('Erro:', error.config);
        //console.log('Erro:', error.response);
      }
    }
  }

  useEffect(() => {
    const unsucscribe = navigation.addListener('transitionEnd', (e) => {
      setStatusResponseLogin(false)
      setStatusResponseLoginGoogle(false)
      setButtonDisable(false)
    })
    return unsucscribe;
  }, [navigation])
  // validEmail(email)

  useEffect(() => {
    setButtonDisable(!isFocused);
    setEmail('');
    setSenha('');
  }, [isFocused]);
  return (

    // <ContainerSafeArea style={{ justifyContent: "center", alignItems: "center" }}>
    // Com safeArea o ScrollView esta com comportamento indevido.
    <ContainerMarginStatusBar>
      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} />


      <ContainerMargin $mb={25} $mt={20}>
        <BrandLogoBlue />
      </ContainerMargin>
      <ContainerScrollView $margin="80px">
        <Title>Entrar ou criar conta</Title>
        <ContainerMargin $gap={15} $mt={20} $mb={10}>
          <InputGreen
            placeholder="Usuário ou E-mail"
            enterKeyHint="next"
            keyboardType="email-address"
            inputMode="email"
            maxLength={50}
            value={email}
            onChangeText={(txt) => {
              setEmail(txt)
            }}
            onEndEditing={() => {
              if (!validEmail(email)) {
                setErroEmail('Email nâo é válido. Ex: teste@teste.com')
              } else {
                setErroEmail('')
              }
            }}
          />
          {erroEmail !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroEmail}</Text> : <></>}

          <ContainerMargin $width="100%" style={{ position: "relative" }}>
            <InputGreen
              placeholder="Senha"
              enterKeyHint="enter"
              keyboardType="default"
              inputMode="text"
              maxLength={50}
              secureTextEntry={!showConfirPassword}
              value={senha}
              onChangeText={(txt) => setSenha(txt)}

            />

            <TouchableOpacity
              style={{ position: "absolute", right: 0, padding: 10 }}
              onPress={() => setShowConfirPassword(!showConfirPassword)}
            >
              <FontAwesome name={showConfirPassword ? "eye-slash" : "eye"} size={24} color="#34898F" />

            </TouchableOpacity>
          </ContainerMargin>
          {erroGeral !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroGeral}</Text> : <></>}
        </ContainerMargin>


        <LinkGray onPress={() => { navigation.navigate('RecoveryPassWord') }}>Esqueceu sua senha?</LinkGray>

        <ContainerMargin $mt={42} $gap={15} $mb={30}>
          <ButtonDefault statusResponse={statusResponseLogin} textButton='Entrar' disabled={buttonDisable}
            onPress={() => {
              if (email !== '' && senha !== '') {
                setErroGeral('')
                if (validEmail(email)) {
                  Login()
                  setStatusResponseLogin(true)
                  setButtonDisable(true)

                }

              } else {
                setErroGeral('Necessário preenchimento dos campos acima!')
              }
            }} />
          <ButtonGoogle statusResponse={statusResponseLoginGoogle} textButton="Entrar com google" disabled={buttonDisable} onPress={() => {
            Login()
            setStatusResponseLoginGoogle(true)
            setButtonDisable(true)
          }} />
        </ContainerMargin>

        <ContainerMargin $fd="row" $mb={30} >
          <TextGrayDark>Não tem conta? </TextGrayDark>
          <LinkBlueLigth onPress={() => { navigation.navigate('CreateAccount') }}>Crie uma conta agora!</LinkBlueLigth>
        </ContainerMargin>
      </ContainerScrollView>
    </ContainerMarginStatusBar>
    // </ContainerSafeArea>
  )
}

