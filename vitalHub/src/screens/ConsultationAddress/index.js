import { ActivityIndicator, StatusBar, Text } from "react-native";
import { MapLocation } from "../../components/MapLocation";
import { Description2, TextAdress, TextLabel, Title } from "../../components/Texts/style";
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer";
import { InputGray } from "../../components/Inputs/styled";
import { ButtonDefault, ButtonGray } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";
import { useEffect, useState } from "react";
import api from "../../service/Service";

export default function ConsultationAddress({
  navigation,
  route
}) {
  const [clinica, setClinica] = useState({})

  async function BuscarClinica() {
    //console.log('valo de clinica :', clinica)
    await api.get(`/Clinica/BuscarPorId?id=${route.params.modalLocal.medicoClinica.clinicaId}`)
      .then((response) => {
        setClinica(response.data)
        //console.log('valo de clinica depois do set :',response.data)
        //console.log(`Dados obtidos a fazer buscaPorID em Clinica: `, response.request);
      })
      .catch(error => {
        'Erro ao buscar clinica por id = ', error
      })
  }

  useEffect(() => {
    BuscarClinica()
  }, [])

  return (

    <Container>

      {
        clinica !== null ? (


          <>


            <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />

            <MapLocation latitudeClinica={clinica.endereco?.latitude} longitudeClinica={clinica.endereco?.longitude} nomeClinica={clinica.nomeFantasia} />


            <ContainerScrollView style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, position: "absolute", bottom: 0, backgroundColor: '#FFF', height: '51%' }}
              showsVerticalScrollIndicator={false}
            >


              <ContainerMargin $mt={20} $width="100%">
                <Title>
                  {clinica.nomeFantasia}
                </Title>
              </ContainerMargin>
              <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
                <TextAdress>
                  {clinica.endereco?.cidade}
                </TextAdress>

              </ContainerMargin>


              <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
                <TextLabel>Endereço</TextLabel>
                <InputGray
                  value={clinica.endereco?.logradouro}
                  autoComplete="address-line1"
                  autoCapitalize="words"
                  inputMode="text"
                  readOnly
                />

              </ContainerMargin>

              <ContainerMargin $fd="row" $gap={32}>

                <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 1 }}>
                  <TextLabel>Cep</TextLabel>
                  <InputGray
                    value={clinica.endereco?.cep}
                    inputMode="decimal"
                    autoComplete="postal-code"
                    readOnly
                  />
                </ContainerMargin>
                <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{ flex: 2 }}>
                  <TextLabel>Cidade</TextLabel>
                  <InputGray
                    value={clinica.endereco?.cidade}
                    inputMode="text"
                    autoCapitalize="words"
                    readOnly
                  />
                </ContainerMargin>
              </ContainerMargin>

              <ContainerMargin $mt={30} $gap={30} $mb={30}>
                <LinkUnderlineDefault onPress={() => navigation.goBack()}>
                  Voltar
                </LinkUnderlineDefault>
              </ContainerMargin>
            </ContainerScrollView>
          </>

        ) :

          (
            <ActivityIndicator />
          )
      }


    </Container>
  )
}