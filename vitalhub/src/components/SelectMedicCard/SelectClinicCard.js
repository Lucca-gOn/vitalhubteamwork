import { ProfileName } from "../CardQuery/Style"
import {  ContainerMedicCard, ImageSelectMedic, MedicSpecialty} from "./Style"
import { ContentText } from "../Content/Style"
import { ContainerCardsListCard } from "../SelectClinicCard/style"

export const SelectMedicCard = ({ title, subtitle, source }) => {
    return (
        <ContainerMedicCard>
            <ImageSelectMedic source={{ uri: source }} />

            <ContentText>
                <ProfileName>{title}</ProfileName>
                <MedicSpecialty>{subtitle}</MedicSpecialty>
            </ContentText>
        </ContainerMedicCard>
    )
}

