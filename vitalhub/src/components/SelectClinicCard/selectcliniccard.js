import { AntDesign } from "@expo/vector-icons"
import { ClockCard, ContainerCardsList, ContentCard, ProfileName, TextBold, ViewRow } from "../CardQuery/Style"
import { Star } from "../Icon/Style"
import { ContainerCardsListCard, ContentSelectClinic, ContentSelectClinicTitle, IconContent, Local, NumberStar, ViewRowClinicCard } from "./style"

export const SelectClinicCard = ({ title, numberStarYellow, local, date }) => {
    return (
        <ContainerCardsListCard>
            <ContentSelectClinic>
                <ProfileName>{title}</ProfileName>
                <IconContent>
                    <Star />
                    <NumberStar>{numberStarYellow}</NumberStar>
                </IconContent>
            </ContentSelectClinic>

            <ContentSelectClinic>
                <Local>{local}</Local>

                <ClockCard>
                    <AntDesign
                        name="clockcircle"
                        size={14}
                        color={"#49B3BA"}
                    />

                    <TextBold color={"#49B3BA"}>
                        {date}
                    </TextBold>
                </ClockCard>
            </ContentSelectClinic>
        </ContainerCardsListCard>
    )
}

