import styled from "styled-components/native";
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import 'moment/locale/pt-br';
import moment from "moment";

const locale = {
  name: 'pt-br',
  config: {
    months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),
    monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
    weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
      "_"
    ),
    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
    weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),

  }
};

const currentDate = new Date();
const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

export const CalendarListStyle = styled(CalendarStrip).attrs((props) => ({
  selectedDate: currentDate,

  startingDate: currentDate,

  minDate: startingDate,

  maxDate: endingDate,
  
  //  Permite mover escrolar o calendário.
  scrollable: true,

  //  Retira os icones de mover o calendário.
  iconContainer: {
    display: 'none'
  },

  //  Animação
  calendarAnimation: {
    type: "sequence",
    duration: 30
  },

  //  Animação da seleção
  daySelectionAnimation: {
    type: "border",
    duration: 200,
    borderWidth: 2,
    borderHighlightColor: "#49b3ba"
  },

  //  Cor do calendário
  calendarColor: 'transparent',

  //  Edição do cabeçalho

  calendarHeaderContainerStyle: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  }, 

  calendarHeaderStyle: {
    color: '#4E4B59',
    fontFamily: 'MontserratAlternates_600SemiBold',
    fontSize: 20,
    textAlign: "left",
    textTransform: "capitalize"
  },

  //  Edição do nome da data

  dateNameStyle: {
    color: '#ACABB7',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 12,
    textTransform: "capitalize"
  },

  // Edição do numero da data  

  dateNumberStyle: {
    color: '#5F5C6B',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 16
  },

  //  Edição quando a data é selecionada

  highlightDateNameStyle: {
    color: '#FFF',
    fontSize: 12,
    flexShrink: 1,
  },

  highlightDateNumberStyle: {
    color: '#FFF',
    fontSize: 16,
    flexShrink: 1,
  },

  highlightDateContainerStyle: {
    backgroundColor: '#60BFC5',

  },

  onDateSelected: (date) => {props.setDateConsult(moment(date).format('YYYY-MM-DD')) },

  useIsoWeekday:false ,

  shouldAllowFontScaling: false, //Evita que a font cresça

  maxDayComponentSize: 60,  //Tamanho maximo do componente dia

  minDayComponentSize: 48,  // Tamanho minimo do componente dia
}))` 
  width: '100%';
  height: 100px;
`

