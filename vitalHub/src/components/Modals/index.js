import { ActivityIndicator, Modal, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import { Container, ContainerMargin } from "../Conatainer"
import { Description, DescriptionBlack, TextData, TextLabel, TextLabelBlack, TextQuickSandRegular, Title } from "../Texts/style"
import { ButtonDefault, ButtonSelectGreen } from "../Buttons"
import { LinkUnderlineDefault } from "../Links"
import * as Notifications from 'expo-notifications'
import { ImageUser } from "../Images/style"
import { InputGreen } from "../Inputs/styled"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AutoFocus, Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as MediaLibary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from "expo-image"
import api from "../../service/Service"
import moment from "moment"
import { userDecodeToken } from '../../utils/Auth';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';




Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
})

export const ModalCancel = ({
  showModalCancel,
  consultSelect,
  dadosSituacoes,
  setRenderizaDados,
  renderizaDados,
  setShowModalCancel
}) => {

  const dadosSituações = dadosSituacoes;

  function encontraIdConsultaCancelada() {
    for (const item of dadosSituações) {
      if (item.situacao === 'Canceladas') {
        return item.id;
      }
    }
  }

  async function alterarDadosConsulta() {
    let idSituacaoCancelada = encontraIdConsultaCancelada();

    try {
      await api.put(`/Consultas/Status?idConsulta=${consultSelect}&status=${idSituacaoCancelada}`)
      handleCallNotifications();
      if (renderizaDados) {
        setRenderizaDados(false)
      } else {
        setRenderizaDados(true)
      }
    } catch (error) {
      alert('Erro ao fazer alteração nos dados: ', error)
    }
  }

  const handleCallNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      alert('Você não habilitou, receber notificação no app.');
      return;
    }

    // const token = await Notifications.getExpoPushTokenAsync();
    // console.log(token)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Consulta cancelada',
        body: 'Consulta com o Dr. Allan foi cancelada, favor reagendar.'
      },
      trigger: null
    })
  }

  return (

    <Modal
      transparent={true}
      visible={showModalCancel}
      statusBarTranslucent={true}
      onRequestClose={() => setShowModalCancel(false)}
    >
      <Container
        $justContent="center"
        $bgColor="rgba(0,0,0,0.3)"
      >
        <ContainerMargin
          $width="90%"
          $height="310px"
          $borderRadius={10}
          $bgColor="#FFF"
        //$pd="28px 30px"
        >
          <Title>
            Cancelar consulta
          </Title>
          <ContainerMargin $width="80%" $mt={15}>
            <Description>
              Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?
            </Description>
          </ContainerMargin>

          <ContainerMargin $mt={30} $gap={30} $width="80%">
            <ButtonDefault textButton="Confirmar" onPress={() => {
              alterarDadosConsulta()
              //handleCallNotifications()              
              setShowModalCancel(false)
            }} />

            <LinkUnderlineDefault onPress={() => {
              setShowModalCancel(false)

            }}>
              Cancelar
            </LinkUnderlineDefault>
          </ContainerMargin>

        </ContainerMargin>
      </Container>
    </Modal>

  )
}

