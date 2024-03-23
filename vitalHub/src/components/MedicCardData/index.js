import { ButtonClinic } from "../Buttons/style"
import { ContainerMargin } from "../Conatainer"
import { ImageUser } from "../Images/style";
import { TextAdress, TextGrade, TextQuickSandRegular, TextWeek, TitleCard } from "../Texts/style"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MedicCardData = ({
  select,
  onPress,
  data: {
    photo,
    name,
    especificidade
  }
}) => {

  return (
    <ButtonClinic onPress={onPress} $clickButton={select} style={{ gap: 12 }}>
      <ContainerMargin $fd="row" $justContent={"flex-start"} $gap={10}>

        <ImageUser $width="77px" $height="80px" source={photo !== undefined ? { uri: photo } : require('../../assets/images/NotImage.svg')} />
        <ContainerMargin $alingItens="flex-start" $width="content" style={{gap:10}}>
          <TitleCard>{name}</TitleCard>
          <TextQuickSandRegular>
            {especificidade.map((element, index) => (
              index === 0 ? element : `, ${element}`
            ))}
          </TextQuickSandRegular>
        </ContainerMargin>
      </ContainerMargin>
    </ButtonClinic>
  )
}