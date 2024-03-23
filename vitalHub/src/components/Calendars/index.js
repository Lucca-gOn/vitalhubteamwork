import { View, StyleSheet } from 'react-native';
import { CalendarListStyle, CalendarMonthStyle } from './style';
import { useState } from 'react';
import moment from 'moment';
import { Calendar, LocaleConfig } from 'react-native-calendars';



export const CalendarListWeek = () => {
  return (
    <View style={{ width: '100%' }}>
      <CalendarListStyle />
    </View>
  )
};


LocaleConfig.locales['pt-br'] = {
  monthNames: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
    "_"
  ),
  monthNamesShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
  dayNames: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
    "_"
  ),
  dayNamesShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
  today: 'Hoje',
}

LocaleConfig.defaultLocale = 'pt-br';

export const CalendarMonth = () => {
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  // console.log(moment().format('YYYY-MM-DD'))
  return (
    <View
      style={{ width: '100%', height:276+81 }}
    >
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          // console.log(day.dateString)
        }}
        
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#60BFC5', }
        }}
        hideArrows={true}
        hideExtraDays
        enableSwipeMonths

        theme={{
          calendarBackground:'transparent',
          textMonthFontFamily:'MontserratAlternates_600SemiBold',
          textMonthFontSize:20,
          textDayFontFamily:'Quicksand_600SemiBold',
          textDayFontSize:16,
          textDayStyle:{
            color:'#5F5C6B'
          },
          textDayHeaderFontFamily:'Quicksand_600SemiBold',
          textDayHeaderFontSize:12,
        }}
        
      />
    </View>
  )
}