export const ModalMedicalRecord = ({
  navigation,
  consultSelect,
  setShowModalMedicalRecord,
  showModalMedicalRecord,
  dadosSituacoes,
  role,
  profile
}) => {

  const foto = consultSelect.paciente?.idNavigation?.foto;
  const nome = consultSelect.paciente?.idNavigation?.nome;
  const email = consultSelect.paciente?.idNavigation?.email;
  const dataNascimento = consultSelect.paciente?.dataNascimento;

  const calculateAge = () => {
    const dob = moment(dataNascimento, 'YYYY-MM-DD');
    const today = moment();
    const years = today.diff(dob, 'years');

    return years > 1 ? `${years} anos` : `${years} ano`
  };

  return (
    <Modal
      transparent={true}
      visible={showModalMedicalRecord}
      statusBarTranslucent={true}
      onRequestClose={() => { setShowModalMedicalRecord(false) }}
    >
      <Container
        $justContent="center"
        $bgColor="rgba(0,0,0,0.3)"
      >
        <ContainerMargin
          $width="90%"
          $borderRadius={10}
          $bgColor="#FFF"
        >
          <ContainerMargin $mt={30}>
            <ImageUser source={{ uri: foto }} $width="90%" $height="181px" />
          </ContainerMargin>
          <ContainerMargin $mt={20} $width="100%">
            <Title>
              {nome}
            </Title>
          </ContainerMargin>
          <ContainerMargin $width="80%" $mt={18} $fd="row" $justContent="space-around">
            <TextQuickSandRegular>
              {calculateAge()}
            </TextQuickSandRegular>
            <TextQuickSandRegular>
              {email}
            </TextQuickSandRegular>
          </ContainerMargin>

          <ContainerMargin $mt={30} $mb={20} $gap={30} $width="80%">
            <ButtonDefault textButton="Inserir prontuário" onPress={() => {
              setShowModalMedicalRecord(false)
              navigation.navigate('MedicalRecord', { dadosConsulta: consultSelect, profile: profile, role: role, dadosSituacoes: dadosSituacoes });
            }} />

            <LinkUnderlineDefault onPress={() => {
              setShowModalMedicalRecord(false)
            }}>
              Cancelar
            </LinkUnderlineDefault>
          </ContainerMargin>

        </ContainerMargin>
      </Container>
    </Modal>
  )
}

export const ModalScheduleAppointment = ({
  setShowModalScheduleAppointment,
  showModalScheduleAppointment,
  navigation
}) => {

  const [agendamento, setAgendamento] = useState({
    prioridadeId: null,
    prioridadeLabel: null,
    localizacao: null
  })
  const [isSelected, setIsSelected] = useState(false)
  const [tipoConsulta, setTipoConsulta] = useState("")
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(false);

  const niveisConsulta = [
    { id: '989B4408-D25C-471F-B5C3-06BEAF08D8DA', tipo: 'Rotina' },
    { id: '0A34AA07-5AC4-400E-8AE5-1A831C22F869', tipo: 'Exame' },
    { id: '894ADE0F-F58E-49DB-B605-37207732B7C8', tipo: 'Urgência' },
  ];

  function handleContinue() {
    setShowModalScheduleAppointment(false);
    navigation.navigate("SelectClinic", { agendamento: agendamento });
  }

  async function buscarClinicas() {
    try {
      const response = await api.get('/Clinica/ListarTodas');
      setClinicas(response.data);
    } catch (error) {
      console.log('Erro ao buscar clínicas:', error);
    }
  };


  useEffect(() => {
    buscarClinicas();
  }, [])
  return (
    <Modal
      transparent={true}
      visible={showModalScheduleAppointment}
      statusBarTranslucent={true}
      onRequestClose={() => { setShowModalScheduleAppointment(false) }}
      propagateSwipe={true}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        // extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
      >

        <Container
          $width='100%'
          $bgColor="rgba(0,0,0,0.3)"
          $justContent="flex-end"
        >

          <ContainerMargin
            $width="100%"
            $bgColor="#FFF"

            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          >

            <ContainerMargin $mt={30}>
              <Title>Agendar consulta</Title>
            </ContainerMargin>

            <ContainerMargin $mt={17} $width="80%" $alingItens="flex-start">
              <TextLabelBlack>Qual o nível da consulta</TextLabelBlack>

              <ContainerMargin $fd="row" $justContent="space-between" $mt={10} $width="100%">
                {
                  niveisConsulta.map((item) => (
                    <ButtonSelectGreen
                      key={item.id}
                      texto={item.tipo}
                      selectStatus={tipoConsulta == item.tipo ? true : false}
                      onPress={() => {
                        setAgendamento({
                          ...agendamento,
                          prioridadeId: item.id,
                          prioridadeLabel: item.tipo
                        });
                        setTipoConsulta(item.tipo)
                        console.log(agendamento);
                      }}
                    />
                  ))
                }
              </ContainerMargin>


            </ContainerMargin>

            <ContainerMargin $width="80%" $mt={20} $alingItens="flex-start">
              <TextLabelBlack style={{marginBottom: 10}}>Informe a localização desejada</TextLabelBlack>
              {/* <InputGreen
                placeholder="Informe a localização"

                value={agendamento ? agendamento.localizacao : null}

                onChangeText={(txt) => setAgendamento({
                  ...agendamento,
                  localizacao: txt
                })} /> */}

              <View style={{ width: '100%', borderWidth: 2, borderColor: '#60BFC5', borderStyle: 'solid', borderRadius: 5}}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <RNPickerSelect
                    mode="dropdown"
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    onValueChange={(value) => setAgendamento({ ...agendamento, localizacao: value })}
                    items={clinicas.map((clinica) => ({ label: clinica.endereco.cidade, value: clinica.endereco.cidade }))}
                    placeholder={{ label: 'Selecione a cidade', value: null }}
                    Icon={() => (
                      <TouchableOpacity>
                        <AntDesign name="caretdown" size={14} color="#34898F" />
                      </TouchableOpacity>
                    )}
                    style={{
                      iconContainer: {
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        zIndex: 0
                      },
                      headlessAndroidContainer: {
                        justifyContent: 'center'
                      },
                      inputIOS: {
                        color: '#34898F',
                        padding: 16,
                        zIndex: 1
                      },
                      inputAndroid: {
                        color: '#34898F',
                        padding: 16,
                        width: '100%',
                        zIndex: 1
                      },
                      inputWeb: {
                        color: '#34898F',
                        padding: 16
                      },
                      placeholder: {
                        color: '#34898F',
                        fontFamily: 'MontserratAlternates_600SemiBold',
                        fontSize: 14,
                        height: 'auto',
                        zIndex: 1
                      },
                    }}
                    // modalProps={{
                    //   position: 'absolute',
                    //   top: '100%', // Isso posiciona o dropdown logo abaixo do campo de seleção
                    //   left: 0,
                    //   right: 0,
                    //   zIndex: 2,
                    // }}
                  />
                )}
              </View>

            </ContainerMargin>



            <ContainerMargin $mt={143} $mb={35} $gap={30} $width="80%">
              <ButtonDefault
                textButton="Continuar"
                onPress={() => {
                  console.log('agendamento: ', agendamento)
                  if(agendamento !== null && agendamento.localizacao !== null && agendamento.prioridadeLabel!== null){
                    handleContinue()
                  }
                }} />

              <LinkUnderlineDefault
                onPress={() => setShowModalScheduleAppointment(false)}
              >
                Cancelar
              </LinkUnderlineDefault>
            </ContainerMargin>
          </ContainerMargin>
        </Container>
      </KeyboardAwareScrollView>
    </Modal>

  )
}

