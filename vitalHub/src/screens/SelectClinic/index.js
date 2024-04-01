import { FlatList, Text } from "react-native";
import { ContainerMargin, ContainerMarginStatusBar } from "../../components/Conatainer";
import { Title } from "../../components/Texts/style";
import { useEffect, useState } from "react";
import { ClinicCardData } from "../../components/ClinicCardData";
import { ButtonDefault } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";

export default function SelectClinic({
  navigation
}) {

  const [select, setSelect] = useState(null)
  const [clinicaLista, setClinicaLista] = useState([]);

  async function ListarClinicas(){
    //Instanciar a chamada da api
    api.get('/Clinica/ListarTodas')
    .then( response => {
      setClinicaLista(response.data)
    }).catch( error =>{
      console.log(error);
    })
  }

  useEffect(() => {
    ListarClinicas()
  },[])

  const clinicas = [
    { id: 1, company: 'Clínica Natureh', grade: 4.5, city: 'São Paulo', uf: 'SP', open: 'Seg-Sex' },
    { id: 2, company: 'Diamond Pró-Mulher', grade: 4.8, city: 'São Paulo', uf: 'SP', open: 'Seg-Sex' },
    { id: 3, company: 'Clinica Villa Lobos', grade: 4.2, city: 'Taboão', uf: 'SP', open: 'Seg-Sab' },
    { id: 4, company: 'SP Oncologia Clínica', grade: 4.2, city: 'Taboão', uf: 'SP', open: 'Seg-Sab' },
    { id: 5, company: 'Policlínica Centro', grade: 5, city: 'São Bernardo do Campo', uf: 'SP', open: 'Seg-Sab' },
    { id: 6, company: 'Clínica Natureh', grade: 4.5, city: 'São Paulo', uf: 'SP', open: 'Seg-Sex' },
    { id: 7, company: 'Diamond Pró-Mulher', grade: 4.8, city: 'São Paulo', uf: 'SP', open: 'Seg-Sex' },
    { id: 8, company: 'Clinica Villa Lobos', grade: 4.2, city: 'Taboão', uf: 'SP', open: 'Seg-Sab' },
    { id: 9, company: 'SP Oncologia Clínica', grade: 4.2, city: 'Taboão', uf: 'SP', open: 'Seg-Sab' },
    { id: 10, company: 'Policlínica Centro', grade: 5, city: 'São Bernardo do Campo', uf: 'SP', open: 'Seg-Sab' },
  ]

  return (
    <ContainerMarginStatusBar
      $bgColor="#FBFBFB"
    >
      <ContainerMargin $mt={30} $mb={30}>
        <Title>Selecionar clínica</Title>
      </ContainerMargin>

      <FlatList
        data={clinicaLista}
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