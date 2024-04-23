import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { Container, ContainerMargin, ContainerScrollView } from "../../components/Conatainer";
import { Header } from "../../components/Header";
import { CalendarListWeek } from "../../components/Calendars";
import { ButtonNotSelect, ButtonSelect } from "../../components/Buttons";
import { useEffect, useState } from "react";
import CardAppointment from "../../components/CardAppointment";
import { ModalCancel, ModalDataConsult, ModalMedicalRecord, ModalScheduleAppointment } from "../../components/Modals";
import { Stethoscope } from "../../components/Stethoscope";
import { userDecodeToken } from "../../utils/Auth";
import moment from "moment";
import api from "../../service/Service";
import { useIsFocused } from "@react-navigation/native";

export default function Home(
  {
    navigation,
    route
  }
) {
  
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalMedicalRecord, setShowModalMedicalRecord] = useState(false);
  const [showModalScheduleAppointment, setShowModalScheduleAppointment] = useState(false);
  const [renderizaDados, setRenderizaDados]= useState(false);
  const [consultas, setConsultas] = useState({})
  const [dadosSituacoes, setDadosSituacoes] = useState({})
  const [consultSelect, setConsultSelect] = useState({});
  const [profile, setProfile] = useState({})
  const [select, setSelect] = useState(route.params && route.params.situacaoSelecionada ? route.params.situacaoSelecionada :'Agendadas');
  const [dateConsult, setDateConsult] = useState('');
  const [situacao, setSituacao] = useState("");
  
  const statusConsult = ['Agendadas', 'Realizadas', 'Canceladas'];
  const { name, foto,  role } = profile;
  
  
  // Função para obter os dados descriptografados do token
  async function profileLoad() {
    console.log('execultou ProfileLoad')
    const token = await userDecodeToken();
    setProfile(token);
    setDateConsult(route.params && route.params.dateConsulta ? route.params.dateConsulta : moment().format('YYYY-MM-DD'))
  }
  
  async function ListaSituacoes() {
    await api.get('/Situacao/ListarTodas')
    .then(response => {
      setDadosSituacoes(response.data)
    })
    .catch(error => {
      console.log('Erro ao listar dados de Situações : ,', error)
    })
  }
  
  async function ListarConsultas() {    
    const url = (profile.role == 'Medico' ? 'Medicos' : 'Pacientes')    
    await api.get(`/${url}/BuscarPorData?data=${dateConsult}&id=${profile.id}`)
    .then(response => {
      setConsultas(response.data);
      // console.log('Trouxe dados com sucesso Api buscar por data',response.data)
    }).catch(error => {
      console.log('Erro ao listar Consultas: ', error);
    })
    
  }

  //Executando a função ProfileLoad
  useEffect(() => {
    profileLoad();
    ListaSituacoes();
  }, [])

  useEffect(() => {
    if (dateConsult !== '') {
      ListarConsultas();
    }
  }, [dateConsult, useIsFocused(), renderizaDados])

  return (

    <Container $bgColor="#fbfbfb">

      <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'} />

      <Header navigation={navigation} name={name} foto={foto} />

      <ContainerMargin $mt={20}>
        <CalendarListWeek dateConsult={dateConsult} setDateConsult={setDateConsult} />
      </ContainerMargin>

      <ContainerMargin $fd="row" $justContent="space-between" $mt={38}>
        {statusConsult.map((status, index) => (
          <ButtonSelect key={index} selectStatus={select === status} onPress={() => { setSelect(status) }} texto={status} />
        ))}
      </ContainerMargin>

      <Container style={{ width: '90%', marginTop: 30 }}>
        <FlatList
          data={consultas}
          renderItem={({ item }) =>
            select == item.situacao.situacao && (
              <CardAppointment
                setSituacao={item.situacao.situacao}
                data={item}
                role={profile.role}
                navigation={navigation}
                selectStatus={select}
                setShowModalCancel={setShowModalCancel}
                setShowModalMedicalRecord={setShowModalMedicalRecord}
                setConsultSelect={setConsultSelect}
                dadosSituacoes={dadosSituacoes}
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

      {
        role === 'Paciente' ?
          <Stethoscope
            onPress={() => setShowModalScheduleAppointment(true)}
          /> :
          <></>
      }

      <ModalCancel
        consultSelect={consultSelect}
        dadosSituacoes={dadosSituacoes}
        setShowModalCancel={setShowModalCancel}
        showModalCancel={showModalCancel}
        setRenderizaDados={setRenderizaDados}
        renderizaDados={renderizaDados}
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
        navigation={navigation}
      />

      <ModalDataConsult />

    </Container>


  )
}

