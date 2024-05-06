import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { TextLabelBlack, Title } from "../../components/Texts/style";
import { useEffect, useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import { MedicCardData } from "../../components/MedicCardData";
import { CalendarMonth } from "../../components/Calendars";
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome6 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SummaryMedicalAgenda } from "../../components/Modals";
import moment from "moment";

const screenWidth = Dimensions.get('window').width;

export default function SelectDate({
  navigation,
  route
}) {

  const dataAtual = moment().format('YYYY-MM-DD');
  const [select, setSelect] = useState(null);
  const [showSummaryMedicalAgenda, setShowSummaryMedicalAgenda] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [agendamento, setAgendamento] = useState({
    dataConsulta: null
  });

  const [arrayOptions, setArrayOptions] = useState(null);

  function LoadOptions() {
    //Conferir quantas horas falta até as 00:00
    const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), 'hours')
    //console.log(horasRestantes);
    //Criar um laço que tode a quantidade de horas que falta
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      return {
        label: `${valor}:00`, value: `${valor}:00`
      }
    })

    //Devolver para cada hora, uma nova opção para o select
    setArrayOptions(options);
  }

  function handlecontinue() {
    setAgendamento({
      ...route.params.agendamento,
      dataConsulta: `${dataSelecionada} ${horaSelecionada}`
    });

    setShowSummaryMedicalAgenda(true)
  }

  useEffect(() => {
    LoadOptions();
  }, [])

  useEffect(() => {
    console.log(route);
  }, [route])

  useEffect(() => {
    console.log(dataSelecionada);
  }, [dataSelecionada])
  return (
    <ContainerMarginStatusBar
      // $bgColor="pink"
      $bgColor="#FBFBFB"
    >
      <ContainerMargin $mt={30} $mb={30}>
        <Title>Selecionar data</Title>
      </ContainerMargin>

      <CalendarMonth
        dataSelecionada={dataSelecionada}
        setDataSelecionada={setDataSelecionada}
      />
      <ContainerMargin $alingItens="flex-start" $mt={30} $gap={10} >

        <TextLabelBlack>Selecione um horário disponível:</TextLabelBlack>


        <View style={{ width: '100%', borderWidth: 2, borderColor: '#34898F', borderStyle: "solid", borderRadius: 5 }}>
          {arrayOptions ? (
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              onValueChange={(value) => setHoraSelecionada(value)}
              items={arrayOptions}
              placeholder={{ label: 'Seleciona Horário', value: null }}
              Icon={() => {
                return (
                  <TouchableOpacity>
                    <AntDesign name="caretdown" size={14} color="#34898F" />
                  </TouchableOpacity>
                )
              }}
              style={{
                iconContainer: {
                  height: '100%',
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  zIndex: 0
                },
                headlessAndroidContainer: {
                  justifyContent: "center",
                },
                inputIOS: {
                  color: '#34898F',
                  padding: 16,
                },
                inputAndroid: {
                  color: '#34898F',
                  padding: 16,
                  width: '100%',
                  zIndex: 10,
                },
                inputWeb: {
                  color: '#34898F',
                  padding: 16,
                },
                placeholder: {
                  color: '#34898F',
                  fontFamily: 'MontserratAlternates_600SemiBold',
                  fontSize: 14,
                  height: 'auto',
                }
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ContainerMargin>


      <ContainerMargin $mt={42} $mb={30} $gap={30}>
        <ButtonDefault
          textButton="Continuar"
          onPress={() => {
            if (dataSelecionada !== null && horaSelecionada !== null) {
              handlecontinue()
            }
          }} />

        <LinkUnderlineDefault
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }]
            })
          }}
        >
          Cancelar
        </LinkUnderlineDefault>
      </ContainerMargin>


      {agendamento && (
        <SummaryMedicalAgenda
          agendamento={agendamento}
          showSummaryMedicalAgenda={showSummaryMedicalAgenda}
          setShowSummaryMedicalAgenda={setShowSummaryMedicalAgenda}
          navigation={navigation}
        />
      )}
    </ContainerMarginStatusBar>
  )
}