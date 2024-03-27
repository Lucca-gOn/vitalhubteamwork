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
    idNavigation : {nome, foto},
    especialidade
  },
  data
}) => {
  console.log(data)
  return (
    <ButtonClinic onPress={onPress} $clickButton={select} style={{ gap: 12 }}>
      <ContainerMargin $fd="row" $justContent={"flex-start"} $gap={10}>

        <ImageUser $width="77px" $height="80px" source={(foto !== undefined && foto !== 'string' )? { uri: foto } : require('../../assets/images/NotImage.svg')} />
        <ContainerMargin $alingItens="flex-start" $width="content" style={{gap:10}}>
          <TitleCard>{nome}</TitleCard>
          <TextQuickSandRegular>
            {/* {especificidade.map((element, index) => (
              index === 0 ? element : `, ${element}`
            ))} */}
            {especialidade.especialidade1}
          </TextQuickSandRegular>
        </ContainerMargin>
      </ContainerMargin>
    </ButtonClinic>
  )
}