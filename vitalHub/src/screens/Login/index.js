import {StatusBar} from "react-native";
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { ButtonDefault, ButtonGoogle } from "../../components/Buttons";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { InputGreen } from "../../components/Inputs/styled";
import { LinkBlueLigth, LinkGray } from "../../components/Links";
import { TextGrayDark, Title } from "../../components/Texts/style";
import { useState } from "react";
import api from '../../service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const DataMedico = [
//   { id: 1, nome: 'Allan Rodrigues dos Santos', email: 'allan@allan.com', senha: 'admin', image: 'https://github.com/AllanR1991.png', typeUser: 'admin' , idade: 12, crm: 'CRM/SP 123456', funcao: ['Demartologia', 'Esteticista'], dataNascimento: '13/08/1991', cpf:12345678912, endereco: 'Rua Oswaldo Stuchi, 120', cep: '09791770', cidade:'Moema', estado: 'sp' },
//   { id: 2, nome: 'Everton', email: 'allan@allan.com', senha: 'admin', image: 'https://github.com/AllanR1991.png', typeUser: 'admin' , idade: 12, crm: 'CRM/SP 123456', funcao: ['Demartologia', 'Esteticista'], dataNascimento: '13/08/1991', cpf:12345678912, endereco: 'Rua Oswaldo Stuchi, 120', cep: '09791770', cidade:'Moema', estado: 'sp' },
// ]

// const DataPaciente = [
//   { id: 1, nome: 'Allan Rodrigues dos Santos', email: 'allan@allan.com', senha: 'admin', image: 'https://github.com/AllanR1991.png', typeUser: 'admin' , idade: 12, crm: 'CRM/SP 123456', funcao: ['Demartologia', 'Esteticista'] },
//   { id: 2, nome: 'Carlos', email: 'carlos@carlos.com', senha: 'user', image: 'https://github.com/Carlos-Augusto-Roque.png', typeUser: 'paciente' },
//   { id: 3, nome: 'Evelin', email: 'evelin@evelin.com', senha: 'user', image: 'https://github.com/evy-oliveira0807.png', typeUser: 'paciente' },
// ]

export default function Login({
  navigation
}) {
  //Chamar a funcao de login
  async function Login(){
    
    // chamar a api de login 
    const response = await api.post('/Login',{
      email:'lucas@lucas.com',
      senha:'lucas'
    })
    
    await AsyncStorage.setItem('token', JSON.stringify(response.data))

    .then(res=>{
      console.log(res)
      navigation.navigate('Main')
  })
    .catch(error=> console.log(error))
  }

  const [email, setEmail] = useState('');
  const [senha,setSenha] = useState('');
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
            onChangeText={(txt) => setEmail(txt)}
            // onChange={event => event.nativeEvent.text}
          />

          <InputGreen
            placeholder="Senha"
            enterKeyHint="enter"
            keyboardType="default"
            inputMode="text"
            maxLength={50}
            secureTextEntry={true}
            value={senha}
            onChangeText={(txt)=>setSenha(txt)}
          />
        </ContainerMargin>

        <LinkGray onPress={() => { navigation.navigate('RecoveryPassWord') }}>Esqueceu sua senha?</LinkGray>

        <ContainerMargin $mt={42} $gap={15} $mb={30}>
          <ButtonDefault textButton="Entrar" onPress={()=> {Login()}}/>
          <ButtonGoogle textButton="Entrar com google" onPress={()=> {Login()}}/>
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