export const SummaryMedicalAgenda = ({
  data,
  setShowSummaryMedicalAgenda,
  showSummaryMedicalAgenda,
  navigation,
  agendamento,
  ...rest
}) => {

  const [profile, setProfile] = useState(null);

  async function profileLoad() {
    const token = await userDecodeToken();
    console.log(token);
    if (token) {
      setProfile(token);
    }
  }

  async function ConfirmarConsulta() {
    await api.post('/Consultas/Cadastrar', {
      ...agendamento,
      pacienteId: profile.id,
      situacaoId: 'DBCAE12A-D2B0-4317-8D37-AFF292B4017C',
    }).then(async response => {
      await setShowSummaryMedicalAgenda(false)

      navigation.replace("Main");
    }).catch(error => {
      console.log(error);
    })
    console.log("Agendamento aqui:", agendamento);

  }

  useEffect(() => {
    profileLoad();
  }, [])
  return (

    <Modal
      transparent={true}
      visible={showSummaryMedicalAgenda}
      statusBarTranslucent={true}
      onRequestClose={() => setShowSummaryMedicalAgenda(false)}
    >
      <Container
        $justContent="center"
        $bgColor="rgba(0,0,0,0.3)"
      >
        <ContainerMargin
          $width="90%"
          $borderRadius={10}
          $bgColor="#FFF"
        //$pd="28px 30px"
        >
          <ContainerMargin $mt={30} $mb={16}>
            <Title>
              Agendar consulta
            </Title>
          </ContainerMargin>
          <ContainerMargin $width="80%" $mb={30}>
            <DescriptionBlack>
              Consulte os dados selecionados para a sua consulta
            </DescriptionBlack>
          </ContainerMargin>

          <ContainerMargin $alingItens="flex-start" $gap={20} >
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Data da consulta</TextLabel>
              <TextData>{moment(agendamento.dataConsulta).format('DD/MM/YYYY HH:mm')}</TextData>
            </ContainerMargin>
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Médico(a) da consulta</TextLabel>
              <TextData>{agendamento.medicoLabel}</TextData>
              {/* <TextData>Demartologa, Esteticista</TextData> */}
            </ContainerMargin>
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Local da consulta</TextLabel>
              <TextData>{agendamento.localizacao}</TextData>
            </ContainerMargin>
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Tipo da consulta</TextLabel>
              <TextData>{agendamento.prioridadeLabel}</TextData>
            </ContainerMargin>
          </ContainerMargin>


          <ContainerMargin $mt={30} $mb={30} $gap={30} $width="90%">
            <ButtonDefault textButton="Confirmar" onPress={ConfirmarConsulta} />

            <LinkUnderlineDefault onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }]
              })
              setShowSummaryMedicalAgenda(false)
            }}>
              Cancelar
            </LinkUnderlineDefault>
          </ContainerMargin>

        </ContainerMargin>
      </Container>
    </Modal>

  )
}

