import { FlatList, Text } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { Title } from "../../components/Texts/style";
import { useEffect, useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import api from "../../service/Service";


export default function SelectClinic({
  navigation
}) {

  const [select, setSelect] = useState(null)
  const [clinicList, setClinicList] = useState([]);

  async function ListarClinicas(){
    try {
      const response = await api.get('/Clinica/ListarTodas');
      setClinicList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ListarClinicas()
  },[])

  return (
    <ContainerMarginStatusBar
      $bgColor="#FBFBFB"
    >
      <ContainerMargin $mt={30} $mb={30}>
        <Title>Selecionar clínica</Title>
      </ContainerMargin>

      <FlatList
        data={clinicList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClinicCardData
            data={item}
            onPress={() => setSelect(item.id)}
            select={select === item.id}
          />
        )}
        style={{
          width: '90%',
        }}
        showsVerticalScrollIndicator={false}
      >

      </FlatList>

      <ContainerMargin $mt={30} $mb={35} $gap={30} $width="80%">
        <ButtonDefault textButton="Continuar" onPress={() => navigation.navigate('SelectMedic')} />

        <LinkUnderlineDefault onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }]
          })
        }}>
          Cancelar
        </LinkUnderlineDefault>
      </ContainerMargin>

    </ContainerMarginStatusBar>
  )
}