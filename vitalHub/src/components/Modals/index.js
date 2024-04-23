import { Modal, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
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
}) => {

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
            <ImageUser source={consultSelect.photo !== undefined ? { uri: consultSelect.photo } : require('../../assets/images/NotImage.svg')} $width="90%" $height="181px" />
          </ContainerMargin>
          <ContainerMargin $mt={20} $width="100%">
            <Title>
              {consultSelect.name}
            </Title>
          </ContainerMargin>
          <ContainerMargin $width="80%" $mt={18} $fd="row" $justContent="space-around">
            <TextQuickSandRegular>
              {consultSelect.age}
            </TextQuickSandRegular>
            <TextQuickSandRegular>
              {consultSelect.email}
            </TextQuickSandRegular>
          </ContainerMargin>

          <ContainerMargin $mt={30} $mb={20} $gap={30} $width="80%">
            <ButtonDefault textButton="Inserir prontuário" onPress={() => {
              setShowModalMedicalRecord(false)
              navigation.navigate('MedicalRecord', consultSelect);
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
                <ButtonSelectGreen texto={'Rotina'} />
                <ButtonSelectGreen texto={'Exame'} />
                <ButtonSelectGreen texto={'Urgência'} />
              </ContainerMargin>
            </ContainerMargin>

            <ContainerMargin $width="80%" $mt={20} $alingItens="flex-start">
              <TextLabelBlack>Informe a localização desejada</TextLabelBlack>
              <InputGreen placeholder="Informe a localização"></InputGreen>
            </ContainerMargin>



            <ContainerMargin $mt={143} $mb={35} $gap={30} $width="80%">
              <ButtonDefault textButton="Continuar" onPress={() => {
                navigation.navigate('SelectClinic')
                setShowModalScheduleAppointment(false)
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
  navigation
}) => {

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
              <TextData>1 de Novembro de 2023</TextData>
            </ContainerMargin>
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Médico(a) da consulta</TextLabel>
              <TextData>Dra Alessandra</TextData>
              <TextData>Demartologa, Esteticista</TextData>
            </ContainerMargin>
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Local da consulta</TextLabel>
              <TextData>São Paulo, SP</TextData>
            </ContainerMargin>
            <ContainerMargin $alingItens="flex-start" $gap={8}>
              <TextLabel>Tipo da consulta</TextLabel>
              <TextData>Rotina</TextData>
            </ContainerMargin>
          </ContainerMargin>


          <ContainerMargin $mt={30} $mb={30} $gap={30} $width="90%">
            <ButtonDefault textButton="Confirmar" onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }]
              })
              setShowSummaryMedicalAgenda(false)
            }} />

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

export const ModalDataConsult = ({
  navigation,
}) => {

  return (
    <Modal
      transparent={true}
      visible={false}
      statusBarTranslucent={true}
    // onRequestClose={() => { setShowModalMedicalRecord(false) }}
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
            <ImageUser source={require('../../assets/images/NotImage.svg')} $width="90%" $height="181px" />
          </ContainerMargin>
          <ContainerMargin $mt={20} $width="100%">
            <Title>
              Dr Claudio
            </Title>
          </ContainerMargin>
          <ContainerMargin $width="80%" $mt={18} $fd="row" $justContent="space-around">
            <TextQuickSandRegular>
              Clinico Geral
            </TextQuickSandRegular>
            <TextQuickSandRegular>
              CRM-123456
            </TextQuickSandRegular>
          </ContainerMargin>

          <ContainerMargin $mt={30} $mb={20} $gap={30} $width="80%">
            <ButtonDefault textButton="Ver local da consulta" />

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

export const ModalCamera = ({
  showModalCamera,
  setShowModalCamera,
  navigation,
  getMediaLibrary = false,
  ...rest
}) => {

  const cameraRef = useRef(null);
  const [photoCam, setPhotoCam] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front);
  const [latestPhoto, setLatestPhoto] = useState(null) //salva a ultima foto na galeria

  const clearPhoto = () => {
    setPhotoCam(null);
    setOpenModal(false);
  }

  async function capturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoCam(photo.uri);

      setOpenModal(true);
    }
  }

  async function savePhoto() {
    if (photoCam) {
      await MediaLibary.createAssetAsync(photoCam)
        .then(() => {
          alert('Sucesso', 'Foto Salva na Galeria');
        })
        .catch(error => {
          alert("Erro ao salvar foto. Detalhe : ", error);
        })
    }
  }

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

async function getLastPhoto() {
  const assets = await MediaLibary.getAssetsAsync({sortBy: [[MediaLibary.SortBy.creationTime, false]], first: 1})
  console.log(assets);
}

useEffect(() => {
  setPhotoCam(null)
  if (getMediaLibrary) {
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
          <ContainerMargin $fd="row">

            <TouchableOpacity style={stylesCamera.btnCaptura} onPress={() => capturePhoto()}>
              <FontAwesome name='camera' size={23} color={'#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesCamera.btnSwitch} onPress={() => { setTipoCamera(tipoCamera === CameraType.front ? CameraType.back : CameraType.front) }}>
              <MaterialIcons name="cameraswitch" size={24} color="#FFF" />
            </TouchableOpacity>
          </ContainerMargin>


          <Modal animationType='slide' transparent={true} visible={openModal} onRequestClose={() => setOpenModal(false)} style={{ justifyContent: "center", alignItems: "center" }}>
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
                    navigation.navigate(
                      "MedicalRecord", { fotoCam: { photoCam } }
                    )
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
    </Modal >
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
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#121212',

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnSwitch: {
    margin: 20,
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