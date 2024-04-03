import { ContainerMargin } from "../Conatainer"

import { NivelConsult, TextCancelAppointment, TextNameUserBlack, TextPontuarioAppointment, TextQuickSandRegular, TitleHeader } from "../Texts/style"
import { Entypo } from '@expo/vector-icons';
import { Time } from "../Time";
import { ImageUser } from "../Images/style";

export default CardAppointment = (
  {
    setShowModalCancel,
    setShowModalMedicalRecord,
    setConsultSelect,
    selectStatus,
    data,
    role
  }
) => {
  //const roles = role == 'Medico'? 'paciente' : 'medicoClinica.medico';
  console.log('Dados medico : ', data)


  return (
    <ContainerMargin $pd="11px 10px" $mb={20} $fd="row" $bgColor="#FFF" $width="100%" $gap={10} $borderRadius={5} style={{ elevation: 5 }}>
      {/* <ImageUser $width="77px" $height="80px" source={data.paciente.idNavigation.foto !== undefined ? { uri: data.paciente.idNavigation.fotos } : require('../../assets/images/NotImage.svg')} /> */}

      <ContainerMargin $width='none' $alingItens="flex-start" style={{ flex: 1 }} >
        <TextNameUserBlack></TextNameUserBlack>
        <ContainerMargin $fd="row" $gap={7} $mt={5} $mb={11} $justContent="flex-start" $width="content">
          {/* <TextQuickSandRegular>{age < 2 ? age + ' ano' : age + ' anos'}</TextQuickSandRegular> */}
          <Entypo name="dot-single" size={10} color="#D9D9D9" />
          {/* <NivelConsult>{typeConsult}</NivelConsult> */}
        </ContainerMargin>
        <ContainerMargin $width="100%" $fd="row" $justContent="space-between" >
          {/* <Time timeConsult={timeConsult} selectStatus={selectStatus === 'Agendadas'} /> */}
          {
            selectStatus === 'Agendadas' ?
              <TextCancelAppointment onPress={() => {
                setShowModalCancel(true)
                setConsultSelect(data)
              }}>
                Cancelar
              </TextCancelAppointment>
              : selectStatus === 'Realizadas' ?
                <TextPontuarioAppointment
                  onPress={() => {
                    setShowModalMedicalRecord(true)
                    setConsultSelect(data)
                  }}
                >
                  Ver Prontuario</TextPontuarioAppointment>
                : <></>
          }
        </ContainerMargin>
      </ContainerMargin>


    </ContainerMargin>

  )
}