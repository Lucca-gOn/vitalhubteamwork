import { FlatList, Text } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { Title } from "../../components/Texts/style";
import { useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";

export default function SelectMedic({
  navigation
}) {

  const [select, setSelect] = useState(null)

  const medico = [
    {id:1,name: 'Dr Lucas', especialidade: ['Demartologa']},
    {id:2,name: 'Dra Paula ', },
    {id:3,name: 'Dr Gabriel', },
    {id:4,name: 'Dr Carlos', },
    {id:5,name: 'Dra Julia', },
    {id:6,name: 'Dr Henrique', },

  ]

  return(
    <ContainerMarginStatusBar
      $bgColor="#FBFBFB"
    >
    <ContainerMargin $mt={30} $mb={30}>
      <Title>Selecionar médico</Title>
    </ContainerMargin>

    <FlatList
      data={clinicas}
      keyExtractor={(item) => item.id}
      renderItem={({item})=>(
        <ClinicCardData 
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
              <ButtonDefault textButton="Inserir prontuário" />

              <LinkUnderlineDefault
                onPress={()=> setShowModalScheduleAppointment(false)}
              >
                Cancelar
              </LinkUnderlineDefault>
            </ContainerMargin>

    </ContainerMarginStatusBar>
  )
}