
import { ScrollView, StatusBar, Text, View, SafeAreaView } from "react-native"
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
  const [erroDescricao, setErroDescricao] = useState('')
  const [diagnosticoPaciente, setDiagnosticoPaciente] = useState(route.params?.dadosConsulta?.diagnostico ? route.params.dadosConsulta.diagnostico : '');
  const [erroDiagnosticoPaciente, setErroDiagnosticoPaciente] = useState('')
  const [prescricaoMedica, setPrescricaoMedica] = useState(route.params?.dadosConsulta?.receita?.medicamento ? route.params.dadosConsulta.receita.medicamento : '');
  const [erroPrescricaoMedica, setErroPrescricaoMedica] = useState('')
  const [descricaoExame, setDescricaoExame] = useState('');
  const [showModalCamera, setShowModalCamera] = useState(false);
  const [disabledInput, setDisableInput] = useState(true);
  const [uriFotoCam, setUriFotoCam] = useState(null);
  const [erroGeral, setErroGeral] = useState('');
  const [statusResponseExame, setStatusResponseExame] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(route.params?.role == 'Medico' ? false : true);
  const [buttonDisableEditar, setButtonDisableEditar] = useState(false)
  const [buttonDisableExame, setButtonDisableExame] = useState(false)

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
    console.log(`
    consultaId: ${idConsulta},
    medicamento: ${prescricaoMedica},
    descricao: ${descricaoConsulta},
    diagnostico: ${diagnosticoPaciente},
    `)
    try {
      await api.put('/Consultas/Prontuario', {
        consultaId: idConsulta,
        medicamento: prescricaoMedica,
        descricao: descricaoConsulta,
        diagnostico: diagnosticoPaciente,
      })
      if (dadosSituações == 'Agendadas') {
        alterarStatusConsulta()
      }
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
    const rest = encontraIdConsultaRealizada();
    console.log('encontraIDconsulta', rest);
    if (situacaoConsulta == 'Agendadas') {
      try {
        await api.put(`/Consultas/Status?idConsulta=${idConsulta}&status=${rest}`)
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
        setButtonDisableExame(false)
        setStatusResponseExame(false)
        setErroGeral('')
      }
    ).catch(
      error => {
        console.log('Erro ao fazer salvar exame, erro : ', error.response)
        setErroGeral(error.response.data)
        setButtonDisableExame(false)
        setStatusResponseExame(false)
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
        // console.log('response',response)
        setDescricaoExame(descricao);
      })
      .catch(error => {
        alert(`Erro ao buscar exame: ${error}`)
      })
  }

  useEffect(() => {
    verificaProntuario()
    ExibeExame()
    console.log('situação da consulta : ', route.params?.dadosConsulta?.situacao?.situacao);
    console.log('Dados situações : ', route.params?.dadosSituacoes)
  }, [])

  useEffect(() => {
    if (uriFotoCam != null) {
      InserirExame();
    }
  }, [uriFotoCam])

  useEffect(() => {
    if ((descricaoConsulta.length >= 3) && (diagnosticoPaciente.length >= 3) && (prescricaoMedica.length >= 3)) {
      console.log('top')
      setDisableInput(false)
    } else {
      setDisableInput(true)
    }
  }, [descricaoConsulta, diagnosticoPaciente, prescricaoMedica])

  return (

    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />

      <ImageUser source={{ uri: fotoUser }} $width="100%" $height="280px" />

      <ContainerScrollView
        showsVerticalScrollIndicator={false}
      >

        <ContainerMargin $mt={20} $width="100%">

          <Title>
            {role == 'Paciente' ? 'Dr(ª) ' + nome : nome}
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

          <InputGreenMultiLine
            placeholder="Inserir descrição"
            editable={!buttonDisable}
            disabledInput={buttonDisable}
            value={descricaoConsulta}
            onChangeText={(txt) => {
              setDescricaoConsulta(txt)
              setErroDescricao('')
            }}
            onEndEditing={() => {
              if (descricaoConsulta !== '' && descricaoConsulta.length >= 3) {
                setErroDescricao('')
              } else {
                setErroDescricao('Nesessário preencher o campo de descrição.')
              }
            }}
          />
          {erroDescricao !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroDescricao}</Text> : <></>}
        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Diagnóstico do paciente</TextLabel>

          <InputGreen
            placeholder="Inserir diagnóstico"
            editable={!buttonDisable}
            disabledInput={buttonDisable}
            value={diagnosticoPaciente}
            onChangeText={(txt) => {
              setDiagnosticoPaciente(txt)
              setErroDiagnosticoPaciente('')
            }}
            onEndEditing={() => {
              if (diagnosticoPaciente !== '' && diagnosticoPaciente.length >= 3) {
                setErroDiagnosticoPaciente('')
              } else {
                setErroDiagnosticoPaciente('Nesessário preencher o campo de diagnóstico.')
              }
            }}
          />

          {erroDiagnosticoPaciente !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroDiagnosticoPaciente}</Text> : <></>}

        </ContainerMargin>

        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>

          <TextLabel>Prescrição médica</TextLabel>

          <InputGreenMultiLine
            editable={!buttonDisable}
            placeholder="Inserir prescrição medica"
            disabledInput={buttonDisable}
            value={prescricaoMedica}
            onChangeText={(txt) => {
              setPrescricaoMedica(txt)
              setErroPrescricaoMedica('')
            }}
            onEndEditing={() => {
              if (prescricaoMedica !== '' && prescricaoMedica.length >= 3) {
                setErroPrescricaoMedica('')
              } else {
                setErroPrescricaoMedica('Nesessário preencher o campo de prescrição médica.')
              }
            }}
          />

          {erroPrescricaoMedica !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroPrescricaoMedica}</Text> : <></>}


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
                      <TextInformation>Nenhuma foto de exame informada</TextInformation>
                    </>

                  }
                </ContainerMargin>

              </ContainerMargin>

              <ContainerMargin $fd="row" $justContent="space-between" $mt={10}>

                <ButtonGreenCam statusResponseExame={statusResponseExame} disabled={buttonDisableExame}
                  onPress={() => {
                    setShowModalCamera(true)
                    setButtonDisableExame(true)
                    setStatusResponseExame(true)
                  }} />


                {/* <TextCancelAppointment style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>Cancelar</TextCancelAppointment> */}

              </ContainerMargin>

              <ContainerMargin $mt={10}>
                {erroGeral !== '' ? <Text style={{ color: 'red', fontWeight: "500", textAlign: "left", width: '100%' }}>{erroGeral}</Text> : <></>}
              </ContainerMargin>

              <View style={{ borderWidth: 1, borderStyle: "solid", borderColor: '#8C8A97', borderRadius: 5, marginTop: 30, marginBottom: 40, width: '90%' }} />


              <ScrollView nestedScrollEnabled style={{ width: "90%", backgroundColor: "#F5F3F3", color: "#4E4B59", height: 110, padding: 16, borderRadius: 5 }}>
                <Text style={{
                  fontFamily: 'MontserratAlternates_600SemiBold',
                  fontSize: 14
                }}>{descricaoExame ? descricaoExame : 'Resultado do Exame'}</Text>
              </ScrollView>

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
                {
                  descricaoExame !== '' && (
                    <>
                      <View style={{ borderWidth: 1, borderStyle: "solid", borderColor: '#8C8A97', borderRadius: 5, marginTop: 5, marginBottom: 5, width: '100%' }} />


                      <ScrollView nestedScrollEnabled style={{ width: "100%", backgroundColor: "#F5F3F3", color: "#4E4B59", height: 110, padding: 16, borderRadius: 5 }}>
                        <Text style={{
                          fontFamily: 'MontserratAlternates_600SemiBold',
                          fontSize: 14
                        }}>{descricaoExame ? descricaoExame : 'Resultado do Exame'}</Text>
                      </ScrollView>
                    </>
                  )
                }

                <ButtonDefault
                  textButton="Salvar"
                  disabled={disabledInput}
                  disabledInput={disabledInput}
                  onPress={() => {
                    alterarDadosConsulta();
                    setButtonDisable(true)
                    setButtonDisableEditar(true)

                  }} />


                <ButtonDefault
                  textButton="Editar"
                  disabled={!buttonDisableEditar}
                  disabledInput={!buttonDisableEditar}
                  onPress={() => {
                    setDisableInput(false)
                    setButtonDisable(false)
                    setButtonDisableEditar(false)
                  }} />

                <LinkUnderlineDefault
                  onPress={() => {
                    navigation.replace('Main', { dateConsulta: moment(route.params.dadosConsulta.dataConsulta).format('YYYY-MM-DD'), situacaoSelecionada: route.params.dadosConsulta.situacao.situacao })
                  }}>Cancelar</LinkUnderlineDefault>

              </ContainerMargin>
            )
        }
      </ContainerScrollView>

      <ModalCamera setUriFotoCam={setUriFotoCam} showModalCamera={showModalCamera} setStatusResponseExame={setStatusResponseExame} getMediaLibrary={true} setShowModalCamera={setShowModalCamera} navigation={navigation} />

    </Container>
  )
}