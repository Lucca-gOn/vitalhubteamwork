import { React, useState } from 'react';
import { Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março', 'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],

    monthNamesShort: [
        'jan',
        'fev',
        'mar',
        'abr',
        'maio',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez'
    ],

    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    today: "Hoje"
};

//Idioma padrao
LocaleConfig.defaultLocale = 'pt-br';


export const CalendarChoose = () => {

    //Data Selecionada
    const [selected, setSelected] = useState('');

    const isFutureDate = (dateString) => {
        const selectedDate = new Date(dateString);
        const currentDate = new Date();
        return selectedDate > currentDate;
    };

    return (
        <Calendar
            style={{
                width: '100%',
                aspectRatio: 2,
                backgroundColor: '#fafafa',
                marginBottom: 170,
            }}

            useNativeAndroidPickerStyle={false}
            enableSwipeMonths
            onDayPress={day => {
                if (isFutureDate(day.dateString)) {
                    setSelected(day.dateString);
                } else {
                    alert('Por favor, selecione uma data futura.');
                }
            }}

            hideArrows={false}

            theme={{
                calendarBackground: '#fafafa',
                dayContainerStyle: {
                    backgroundColor: '#fafafa',
                },
                selectedDayBackgroundColor: '#49B3BA',
                selectedDayTextColor: '#FFFFFF',
                dayBackgroundColor: 'transparent'
            }}

            markedDates={{
                [selected]: { selected: true, disableTouchEvent: true }
            }}
            customStyles={{
                monthText: { fontFamily: "MontserratAlternates_600SemiBold", fontSize: 20 },
                dayText: { fontFamily: "Quicksand_600SemiBold" },
            }}
            renderHeader={(date) => <Text style={{ fontFamily: 'MontserratAlternates_600SemiBold', fontSize: 20 }}>{date.toString('MMMM yyyy')}</Text>}
        />
    )
}