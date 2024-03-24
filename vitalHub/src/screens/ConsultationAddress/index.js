import { StatusBar } from "react-native";
import { MapLocation } from "../../components/MapLocation";
import { Description2, TextAdress, TextLabel, Title } from "../../components/Texts/style";
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer";
import { InputGray } from "../../components/Inputs/styled";
import { ButtonDefault, ButtonGray } from "../../components/Buttons";
import { LinkUnderlineDefault } from "../../components/Links";

export default function ConsultationAddress () {
  return (
    
    <Container>

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} currentHeight />

      <MapLocation/>
      

      <ContainerScrollView style={{borderTopLeftRadius:10,borderTopRightRadius:10, position:"absolute", bottom:0, backgroundColor:'#FFF', height:'51%'}}
        showsVerticalScrollIndicator={false}
      >


        <ContainerMargin $mt={20} $width="100%">
          <Title>
            Clínica Natureh
          </Title>
        </ContainerMargin>
        <ContainerMargin $width="80%" $mt={18} $mb={24} $fd="row" $justContent="space-around">
          <TextAdress>
            Moema, SP
          </TextAdress>

        </ContainerMargin>

        
        <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20}>
          <TextLabel>Endereço</TextLabel>
          <InputGray 
            value="Rua niteroi, 80" 
            autoComplete="address-line1"
            autoCapitalize="words"
            inputMode="text"
            readOnly
            />

        </ContainerMargin>

        <ContainerMargin $fd="row" $gap={32}>

          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{flex:1}}>
            <TextLabel>Cep</TextLabel>
            <InputGray 
              value="XXXXX-XXX" 
              inputMode="decimal"
              autoComplete="postal-code"
              readOnly
              />
          </ContainerMargin> 
          <ContainerMargin $alingItens="flex-start" $gap={10} $mt={20} style={{flex:2}}>
            <TextLabel>Cidade</TextLabel>
            <InputGray 
              value="Moema-SP" 
              inputMode="text"
              autoCapitalize="words"
              readOnly
              />
          </ContainerMargin>
        </ContainerMargin>

        <ContainerMargin $mt={30} $gap={30} $mb={30}>
        <LinkUnderlineDefault>
          Voltar
        </LinkUnderlineDefault>
        </ContainerMargin>
      </ContainerScrollView>


    </Container>
  )
}