export const ModalShowLocalConsult = ({
  navigation,
  showModalShowLocalConsult,
  setShowModalShowLocalConsult,
  consultSelect,
  dadosCard
}) => {


  return (
    <Modal
      transparent={true}
      visible={showModalShowLocalConsult}
      statusBarTranslucent={true}
      onRequestClose={() => { setShowModalShowLocalConsult(false) }}
    >
      <Container
        $justContent="center"
        $bgColor="rgba(0,0,0,0.3)"
      >
        <ContainerMargin
          $width="90%"
          $borderRadius={10}
          $bgColor="#FFF"

        >
          <ContainerMargin $mt={30}>
            <ImageUser source={{ uri: dadosCard.idNavigation?.foto }} $width="90%" $height="181px" />
          </ContainerMargin>
          <ContainerMargin $mt={20} $width="100%">
            <Title>
              Dr(ª) {dadosCard.idNavigation?.nome}
            </Title>
          </ContainerMargin>
          <ContainerMargin $width="80%" $mt={18} $fd="row" $justContent="space-around">
            <TextQuickSandRegular>
              {dadosCard.especialidade?.especialidade1}
            </TextQuickSandRegular>
            <TextQuickSandRegular>
              CRM-{dadosCard.crm}
            </TextQuickSandRegular>
          </ContainerMargin>

          <ContainerMargin $mt={30} $mb={20} $gap={30} $width="80%">
            <ButtonDefault
              textButton="Ver local da consulta"
              onPress={() => {
                navigation.navigate('ConsultationAddress', { modalLocal: consultSelect })
                setShowModalShowLocalConsult(false)
              }} />

            <LinkUnderlineDefault onPress={() => {
              setShowModalShowLocalConsult(false)
            }}>
              Cancelar
            </LinkUnderlineDefault>
          </ContainerMargin>

        </ContainerMargin>
      </Container>
    </Modal>
  )
}

