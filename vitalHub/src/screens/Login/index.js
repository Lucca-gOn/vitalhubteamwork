import { ActivityIndicator, StatusBar, Text } from "react-native";
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

export default function Login({
  navigation
}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [statusResponseLogin, setStatusResponseLogin] = useState(false);
  const [statusResponseLoginGoogle, setStatusResponseLoginGoogle] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [checkEmail, setCheckEmail] = useState(true);
  const isFocused = useIsFocused();

  //Chamar a funcao de login
  async function Login() {
    // chamar a api de login 
    if (isFocused) {
      console.log('FIZ REQUISIÇÃO')
      try {
        const response = await api.post('/Login', {
          email: 'caio@caio.com',
          senha: 'caio'
          //email: 'lucas@lucas.com',
          //senha: 'lucas'
          // email: 'allan@allan.com',
          // senha: 'allan'
        })
        //console.log(response.data)
        await AsyncStorage.setItem('token', JSON.stringify(response.data))

        navigation.navigate('Main')
          setTimeout(()=>{
            setStatusResponseLogin(false),
            setStatusResponseLoginGoogle(false),
            setButtonDisable(false)
          },250)  
      } catch (error) {
        console.log(error)
        alert('Problema ao tentar conectar com o servidor, favor acionar o suporte');
        
      }
    }

  }

  useEffect(()=> {
    const unsucscribe = navigation.addListener('transitionEnd', (e) => {
      setStatusResponseLogin(false)
      setStatusResponseLoginGoogle(false)
      setButtonDisable(false)
    })
    return unsucscribe;
  },[navigation])
  // validEmail(email)

  useEffect(() => {
    setButtonDisable(!isFocused);
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
          // onBlur={()=>{
          //   setCheckEmail(validEmail(email));
          // }}

          />
          {!checkEmail ? <Text>Email invalido</Text> : <></>}

          <InputGreen
            placeholder="Senha"
            enterKeyHint="enter"
            keyboardType="default"
            inputMode="text"
            maxLength={50}
            secureTextEntry={true}
            value={senha}
            onChangeText={(txt) => setSenha(txt)}
          />
        </ContainerMargin>

        <LinkGray onPress={() => { navigation.navigate('RecoveryPassWord') }}>Esqueceu sua senha?</LinkGray>

        <ContainerMargin $mt={42} $gap={15} $mb={30}>
          <ButtonDefault statusResponse={statusResponseLogin} textButton='Entrar' disabled={buttonDisable}
            onPress={() => {
              Login()
              setStatusResponseLogin(true)
              setButtonDisable(true)
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

