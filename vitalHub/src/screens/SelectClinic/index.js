import { FlatList, Text } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { Title } from "../../components/Texts/style";
import { useEffect, useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import api from "../../service/Service";


export default function SelectClinic({
  navigation,
  route
}) {

  const [select, setSelect] = useState(null)
  const [clinicList, setClinicList] = useState([]);
  const [clinica, setClinica] = useState(null)

  async function ListarClinicas() {
    try {
      const response = await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`);
      setClinicList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleContinue() {
    navigation.replace("SelectMedic", {
      agendamento: {
        ...route.params.agendamento,
        ...clinica
      }
    }
    )
  }

  useEffect(() => {
    ListarClinicas()
  }, [])

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
            onPress={() => {
              setSelect(item.id)
              setClinica({
                ...clinica,
                clinicaId: item.id,
                clinicaLabel: item.nomeFantasia

              })
              //console.log(clinica);
            }}

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
        <ButtonDefault
          textButton="Continuar"
          onPress={ () =>{
            if(select !== null){
              handleContinue()
            }
          }
          }
        />

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