import { useState } from "react";
import { Container } from "../../components/Container/Style";
import { IconSelect } from "../../components/Icon/Style";
import { SelectPicker } from "../../components/ScheduleAppointmentModal/Style";
import { TitleSelectClinic, TitleWithInput } from "../../components/Title/Style";
import RNPickerSelect from 'react-native-picker-select';
import { ContentLinkCenter, InputWithTitleContent } from "../../components/Content/Style";
import { ButtonMedicalRecord, ButtonTitle } from "../../components/Button/Style";
import { LinkBlueMontserratMargin } from "../../components/Links/Style";
import { CalendarChoose } from "../../components/CalendarChoose/calendarchoose.js";


export function SelectDate() {

    const [selectedValueTime, setSelectedValueTime] = useState("");

    const availabletime = [
        { label: "Horário 1", value: "1" },
        { label: "Horário 2", value: "2" },
    ];

    return (
        <Container>
            <TitleSelectClinic>Selecionar data</TitleSelectClinic>

            <CalendarChoose />

            <InputWithTitleContent style={{ width: '90%' }}>
                <TitleWithInput>Informe o tipo de consulta</TitleWithInput>
            </InputWithTitleContent>

            <SelectPicker style={{ width: '90%' }}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedValueTime(value)}
                    items={availabletime}
                    placeholder={{ label: "Selecionar horário", value: null }}
                    value={selectedValueTime}
                    style={{
                        inputIOS: {
                            color: '#34898F',
                            fontFamily: "MontserratAlternates_600SemiBold",
                            fontSize: 14,
                            //Arrumar picker
                            // borderWidth: 1, // Define a largura da borda
                            // borderColor: '#34898F', // Define a cor da borda
                            // borderStyle: 'solid', // Define o estilo da borda
                        },
                    }}
                />
                <IconSelect />
            </SelectPicker>

            <ButtonMedicalRecord style={{ width: '90%' }}> 
                <ButtonTitle>Confirmar</ButtonTitle>
            </ButtonMedicalRecord>

            <ContentLinkCenter style={{ width: '90%' }}>
                <LinkBlueMontserratMargin>Cancelar</LinkBlueMontserratMargin>
            </ContentLinkCenter>
        </Container>
    );
}