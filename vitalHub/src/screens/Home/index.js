import { FlatList, StatusBar, View } from "react-native";
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer";
import { Header } from "../../components/Header";
import { CalendarListWeek } from "../../components/Calendars";
import { ButtonNotSelect, ButtonSelect } from "../../components/Buttons";
import { useState } from "react";
import CardAppointment from "../../components/CardAppointment";
import { ModalCancel, ModalDataConsult, ModalMedicalRecord, ModalScheduleAppointment } from "../../components/Modals";
import { Stethoscope } from "../../components/Stethoscope";

export default function Home(
  {
    navigation
  }
) {

  const [select, setSelect] = useState('Agendadas');

  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalMedicalRecord, setShowModalMedicalRecord] = useState(false);
  const [showModalScheduleAppointment, setShowModalScheduleAppointment] = useState(false);
  const [consultSelect, setConsultSelect] = useState({});
  // const [dataTest, setDataTeste] = useState(dataPacient);

  const statusConsult = ['Agendadas', 'Realizadas', 'Canceladas'];

  const dataPacient = [
    { id: 1, name: 'Allan Rodrigues dos Santos', age: 32, email: 'allan@allan.com', timeConsult: '15:00', typeConsult: 'Exame', statusConsult: 'Realizadas', photo: 'https://github.com/AllanR1991.png' },
    { id: 2, name: 'Everton Araujo', age: 35, email: 'eveton@everton.com', timeConsult: '12:00', typeConsult: 'Rotina', statusConsult: 'Agendadas', photo: 'https://github.com/Evertonaraujo88.png' },
    { id: 3, name: 'Teste 1', age: 35, email: 'eveton@everton.com', timeConsult: '12:00', typeConsult: 'Rotina', statusConsult: 'Agendadas', photo: 'https://github.com/Evertonaraujo88.png' },
    { id: 4, name: 'Teste 2', age: 35, email: 'eveton@everton.com', timeConsult: '12:00', typeConsult: 'Rotina', statusConsult: 'Agendadas', photo: 'https://github.com/Evertonaraujo88.png' },
    { id: 5, name: 'Teste 3', age: 35, email: 'eveton@everton.com', timeConsult: '12:00', typeConsult: 'Rotina', statusConsult: 'Agendadas', photo: 'https://github.com/Evertonaraujo88.png' },
    { id: 6, name: 'Teste 4', age: 35, email: 'eveton@everton.com', timeConsult: '12:00', typeConsult: 'Rotina', statusConsult: 'Agendadas', photo: 'https://github.com/Evertonaraujo88.png' },
    { id: 7, name: 'Evelyn Oliveira', age: 19, email: 'evelin@evelin.com', timeConsult: '08:00', typeConsult: 'Urgência', statusConsult: 'Realizadas', photo: 'https://github.com/evy-oliveira0807.png' },
    { id: 8, name: 'Kamille Milo', age: 20, email: 'kamille@kamille.com', timeConsult: '13:00', typeConsult: 'Exame', statusConsult: 'Canceladas', photo: 'https://github.com/KamiMilo.png' }
  ]


  return (
    <Container $bgColor="#fbfbfb">
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />

      <Header navigation={navigation} />

      <ContainerMargin $mt={20}>
        <CalendarListWeek />
      </ContainerMargin>

      <ContainerMargin $fd="row" $justContent="space-between" $mt={38}>
        {statusConsult.map((status, index) => (
          <ButtonSelect key={index} selectStatus={select === status} onPress={() => { setSelect(status) }} texto={status} />
        ))}
      </ContainerMargin>

      <Container style={{width:'90%', marginTop:30}}>
        <FlatList
          data={dataPacient}
          renderItem={({ item }) =>
            select == item.statusConsult && (
              <CardAppointment
                data={item}
                selectStatus={select}
                setShowModalCancel={setShowModalCancel}
                setShowModalMedicalRecord={setShowModalMedicalRecord}
                setConsultSelect={setConsultSelect}
              />
            )
          }
          keyExtractor={item => item.id}
          style={{
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}
        />
      </Container>

      <Stethoscope
        onPress={()=>setShowModalScheduleAppointment(true)}
        
      />

      <ModalCancel
        consultSelect={consultSelect}
        data={dataPacient}
        setShowModalCancel={setShowModalCancel}
        showModalCancel={showModalCancel}
      />
      <ModalMedicalRecord
        navigation={navigation}
        consultSelect={consultSelect}
        setShowModalMedicalRecord={setShowModalMedicalRecord}
        showModalMedicalRecord={showModalMedicalRecord}
      />

      {/* Modal Agendar Consulta */}
      <ModalScheduleAppointment
        setShowModalScheduleAppointment={setShowModalScheduleAppointment}
        showModalScheduleAppointment={showModalScheduleAppointment}
      />

      <ModalDataConsult />

    </Container>


  )
}