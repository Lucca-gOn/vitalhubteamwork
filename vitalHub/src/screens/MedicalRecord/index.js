
import { StatusBar, Text, TouchableOpacity, View } from "react-native"
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer"
import { ImageUser } from "../../components/Images/style"
import { TextCancelAppointment, TextInformation, TextLabel, TextQuickSandRegular, Title } from "../../components/Texts/style"
import { InputGreen, InputGreenMultiLine } from "../../components/Inputs/styled"
import { ButtonDefault, ButtonGreen } from "../../components/Buttons"
import { LinkUnderlineDefault } from "../../components/Links"
import { Stethoscope } from "../../components/Stethoscope"
import { Image } from "expo-image"


export default  function MedicalRecord ({
  navigation,
  route
}) {

  const {name, age, email, photo} = route.params

  return (
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'}/>

      <ImageUser source={photo !== undefined ? { uri: photo } : require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >

      
      <ContainerMargin $mt={20} $width="100%">
        <Title>
          {name}
        </Title>
      </ContainerMargin>
      <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
        <TextQuickSandRegular>
          {age}
        </TextQuickSandRegular>
        <TextQuickSandRegular>
          {email}
        </TextQuickSandRegular>
      </ContainerMargin>

      <ContainerMargin $alingItens="flex-start" $gap={10}>
        <TextLabel>Descrição da consulta</TextLabel>
        <InputGreenMultiLine placeholder="Descrição"/>
      </ContainerMargin>

      <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
        <TextLabel>Diagnóstico do paciente</TextLabel>
        <InputGreen placeholder="Diagnóstico"/>
      </ContainerMargin>

      <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
        <TextLabel>Prescrição médica</TextLabel>
        <InputGreenMultiLine placeholder="Prescrição medica"/>
      </ContainerMargin>

      <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
        <TextLabel>Exames médicos</TextLabel>
        <ContainerMargin $width="100%" $height="111px" $bgColor="#F5F3F3" $borderRadius={5} $fd="row" $gap={9}>
          <Image source={require('../../assets/images/ImageExclamation.svg')} style={{width: 16, height:18}} />
          <TextInformation>Nenhuma foto informada</TextInformation>
        </ContainerMargin>
      </ContainerMargin>

      <ContainerMargin $fd="row" $justContent="space-between" $mt={10}>
        <ButtonGreen/>
        <TextCancelAppointment style={{width:'25%',paddingTop:10,paddingBottom:10 }}>Cancelar</TextCancelAppointment>
      </ContainerMargin>   

      <ContainerMargin $mt={30} $gap={30} $mb={30}>
          <ButtonDefault textButton="Salvar" />

          <ButtonDefault textButton="Editar" />

          <LinkUnderlineDefault onPress={()=> {navigation.replace('Home')}}>Cancelar</LinkUnderlineDefault>
        </ContainerMargin>
      </ContainerScrollView>

     
    </Container>
  )
}