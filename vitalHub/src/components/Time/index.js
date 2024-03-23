import { Text, View } from "react-native"
import { ContainerMargin, ContanierTime } from "../Conatainer"
import { AntDesign } from '@expo/vector-icons';
import { TextTime } from "../Texts/style";

export const Time = (
  {
    selectStatus,
    timeConsult
  }
) => {
  return(
    <ContanierTime selectStatus={selectStatus}>
      <AntDesign name="clockcircle" size={12} color= {selectStatus?"#49B3BA": "#4E4B59" } />
      <TextTime selectStatus={selectStatus}>{timeConsult}</TextTime>
    </ContanierTime>
  )
}