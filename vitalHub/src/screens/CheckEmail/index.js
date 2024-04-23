
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar } from "react-native";
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


  const [codigo,setCodigo] = useState('');

  const inputs = [
    useRef(null),useRef(null),useRef(null),useRef(null)
  ]

  function focusNextInput(index){
    // Verificar se o index é menor que a quantidade de campos
    if(index < inputs.length -1){
      inputs[index+1].current.focus()
    }
  }

  function focusPrevInput(index){
    if(index > 0){
      inputs[index -1].current.focus()
    }
  }

  async function validarCodigo(){
    console.log(codigo);

    await api.post(`RecuperarSenha/ValidarCoidgoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
    .then(
      navigation.replace('NewPassword',{email: route.params.emailRecuperacao })
    ).catch(error => {
      console.log(`Erro ao enviar o codigo de recupereção de senha : ${error}`)
    })
   
  }

  useEffect(()=>{
    inputs[0].current.focus()
  }, [])
  return (
    <ContainerMarginStatusBar>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} currentHeight />

      <ContainerMargin $mb={25} $mt={20}>
        <ButtonIcon onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }]
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
            [0,1,2,3].map((index)=> (
              <InputGreenCode 
                ref={inputs[index]} 
                key={index} 
                onChangeText={(text)=>{
                  // Verificar se o texto não é vazio (pra voltar para o campo anterior)
                  if(text == ''){
                    focusPrevInput(index)
                  }else{
                    // Separa os valore em arrays
                    const novoCodigo = [...codigo]
                    // corrige o valo de acrodo com a posicao
                    novoCodigo[index] = text
                    setCodigo(novoCodigo.join(''))
                    // Verificar se o campo tem 1 caracter (passa pro proximo campo)
                    focusNextInput(index);
                  }
              }}/>
            ))
          }
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Continuar" onPress={() => validarCodigo()} />

          <LinkUnderlineDefault>Reenviar código</LinkUnderlineDefault>
        </ContainerMargin>



      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 