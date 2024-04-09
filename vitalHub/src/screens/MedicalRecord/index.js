
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
<<<<<<< HEAD
import api from "../../service/Service"
import moment from "moment"
=======
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034


export default function MedicalRecord({
  navigation,
  route
<<<<<<< HEAD
}) {

  
  const [showModalCamera, setShowModalCamera] = useState(false)
  const [disabledInput, setDisableInput] = useState(false)
  
  const [descricaoConsulta, setDescricaoConsulta] = useState(route.params.dadosConsulta.descricao ? route.params.dadosConsulta.descricao : '');
  const [diagnosticoPaciente, setDiagnosticoPaciente] = useState(route.params.dadosConsulta.diagnostico ? route.params.dadosConsulta.diagnostico : '' );
  const [prescricaoMedica, setPrescricaoMedica] = useState(route.params.dadosConsulta.receita ? route.params.dadosConsulta.receita.medicamento : '');

  const dadosSituações = route.params.dadosSituacoes;

  //console.log(route.params.dadosConsulta)
  const idConsulta = route.params.dadosConsulta.id
  const nomePaciente = route.params.dadosConsulta.paciente.idNavigation.nome;
  const email = route.params.dadosConsulta.paciente.idNavigation.email;
  const idade = route.params.idade
  const foto = route.params.dadosConsulta.paciente.idNavigation.foto;
  const role = route.params.role;
  const fotoCam = route.params.fotoCam
  const situacaoConsulta = route.params.dadosConsulta.situacao.situacao

  console.log(route.params.dadosConsulta)
  function encontraIdConsultaRealizada(){
    for (const item of dadosSituações) {
      if (item.situacao === 'Realizadas') {
        return idSituacaoRealizadas = item.id;
      }
    }
  }  
  
  function verificaProntuario() {
    diagnosticoPaciente !== undefined || diagnosticoPaciente !== undefined || prescricaoMedica !== undefined ?
    setDisableInput(true) :
    setDisableInput(false)
  }
  //console.log(route.params.dadosConsulta.id)
  async function alterarDadosConsulta() {
    let idSituacaoRealizadas = encontraIdConsultaRealizada();
    try {
      await api.put('/Consultas/Prontuario', {
        id: idConsulta,
        situacaoId: idSituacaoRealizadas,
        descricao: descricaoConsulta,
        diagnostico: diagnosticoPaciente,        
        receita:{
          medicamento:prescricaoMedica,
        } ,
      })
      setDisableInput(true);
      console.log('Relizado alteracao')
    } catch (error) {
      alert('Erro ao fazer alteração nos dados: ', error)
    }
  }

  useEffect(() => {
    verificaProntuario()
    
  }, [])
=======
}) {  
  const nomePaciente = route.params.dadosConsulta.paciente.idNavigation.nome;
  const email = route.params.dadosConsulta.paciente.idNavigation.email;
  const descricaoConsulta = route.params.dadosConsulta.descricao ;
  const diagnosticoPaciente = route.params.dadosConsulta.diagnostico;
  const prescricaoMedica = route.params.dadosConsulta.receita;
  const idade = route.params.idade
  const foto = route.params.dadosConsulta.paciente.idNavigation.foto;
  const role = route.params.role;
  const fotoCam = route.params.fotoCam
  
  const [showModalCamera, setShowModalCamera] = useState(false)
  const [disabledInput, setDisableInput] = useState(false)

  function verificaProntuario(){
  
    diagnosticoPaciente!== null || diagnosticoPaciente !== null || prescricaoMedica !== null ?
    setDisableInput(true) :
      setDisableInput(false)
  }

  useEffect(()=>{
    verificaProntuario()
  },[])
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034
  return (
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />

      <ImageUser source={foto !== undefined && foto !== 'string' ? { uri: foto } : require('../../assets/images/NotImage.svg')} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >

        <ContainerMargin $mt={20} $width="100%">
<<<<<<< HEAD

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

=======
      
          <Title>
            {nomePaciente}
          </Title>
      
        </ContainerMargin>
        
        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
      
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034
          <TextQuickSandRegular>
            {
              idade < 2 ?
                idade + ' ano' :
                idade + ' anos'
            }
          </TextQuickSandRegular>
<<<<<<< HEAD

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>

          <TextLabel>Descrição da consulta</TextLabel>

          <InputGreenMultiLine placeholder="Inserir descrição" editable={!disabledInput} disabledInput={disabledInput} value={descricaoConsulta} onChangeText={(txt)=>{setDescricaoConsulta(txt)}}/>

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Diagnóstico do paciente</TextLabel>

          <InputGreen placeholder="Inserir diagnóstico" editable={!disabledInput} disabledInput={disabledInput} value={diagnosticoPaciente} onChangeText={(txt)=>{setDiagnosticoPaciente(txt)}}/>

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Prescrição médica</TextLabel>

          <InputGreenMultiLine editable={!disabledInput} placeholder="Inserir prescrição medica" disabledInput={disabledInput} value={prescricaoMedica} onChangeText={(txt)=>{setPrescricaoMedica(txt)}}/>

=======
      
          <TextQuickSandRegular>
            {email}         
          </TextQuickSandRegular>
        
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>
        
          <TextLabel>Descrição da consulta</TextLabel>
        
          <InputGreenMultiLine placeholder="Descrição" editable={!disabledInput} disabledInput={disabledInput} value={descricaoConsulta} />
        
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
        
          <TextLabel>Diagnóstico do paciente</TextLabel>
        
          <InputGreen placeholder="Diagnóstico" editable={!disabledInput} disabledInput={disabledInput} value={diagnosticoPaciente} />
        
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
        
          <TextLabel>Prescrição médica</TextLabel>
        
          <InputGreenMultiLine 
          editable={!disabledInput}
          //expressão condicional
          //(!disabledInput verdadeiro), mostra "Prescrição médica". Se esta desabilitado, deixa o placeholder vazio.
          placeholder={!disabledInput ? "Prescrição médica" : ""}
          disabledInput={disabledInput}
          //Adicionado value "" apenas para teste, consumir prescrição
          value={"Consumir prescrição"} 
          />
        
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034
        </ContainerMargin>

        {
          role !== 'Medico' ? (
<<<<<<< HEAD

            <>

              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

                <TextLabel>Exames médicos</TextLabel>

=======
            <>


              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
        
                <TextLabel>Exames médicos</TextLabel>
        
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034
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
<<<<<<< HEAD

              </ContainerMargin>

              <ContainerMargin $fd="row" $justContent="space-between" $mt={10}>

                <ButtonGreen onPress={() => { setShowModalCamera(true) }} />

                <TextCancelAppointment style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>Cancelar</TextCancelAppointment>

=======
        
              </ContainerMargin>

              <ContainerMargin $fd="row" $justContent="space-between" $mt={10}>
        
                <ButtonGreen onPress={() => { setShowModalCamera(true) }} />
        
                <TextCancelAppointment style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>Cancelar</TextCancelAppointment>
        
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034
              </ContainerMargin>
            </>
          ) :
            <></>
        }



        <ContainerMargin $mt={30} $gap={30} $mb={30}>
<<<<<<< HEAD
=======
       
          <ButtonDefault textButton="Salvar" />
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034

          <ButtonDefault textButton="Salvar"
            onPress={() => {
                alterarDadosConsulta();
                             
            }} />

          <ButtonDefault textButton="Editar" disabled={!disabledInput} disabledInput={!disabledInput} onPress={() => setDisableInput(false)} />

          <LinkUnderlineDefault 
            onPress={() => { navigation.replace('Home',{dateConsulta : moment(route.params.dadosConsulta.dataConsulta).format('YYYY-MM-DD')}) 
            }}>Cancelar</LinkUnderlineDefault>

<<<<<<< HEAD
        </ContainerMargin>

      </ContainerScrollView>

      <ModalCamera showModalCamera={showModalCamera} setShowModalCamera={setShowModalCamera} navigation={navigation} />

=======
          <LinkUnderlineDefault onPress={() => { navigation.replace('Home') }}>Cancelar</LinkUnderlineDefault>
       
        </ContainerMargin>
      
      </ContainerScrollView>

      <ModalCamera showModalCamera={showModalCamera} setShowModalCamera={setShowModalCamera} navigation={navigation} />
   
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034
    </Container>
  )
}