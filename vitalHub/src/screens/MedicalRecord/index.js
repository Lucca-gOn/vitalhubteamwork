
import { ScrollView, StatusBar, Text, View } from "react-native"
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer"
import { ImageUser } from "../../components/Images/style"
import { TextCancelAppointment, TextInformation, TextLabel, TextQuickSandRegular, Title } from "../../components/Texts/style"
import { InputGreen, InputGreenMultiLine } from "../../components/Inputs/styled"
import { ButtonDefault, ButtonGreenCam } from "../../components/Buttons"
import { LinkUnderlineDefault } from "../../components/Links"
import { Image } from "expo-image"
import { ModalCamera } from "../../components/Modals"
import { useEffect, useState } from "react"
import api from "../../service/Service"
import moment from "moment"


export default function MedicalRecord({
  navigation,
  route
}) {
  const [descricaoConsulta, setDescricaoConsulta] = useState(route.params?.dadosConsulta?.descricao ? route.params.dadosConsulta.descricao : '');
  const [diagnosticoPaciente, setDiagnosticoPaciente] = useState(route.params?.dadosConsulta?.diagnostico ? route.params.dadosConsulta.diagnostico : '');
  const [prescricaoMedica, setPrescricaoMedica] = useState(route.params?.dadosConsulta?.receita ? route.params.dadosConsulta.receita.medicamento : '');
  const [descricaoExame, setDescricaoExame] = useState('');
  const [showModalCamera, setShowModalCamera] = useState(false);
  const [disabledInput, setDisableInput] = useState(false);
  const [uriFotoCam, setUriFotoCam] = useState(null);

  const nome = route.params?.dadosConsulta?.paciente?.idNavigation?.nome || route.params?.dadosConsulta.medicoClinica?.medico?.idNavigation?.nome;
  const email = route.params?.dadosConsulta?.paciente?.idNavigation?.email || route.params?.dadosConsulta.medicoClinica?.medico?.idNavigation?.email;
  const fotoUser = route.params?.dadosConsulta?.paciente?.idNavigation?.foto || route.params?.dadosConsulta.medicoClinica?.medico?.idNavigation?.foto;
  const role = route.params?.role;

  const dadosSituações = route.params?.dadosSituacoes;

  const idConsulta = route.params?.dadosConsulta?.id;
  const dataNascimento = route.params?.dadosConsulta?.paciente?.dataNascimento;
  const fotoCam = route.params?.fotoCam;
  const situacaoConsulta = route.params?.dadosConsulta?.situacao?.situacao;

  //console.log(route.params?.dadosConsulta)
  //const [foto, setFoto] = useState('')
  const calculateAge = () => {
    const dob = moment(dataNascimento, 'YYYY-MM-DD');
    const today = moment();
    const years = today.diff(dob, 'years');

    return years > 1 ? `${years} anos` : `${years} ano`
  };


  function verificaProntuario() {
    diagnosticoPaciente !== undefined && diagnosticoPaciente !== undefined && prescricaoMedica !== undefined ?
      setDisableInput(true) :
      setDisableInput(false)
  }

  async function alterarDadosConsulta() {
    try {
      await api.put('/Consultas/Prontuario', {
        consultaId: idConsulta,
        medicamento: prescricaoMedica,
        descricao: descricaoConsulta,
        diagnostico: diagnosticoPaciente,
      })
      setDisableInput(true);
      console.log('Relizado alteracao')
    } catch (error) {
      alert('Erro ao fazer alteração nos dados: ', error)
    }
  }

  function encontraIdConsultaRealizada() {
    for (const item of dadosSituações) {
      if (item.situacao === 'Realizadas') {
        console.log(item.id)
        return item.id;
      }
    }
  }

  async function alterarStatusConsulta() {
    console.log('idconsulta', idConsulta);
    const reste = encontraIdConsultaRealizada();
    console.log('encontraIDconsulta', reste);
    if (situacaoConsulta == 'Agendadas') {
      try {
        await api.put(`/Consultas/Status?idConsulta=${idConsulta}&status=${encontraIdConsultaRealizada()}`)
      } catch (error) {
        console.log('Erro ao alterar a consulta para Realizadas, erro: ', error)
      }
    }
  }

  async function InserirExame() {
    const formData = new FormData();
    console.log('Foto uriFotoCam', uriFotoCam)
    formData.append("ConsultaId", idConsulta)
    formData.append("File", {
      uri: uriFotoCam,
      name: `image.${uriFotoCam.split('.').pop()}`,
      type: `image/${uriFotoCam.split('.').pop()}`
    })

    await api.post(`/Exame/Cadastrar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(
      response => {
        setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
      }
    ).catch(
      error => {
        console.log('Erro ao fazer salvar exame, erro : ', error)
      }
    )
  }

  async function ExibeExame() {
    await api.get(`/Exame/BuscarPorIdConsulta?idConsulta=${idConsulta}`)
      .then(response => {
        let descricao = '';
        response.data.forEach(element => {
          descricao += element.descricao
        });
        setDescricaoExame(descricao);
      })
      .catch(error => {
        alert(`Erro ao buscar exame: ${error}`)
      })
  }

  useEffect(() => {
    verificaProntuario()
    ExibeExame()
  }, [])

  useEffect(() => {
    if (uriFotoCam != null) {
      InserirExame();
    }
  }, [uriFotoCam])

  return (

    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />

      <ImageUser source={{ uri: fotoUser }} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >

        <ContainerMargin $mt={20} $width="100%">

          <Title>
            {nome}
          </Title>

        </ContainerMargin>

        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">

          <TextQuickSandRegular>
            {
              role == 'Paciente' ? `${route.params?.dadosConsulta.medicoClinica?.medico?.crm} CRM` : calculateAge()
            }
          </TextQuickSandRegular>

          <TextQuickSandRegular>
            {email}
          </TextQuickSandRegular>

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10}>

          <TextLabel>Descrição da consulta</TextLabel>

          <InputGreenMultiLine placeholder="Inserir descrição" editable={!disabledInput} disabledInput={disabledInput} value={descricaoConsulta} onChangeText={(txt) => { setDescricaoConsulta(txt) }} />

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Diagnóstico do paciente</TextLabel>

          <InputGreen placeholder="Inserir diagnóstico" editable={!disabledInput} disabledInput={disabledInput} value={diagnosticoPaciente} onChangeText={(txt) => { setDiagnosticoPaciente(txt) }} />

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Prescrição médica</TextLabel>

          <InputGreenMultiLine editable={!disabledInput} placeholder="Inserir prescrição medica" disabledInput={disabledInput} value={prescricaoMedica} onChangeText={(txt) => { setPrescricaoMedica(txt) }} />

        </ContainerMargin>



        {
          role !== 'Medico' ? (

            <>

              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

                <TextLabel>Exames médicos</TextLabel>

                <ContainerMargin $width="100%" $height="111px" $bgColor="#F5F3F3" $borderRadius={5} $fd="row" $gap={9}>
                  {uriFotoCam !== null ?
                    <Image source={{ uri: uriFotoCam }} style={{ width: "100%", height: '100%', contentfit: "cover" }} />
                    :
                    <>
                      <Image source={require('../../assets/images/ImageExclamation.svg')} style={{ width: 16, height: 18 }} />
                      <TextInformation>Nenhuma foto informada</TextInformation>
                    </>

                  }
                </ContainerMargin>

              </ContainerMargin>

              <ContainerMargin $fd="row" $justContent="space-between" $mt={10}>

                <ButtonGreenCam onPress={() => { setShowModalCamera(true) }} />

                <TextCancelAppointment style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>Cancelar</TextCancelAppointment>

              </ContainerMargin>

              <View style={{ borderWidth: 1, borderStyle: "solid", borderColor: '#8C8A97', borderRadius: 5, marginTop: 30, marginBottom: 40, width: '90%' }} />


              <View style={{height: 500}} >
                <ScrollView style={{ height: 250, width: "100%", padding:50, backgroundColor: 'pink' }} showsVerticalScrollIndicator={true} >
                  <Text>
                    {descricaoExame}
                  </Text>
                </ScrollView>
              </View>

              {/* <InputGreenMultiLine readOnly placeholder="Resultado do exame" disabledInput={disabledInput} value={descricaoExame} onChangeText={(txt) => { setPrescricaoMedica(txt) }} /> */}



              {/* editable={!disabledInput} */}


              <ContainerMargin $mt={30} $gap={30} $mb={30}>
                <LinkUnderlineDefault onPress={() => navigation.goBack()}>
                  Voltar
                </LinkUnderlineDefault>
              </ContainerMargin>
            </>
          ) :
            (
              <ContainerMargin $mt={30} $gap={30} $mb={30}>

                <ButtonDefault textButton="Salvar"
                  onPress={() => {
                    alterarDadosConsulta();
                    alterarStatusConsulta()

                  }} />


                <ButtonDefault textButton="Editar" disabled={!disabledInput} disabledInput={!disabledInput} onPress={() => setDisableInput(false)} />

                <LinkUnderlineDefault
                  onPress={() => {
                    navigation.replace('Main', { dateConsulta: moment(route.params.dadosConsulta.dataConsulta).format('YYYY-MM-DD'), situacaoSelecionada: route.params.dadosConsulta.situacao.situacao })
                  }}>Cancelar</LinkUnderlineDefault>

              </ContainerMargin>
            )
        }




      </ContainerScrollView>

      <ModalCamera setUriFotoCam={setUriFotoCam} showModalCamera={showModalCamera} getMediaLibary={true} setShowModalCamera={setShowModalCamera} navigation={navigation} />

    </Container>
  )
}