
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar, Text } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { IconBack } from "../../components/Icons/style";
import { ButtonIcon } from "../../components/Buttons/style";
import { useState } from "react";
import api from '../../service/Service'
import { validEmail } from "../../utils/validForm";

export default function RecoveryPassWord({
  navigation
}) {

  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [statusResponseEmail, setStatusResponseEmail] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);

  async function enviarEmail() {
    await api.post(`/RecuperarSenha?email=${email}`)
      .then(() => {
        navigation.replace('CheckEmail', { emailRecuperacao: email });
        setTimeout(() => {
          setStatusResponseEmail(false),
            setButtonDisable(false)
        }, 250)
      }).catch(
        error => {
          if (error.response.status == 404) {
            setErroEmail(error.response.data)
          }
          setStatusResponseEmail(false),
            setButtonDisable(false)
          //alert(`Erro ao fazer requisiçao de recuperar senha: `, error.response);
        }
      )
  }

  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <ButtonIcon onPress={() => navigation.goBack()}>
          <IconBack />
        </ButtonIcon>
        <BrandLogoBlue />
      </ContainerMargin>

      <ContainerScrollView>

        <Title>Recuperar senha</Title>

        <ContainerMargin $mt={15}>
          <Description>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</Description>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20}>
          <InputGreen
            placeholder="Usuário ou E-mail"
            enterKeyHint="next"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => 
            {
              setEmail(text)
              setErroEmail('')
              }
            }
            maxLength={50}
            onEndEditing={() => {
              if (!validEmail(email)) {
                setErroEmail('Email inválido, ex: teste@teste.com')
                setButtonDisable(true)
              } else {
                setButtonDisable(false)
                setErroEmail('');
              }
            }}
          />

          {erroEmail !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroEmail}</Text> : <></>}
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={15} $mb={30}>
          <ButtonDefault
            statusResponse={statusResponseEmail}
            disabled={buttonDisable}
            textButton="Continuar"
            onPress={() => {
              if (email !== '') {
                if (validEmail(email)) {
                  setButtonDisable(true)
                  setStatusResponseEmail(true)
                  enviarEmail()
                }
              }else{
                setErroEmail('Necessário preencher os campos acima')
              }
            }
            }

          />
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 