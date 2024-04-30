import { View, StyleSheet } from 'react-native';
import { CalendarListStyle, CalendarMonthStyle } from './style';
import { useState } from 'react';
import moment from 'moment';
import { Calendar, LocaleConfig } from 'react-native-calendars';



export const CalendarListWeek = ({
  setDateConsult,
  dateConsult
}) => {
  return (
    <View style={{ width: '100%' }}>
      <CalendarListStyle dateConsult={dateConsult} setDateConsult={setDateConsult} />
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

export const CalendarMonth = ({
  setDataSelecionada,
  dataSelecionada
}) => {
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  // console.log(moment().format('YYYY-MM-DD'))

  return (
    <View style={{ width: '100%', height: 276 + 81 }}>
      <Calendar
        onDayPress={(date) => {
          setSelected(date.dateString); // Atualiza a data selecionada internamente
          setDataSelecionada(date.dateString); // Passa a data selecionada para o estado externo
        }}

        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#60BFC5' },
          [dataSelecionada]: { selected: true, disableTouchEvent: true, selectedColor: '#60BFC5' }
        }}

        minDate={moment().format('YYYY-MM-DD')} // Não permite selecionar dias anteriores ao dia atual

        hideArrows={true} // Esconde as setas de navegação
        hideExtraDays // Esconde os dias do mês anterior/próximo que aparecem no mês atual
        enableSwipeMonths // Permite mudar de mês com gestos de deslizar

        theme={{
          calendarBackground: 'transparent', // Fundo transparente para o calendário
          textMonthFontFamily: 'MontserratAlternates_600SemiBold', // Fonte para o mês
          textMonthFontSize: 20, // Tamanho da fonte para o mês
          textDayFontFamily: 'Quicksand_600SemiBold', // Fonte para os dias
          textDayFontSize: 16, // Tamanho da fonte para os dias
          textDayStyle: {
            color: '#5F5C6B' // Cor dos dias
          },
          textDayHeaderFontFamily: 'Quicksand_600SemiBold', // Fonte para os cabeçalhos dos dias
          textDayHeaderFontSize: 12, // Tamanho da fonte para os cabeçalhos dos dias
        }}
      />
    </View>
  );
}
