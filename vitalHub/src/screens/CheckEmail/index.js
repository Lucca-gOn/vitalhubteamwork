
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar, Text } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreenCode } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { IconX } from "../../components/Icons/style";
import { LinkBlueMedium, LinkUnderlineDefault } from "../../components/Links";
import { ButtonIcon } from "../../components/Buttons/style";
import api from "../../service/Service";
import { useEffect, useRef, useState } from "react";

export default function CheckEmail({
  navigation,
  route
}) {


  const [codigo, setCodigo] = useState('0000');
  const [erroGeral, setErroGeral] = useState('');
  const [erroReenvioCodigo, setErroReenvioCodigo] = useState('');
  const [statusResponseCodigo, setStatusResponseCodigo] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);

  const inputs = [
    useRef(null), useRef(null), useRef(null), useRef(null)
  ]

  function focusNextInput(index) {
    // Verificar se o index é menor que a quantidade de campos
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus()
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputs[index - 1].current.focus()
    }
  }

  async function reenviarCodico() {
    await api.post(`/RecuperarSenha?email=${route.params.emailRecuperacao}`)
      .then(() => {
        setErroReenvioCodigo('Código reenviado com sucesso.')
        alert('Código reenviado com sucesso.')
        setButtonDisable(false)
      }).catch(
        error => {
          setButtonDisable(false)
        }
      )
  }

  async function validarCodigo() {
    console.log(codigo);
    console.log(route.params.emailRecuperacao);
    try {
      await api.post(`RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
      navigation.replace('NewPassword', { email: route.params.emailRecuperacao })
      setTimeout(() => {
        setStatusResponseCodigo(false),
          setButtonDisable(false)
      }, 250)
    } catch (error) {
      console.log(error.response)
      console.log(`Erro ao enviar o codigo de recupereção de senha : ${error.response}`)
      if (error.response.status = 400) {
        setErroGeral(error.response.data)
      }
      setStatusResponseCodigo(false),
        setButtonDisable(false)
    }
    // .then(
    //   console.log('aceitou o codigo'),
    //   navigation.replace('NewPassword', { email: route.params.emailRecuperacao })
    // ).catch((error) => {
    //   console.log(`Erro ao enviar o codigo de recupereção de senha : ${error}`)
    // })
  }

  useEffect(() => {
    inputs[0].current.focus()
  }, [])
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

        <Title>Verifique seu e-mail</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Digite o código de 4 dígitos enviado para
          </Description>
          <LinkBlueMedium>
            {route.params.emailRecuperacao}
          </LinkBlueMedium>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20} $fd="row" $justContent="space-between">
          {/* <InputGreenCode />
          <InputGreenCode />
          <InputGreenCode />
          <InputGreenCode /> */}
          {
            [0, 1, 2, 3].map((index) => (
              <InputGreenCode
                ref={inputs[index]}
                key={index}
                value={codigo[index]}
                onChangeText={(text) => {
                  // Verificar se o texto não é vazio (pra voltar para o campo anterior)
                  if (text == '') {
                    focusPrevInput(index)
                  } else {
                    setButtonDisable(false)
                    setErroGeral('')
                    // Separa os valore em arrays
                    const novoCodigo = [...codigo]
                    // corrige o valo de acrodo com a posicao
                    novoCodigo[index] = text
                    setCodigo(novoCodigo.join(''))
                    // Verificar se o campo tem 1 caracter (passa pro proximo campo)
                    focusNextInput(index);
                  }
                }} />
            ))
          }


        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          {erroGeral !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroGeral}</Text> : <></>}
          <ButtonDefault disabled={buttonDisable} statusResponse={statusResponseCodigo} textButton="Continuar" onPress={
            () => {
              console.log('antes do if', codigo)
              if ((codigo !== '0000') && (codigo > 999) && (codigo < 9999)) {
                setStatusResponseCodigo(true)
                setButtonDisable(true)
                validarCodigo()
              }
            }
          } />

          <LinkUnderlineDefault
            disabled={buttonDisable}
            onPress={() => {
              setButtonDisable(true)
              reenviarCodico()
            }}>
            Reenviar código
          </LinkUnderlineDefault>

          {/* {erroReenvioCodigo !== '' ? <Text style={{ color: '#496BBA', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroReenvioCodigo}</Text> : <></>} */}
        </ContainerMargin>



      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 