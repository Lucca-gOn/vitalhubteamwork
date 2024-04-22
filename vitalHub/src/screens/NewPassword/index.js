
import { BrandLogoBlue } from "../../components/BrandLogo/style";
import { Container, ContainerMargin, ContainerMarginStatusBar, ContainerSafeArea, ContainerScrollView } from "../../components/Conatainer";
import { StatusBar } from "react-native";
import { Description, Title } from "../../components/Texts/style";
import { InputGreen } from "../../components/Inputs/styled";
import { ButtonDefault } from "../../components/Buttons";
import { IconX } from "../../components/Icons/style";
import { ButtonIcon } from "../../components/Buttons/style";
import { useState } from "react";
import api from "../../service/Service";

export default function NewPassword({
  navigation,
  route
}) {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function updatePassword(){
    if(newPassword === confirmPassword){
      await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,{
        senhaNova: newPassword
      }).then( async () =>{
        //navigation.replace('Login')
        try {
          const response = await api.post('/Login', {            
            email: route.params.emailRecuperacao,
            senha: newPassword            
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
      }).catch(error => {
        alert(`Erro ao atualizar a senha : `, error);
      })
    }
  }

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

        <Title>Redefinir senha</Title>

        <ContainerMargin $mt={15}>
          <Description>
            Insira e confirme a sua nova senha
          </Description>
        </ContainerMargin>

        <ContainerMargin $gap={15} $mt={20}>
          <InputGreen
            placeholder="Nova Senha"
            enterKeyHint="next"
            keyboardType="default"
            value={newPassword}
            onChangeText={(text)=> setNewPassword(text)}
            maxLength={50}
            secureTextEntry={true}
          />
          <InputGreen
            placeholder="Confirmar nova senha"
            enterKeyHint="enter"
            keyboardType="default"
            value={confirmPassword}
            maxLength={50}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={15} $mb={30}>
          <ButtonDefault textButton="Confirmar nova senha" onPress={() => updatePassword()} />
        </ContainerMargin>

      </ContainerScrollView>

    </ContainerMarginStatusBar>
  )
} 