
import { StatusBar, Text, TouchableOpacity, View } from "react-native"
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer"
import { ImageUser } from "../../components/Images/style"
import { TextCancelAppointment, TextInformation, TextLabel, TextQuickSandRegular, Title } from "../../components/Texts/style"
import { InputGreen, InputGreenMultiLine } from "../../components/Inputs/styled"
import { ButtonDefault, ButtonGreen } from "../../components/Buttons"
import { LinkUnderlineDefault } from "../../components/Links"
import { Stethoscope } from "../../components/Stethoscope"
import { Image } from "expo-image"
import { ModalCamera } from "../../components/Modals"
import { useEffect, useState } from "react"
import api from "../../service/Service"


export default function MedicalRecord({
  navigation,
  route
}) {
  const [showModalCamera, setShowModalCamera] = useState(false)
  const [disabledInput, setDisableInput] = useState(false)
  
  const nomePaciente = route.params.dadosConsulta.paciente.idNavigation.nome;
  const email = route.params.dadosConsulta.paciente.idNavigation.email;
  const descricaoConsulta = route.params.dadosConsulta.descricao;
  const diagnosticoPaciente = route.params.dadosConsulta.diagnostico;
  const prescricaoMedica = route.params.dadosConsulta.receita;
  const idade = route.params.idade
  const foto = route.params.dadosConsulta.paciente.idNavigation.foto;
  const role = route.params.role;
  const fotoCam = route.params.fotoCam
  const situacaoConsulta = route.params.dadosConsulta.situacao.situacao

  
  console.log(route.params.dadosConsulta)

  function verificaProntuario() {

    diagnosticoPaciente !== undefined || diagnosticoPaciente !== undefined || prescricaoMedica !== undefined ?
      setDisableInput(true) :
      setDisableInput(false)
  }

  async function alterarDadosConsulta(){
    const response = await api.put('/Consultas/Prontuario', {
      id : route.params.dadosConsulta.id,
      
    })
  }

  useEffect(() => {
    verificaProntuario()
  }, [])
  return (
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />

      <ImageUser source={foto !== undefined && foto !== 'string' ? { uri: foto } : require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >

        <ContainerMargin $mt={20} $width="100%">

          <Title>
            {nomePaciente}
          </Title>

        </ContainerMargin>

        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">

          <TextQuickSandRegular>
            {
              idade < 2 ?
                idade + ' ano' :
                idade + ' anos'
            }
          </TextQuickSandRegular>

          <TextQuickSandRegular>
            {email}
          </TextQuickSandRegular>

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>

          <TextLabel>Descrição da consulta</TextLabel>

          <InputGreenMultiLine placeholder="Inserir descrição" editable={!disabledInput} disabledInput={disabledInput} value={descricaoConsulta} />

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Diagnóstico do paciente</TextLabel>

          <InputGreen placeholder="Inserir diagnóstico" editable={!disabledInput} disabledInput={disabledInput} value={diagnosticoPaciente} />

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Prescrição médica</TextLabel>

          <InputGreenMultiLine editable={!disabledInput} placeholder="Inserir prescrição medica" disabledInput={disabledInput} value={prescricaoMedica} />

        </ContainerMargin>

        {
          role !== 'Medico' ? (

            <>

              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

                <TextLabel>Exames médicos</TextLabel>

                <ContainerMargin $width="100%" $height="111px" $bgColor="#F5F3F3" $borderRadius={5} $fd="row" $gap={9}>
                  {fotoCam !== undefined ?

                    <Image source={fotoCam !== undefined ? { uri: fotoCam.photoCam } : require('../../assets/images/NotImage.svg')} style={{ width: "100%", height: '100%', resizeMode: "cover" }} />
                    :
                    <>
                      <Image source={require('../../assets/images/ImageExclamation.svg')} style={{ width: 16, height: 18 }} />
                      <TextInformation>Nenhuma foto informada</TextInformation>
                    </>

                  }
                </ContainerMargin>

              </ContainerMargin>

              <ContainerMargin $fd="row" $justContent="space-between" $mt={10}>

                <ButtonGreen onPress={() => { setShowModalCamera(true) }} />

                <TextCancelAppointment style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>Cancelar</TextCancelAppointment>

              </ContainerMargin>
            </>
          ) :
            <></>
        }



        <ContainerMargin $mt={30} $gap={30} $mb={30}>

          <ButtonDefault textButton="Salvar"
            onPress={() => {

             
      
                
                
            }} />

          <ButtonDefault textButton="Editar" disabled={!disabledInput} disabledInput={!disabledInput} onPress={() => setDisableInput(false)} />

          <LinkUnderlineDefault onPress={() => { navigation.replace('Home') }}>Cancelar</LinkUnderlineDefault>

        </ContainerMargin>

      </ContainerScrollView>

      <ModalCamera showModalCamera={showModalCamera} setShowModalCamera={setShowModalCamera} navigation={navigation} />

    </Container>
  )
}