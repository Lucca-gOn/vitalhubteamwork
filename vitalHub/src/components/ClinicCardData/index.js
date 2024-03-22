import { ButtonClinic } from "../Buttons/style"
import { ContainerMargin } from "../Conatainer"
import { TextAdress, TextGrade, TextWeek, TitleCard } from "../Texts/style"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ClinicCardData = ({
  select,
  onPress,
  data: {
    company,
    city,
    uf,
    grade,
    open
  }
}) => {

  return (
    <ButtonClinic onPress={onPress} $clickButton={select} style={{gap:12}}>
      <ContainerMargin $fd="row" $justContent="space-between" $width="100%" >
        <TitleCard>{company}</TitleCard>
        <ContainerMargin $fd="row" $width="auto">
          <AntDesign name="star" size={24} color="#F9A620" />
          <TextGrade>{grade}</TextGrade>
        </ContainerMargin>
      </ContainerMargin>
      <ContainerMargin $fd="row" $justContent="space-between" $width="100%">
        <TextAdress>{`${city}, ${uf}`}</TextAdress>

        <ContainerMargin $fd="row" $justContent="center" $alingItens="center" $width="auto" $gap={5} $pd="4px 14px" $bgColor="#E8FCFD" $borderRadius={5}>
          <MaterialCommunityIcons name="calendar" size={14} color="#49B3BA" />
          <TextWeek color="#49B3BA" >
            {open}
          </TextWeek>
        </ContainerMargin>
      </ContainerMargin>
    </ButtonClinic>
  )
}