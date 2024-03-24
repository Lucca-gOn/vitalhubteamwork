import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { TextLabelBlack, Title } from "../../components/Texts/style";
import { useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import { MedicCardData } from "../../components/MedicCardData";
import { CalendarMonth } from "../../components/Calendars";
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome6 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function SelectDate({
  navigation
}) {

  const [select, setSelect] = useState(null)

  const timeCLinic = [
    {label: '08:00', value:'08:00'},
    {label: '09:00', value:'09:00'},
    {label: '10:00', value:'10:00'},
    {label: '11:00', value:'11:00'},
    {label: '12:00', value:'12:00'},
    {label: '13:00', value:'13:00'},
    {label: '14:00', value:'14:00'},
    {label: '15:00', value:'15:00'},
    {label: '16:00', value:'16:00'},
    {label: '17:00', value:'17:00'},
    {label: '18:00', value:'18:00'},
    {label: '19:00', value:'19:00'},
    {label: '20:00', value:'20:00'},
  ]

    
  return (
    <ContainerMarginStatusBar
      // $bgColor="pink"
      $bgColor="#FBFBFB"
    >
      <ContainerMargin $mt={30} $mb={30}>
        <Title>Selecionar data</Title>
      </ContainerMargin>

      <CalendarMonth />
      <ContainerMargin $alingItens="flex-start" $mt={30} $gap={10} >

        <TextLabelBlack>Selecione um horário disponível:</TextLabelBlack>


        {/* <View style={{width:'100%', borderWidth:2,borderColor:'#34898F',borderStyle:"solid", borderRadius:5}}> */}

       


          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => console.log(value)}
            items={timeCLinic}
            placeholder={{ label: 'Seleciona Horário', value: null }}

            fixAndroidTouchableBug={false}
            style={{
              headlessAndroidPicker:{
                padding:0
              },
              inputWeb:{
                padding:0
              },
              viewContainer:{
                padding:0,
                margin:0
              },
              headlessAndroidContainer:{
                padding:0,
                margin:0,
                alignItems:"center",
                justifyContent:"center",
                height:30,
                backgroundColor:'black'
              },              
              inputAndroidContainer:{
                // padding:16
              },
              inputAndroid: {
                color: '#34898F',
                backgroundColor:'pink',           
              },
              placeholder: {
                color: '#34898F',
                fontFamily: 'MontserratAlternates_600SemiBold',
                fontSize: 14,
                height: 'auto',
              }
              
            }}
          />
        {/* </View> */}
      </ContainerMargin>


      <ContainerMargin $mt={42} $mb={35} $gap={30} $width="80%">
        <ButtonDefault textButton="Continuar" />

        <LinkUnderlineDefault
          onPress={() => setShowModalScheduleAppointment(false)}
        >
          Cancelar
        </LinkUnderlineDefault>
      </ContainerMargin>

    </ContainerMarginStatusBar>
  )
}