export const ModalCamera = ({
  showModalCamera,
  setShowModalCamera,
  navigation,
  setUriFotoCam,
  getMediaLibary = false
}) => {

  const cameraRef = useRef(null);

  const [photoCam, setPhotoCam] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front);
  const [latestPhoto, setLatestPhoto] = useState(null);

  const clearPhoto = () => {
    setPhotoCam(null);
    setOpenModal(false);
  }

  async function capturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setPhotoCam(photo.uri);
      setOpenModal(true);
    }
  }

  async function savePhoto() {
    if (photoCam) {
      console.log(photoCam)
      await MediaLibary.createAssetAsync(photoCam)
        .then(() => {
          alert('Sucesso, Foto Salva na Galeria');
          setUriFotoCam(photoCam)
        })
        .catch(error => {
          alert("Erro ao salvar foto. Detalhe : ", error);
        })
    }
  }

  // useEffect(() => {
  //   async () => {
  //     const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
  //     //const { status: mediaStatus } = await MediaLibary.requestPermissionsAsync();
  //     if(cameraStatus !== 'granted'){
  //       alert('Erro')
  //     }
  //   }
  // },[])

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to make this work');
      }
      await MediaLibary.requestPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);


  async function selectImageGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })

    if (!result.canceled) {
      //setPhotoCam(result.assets[0].uri);
      setUriFotoCam(result.assets[0].uri);
      setOpenModal(false)
      setShowModalCamera(false)
    }
  }



  async function getLastPhoto() {
    const { assets } = await MediaLibary.getAssetsAsync({ sortBy: [[MediaLibary.SortBy.creationTime, false]], first: 1 })
    //console.log(assets);
    if (assets.length > 0) {
      setLatestPhoto(assets[0].uri)
    }
  }

  useEffect(() => {
    setPhotoCam(null)
    if (getMediaLibary) {
      getLastPhoto();
    }
  }, [showModalCamera])

  return (
    <Modal
      transparent={true}
      visible={showModalCamera}
      statusBarTranslucent={true}
      onRequestClose={() => { setShowModalCamera(false) }}
    >
      <Container
        $justContent="center"
        $bgColor="rgba(0,0,0,0.3)"
      >
        <ContainerMargin
          $height="90%"
          $width="90%"
          $borderRadius={10}
          $bgColor="#FFF"
        >
          {/* <View style={stylesCamera.container}> */}
          <Camera
            ref={cameraRef}
            ratio={'16:9'}
            type={tipoCamera}
            style={stylesCamera.camera}
            flashMode={FlashMode.auto}
            autoFocus={AutoFocus.on}
          >

          </Camera>
          <ContainerMargin $fd="row" $justContent="space-between" $mt={30}>
            <TouchableOpacity onPress={() => selectImageGallery()} style={{ padding: 12, backgroundColor: 'black', borderRadius: 15 }}>
              {
                latestPhoto !== null
                  ? (
                    <Image source={{ uri: latestPhoto }} style={{ width: 40, height: 40, borderRadius: 5, borderWidth: 1, borderColor: 'white' }} ></Image>
                  )
                  : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={stylesCamera.btnCaptura} onPress={() => capturePhoto()}>
              <FontAwesome name='camera' size={23} color={'#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesCamera.btnSwitch} onPress={() => { setTipoCamera(tipoCamera === CameraType.front ? CameraType.back : CameraType.front) }}>
              <MaterialIcons name="cameraswitch" size={24} color="#FFF" />
            </TouchableOpacity>
          </ContainerMargin>


          <Modal animationType='slide' transparent={true} visible={photoCam !== null} onRequestClose={() => setOpenModal(false)} style={{ justifyContent: "center", alignItems: "center" }}>
            <Container $justContent="center"
              $bgColor="rgba(0,0,0,0.3)">
              <View style={{ alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: '#FFF', width: '90%', borderRadius: 10 }}>
                <Image style={{ width: '100%', height: 500, borderRadius: 10, }} source={{ uri: photoCam }} />
                <View style={{ margin: 15, flexDirection: 'row' }}>
                  <TouchableOpacity style={stylesCamera.btnCancel} onPress={() => clearPhoto()}>
                    <FontAwesome name='trash' size={35} color={'#FF0000'} />
                  </TouchableOpacity>

                  <TouchableOpacity style={stylesCamera.btnUpload} onPress={() => {
                    savePhoto()
                    setOpenModal(false)
                    setShowModalCamera(false)
                  }}>
                    <FontAwesome name='save' size={35} color={'#121212'} />
                  </TouchableOpacity>
                </View>
              </View>
            </Container>
          </Modal>
          {/* </View> */}


        </ContainerMargin>
      </Container>
    </Modal>
  )
}


const stylesCamera = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    // flex: 1,
    height: '70%',
    width: '100%',


  },
  viewFlip: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  btnFlip: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 15
  },
  txtFlip: {
    fontSize: 20,
    color: '#FFF',
  },
  btnCaptura: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#121212',

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnSwitch: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#121212',

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnCancel: {
    padding: 20,
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnUpload: {
    padding: 20,
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center'
  }


});