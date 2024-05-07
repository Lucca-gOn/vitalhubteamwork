
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { IconX } from "../../components/Icons/style";
import { ButtonIcon } from "../../components/Buttons/style";
import { useState } from "react";
import api from "../../service/Service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { validNewPassWord } from "../../utils/validForm";


export default function NewPassword({
  navigation,
  route
}) {

  const [newPassword, setNewPassword] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirPassword, setShowConfirPassword] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  const [statusResponseNewPassword,setStatusResponseNewPassword] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false);

  async function updatePassword() {
    if (newPassword === confirmPassword) {
      await api.put(`/Usuario/AlterarSenha?email=${route.params.email}`, {
        senhaNova: newPassword
      }).then(async () => {
        //navigation.replace('Login')
        try {
          const response = await api.post('/Login', {
            email: route.params.email,
            senha: newPassword
          })
          //console.log(response.data)
          //await AsyncStorage.setItem('token', JSON.stringify(response.data))

          await Login()
          setTimeout(() => {
            setButtonDisable(false)
                  setStatusResponseNewPassword(false)
          }, 250)
        } catch (error) {
          setButtonDisable(false)
                  setStatusResponseNewPassword(false)
          console.log(error)
          alert('Problema ao tentar conectar com o servidor, favor acionar o suporte');

        }
      }).catch(error => {
        setButtonDisable(false)
                  setStatusResponseNewPassword(false)
        alert(`Erro ao atualizar a senha : `, error);
      })
    }
  }

  async function Login() {
    try {
      const response = await api.post('/Login', {  email:route.params.email, senha: newPassword });
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      navigation.replace("Main");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <ButtonIcon onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          })
        }}>
          <IconX />
        </ButtonIcon>
        <BrandLogoBlue />
      </ContainerMargin>

      <ContainerScrollView>

        <Title>Redefinir senha</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Insira e confirme a sua nova senha
          </Description>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20}>
          <ContainerMargin $width="100%" style={{ position: "relative" }}>

            <InputGreen
              placeholder="Nova Senha"
              enterKeyHint="next"
              keyboardType="default"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              maxLength={50}
              secureTextEntry={!showPassword}
              onEndEditing={() => {
                if (!validNewPassWord(newPassword)) {
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
              placeholder="Confirmar nova senha"
              enterKeyHint="enter"
              keyboardType="default"
              value={confirmPassword}
              maxLength={50}
              secureTextEntry={!showConfirPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              onEndEditing={() => {
                if (!(newPassword === confirmPassword)) {
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

          {confirmPassword !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroConfirmarSenha}</Text> : <></>}

          {erroGeral !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroGeral}</Text> : <></>}
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={15} $mb={30}>
          <ButtonDefault
            disabled={buttonDisable}
            statusResponse={statusResponseNewPassword}
            textButton="Confirmar nova senha"
            onPress={() => {
              if (newPassword !== '' && confirmPassword !== '') {
                if (validNewPassWord(newPassword) && (newPassword === confirmPassword)) {
                  setButtonDisable(true)
                  setStatusResponseNewPassword(true)
                  updatePassword()
                  setErroGeral('')
                } else {
                  setErroGeral('Necessário rever os erros acima antes de continuar.')
                }
              } else {
                setErroGeral('Favor preencher todos os campos')
              }
            }} />
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 