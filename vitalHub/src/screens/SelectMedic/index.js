import { FlatList, Text } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { Title } from "../../components/Texts/style";
import { useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import { MedicCardData } from "../../components/MedicCardData";

export default function SelectMedic({
  navigation
}) {

  const [select, setSelect] = useState(null)
  
  const dataMedic = [
    { id: 1, name: 'Alessandra', especificidade: ['Cirurgião', 'Cardiologista'], photo: 'https://avatars.githubusercontent.com/u/133692577?v=4' },
    { id: 2, name: 'Kumushiro', especificidade: ['Clínico', 'Pediatra'], photo: 'https://avatars.githubusercontent.com/u/125310213?v=4' },
    { id: 3, name: 'Rodrigo Santos', especificidade: ['Demartologa', 'Esteticista'], photo: 'https://avatars.githubusercontent.com/u/125275514?v=4' },
    { id: 4, name: 'Alessandra', especificidade: ['Cirurgião', 'Cardiologista'], photo: 'https://avatars.githubusercontent.com/u/133692577?v=4' },
    { id: 5, name: 'Kumushiro', especificidade: ['Clínico', 'Pediatra'], photo: 'https://avatars.githubusercontent.com/u/125310213?v=4' },
    { id: 6, name: 'Rodrigo Santos', especificidade: ['Demartologa', 'Esteticista'], photo: 'https://avatars.githubusercontent.com/u/125275514?v=4' },
    { id: 7, name: 'Alessandra', especificidade: ['Cirurgião', 'Cardiologista'], photo: 'https://avatars.githubusercontent.com/u/133692577?v=4' },
    { id: 8, name: 'Kumushiro', especificidade: ['Clínico', 'Pediatra'], photo: 'https://avatars.githubusercontent.com/u/125310213?v=4' },
    { id: 9, name: 'Rodrigo Santos', especificidade: ['Demartologa', 'Esteticista'], photo: 'https://avatars.githubusercontent.com/u/125275514?v=4' },
  ]

  return(
    <ContainerMarginStatusBar
      $bgColor="#FBFBFB"
    >
    <ContainerMargin $mt={30} $mb={30}>
      <Title>Selecionar Médico</Title>
    </ContainerMargin>

    <FlatList
      data={dataMedic}
      keyExtractor={(item) => item.id}
      renderItem={({item})=>(
        <MedicCardData 
          data={item}
          onPress={()=> setSelect(item.id)}
          select={select === item.id}
        />
      )}
      style={{
        width:'90%',
      }}
      showsVerticalScrollIndicator={false}
    >

    </FlatList>

    <ContainerMargin $mt={30} $mb={35} $gap={30} $width="80%">
              <ButtonDefault textButton="Continuar" />

              <LinkUnderlineDefault
                onPress={()=> setShowModalScheduleAppointment(false)}
              >
                Cancelar
              </LinkUnderlineDefault>
            </ContainerMargin>

    </ContainerMarginStatusBar>
  )
}