import { View, Text } from "react-native";
import { Header } from "../../components/Header/Header";
import { Container } from "../../components/Container/Style";
import { useState } from "react";
import { ContentStatus } from "../../components/Content/Style";
import { StatusQuery } from "../../components/StatusQuery/StatusQuery";
import { ListComponent } from "../../components/List/List";
import { CardQuery } from "../../components/CardQuery/CardQuery";
import { CancellationModal } from "../../components/CancellationModal/CancellationModal";
import { MedicalRecordModal } from "../../components/MedicalRecordModal/MedicalRecordModal";

const Query = [
    { id: 1, nome: "Lucas", situacao: "agendadas" },
    { id: 2, nome: "Lucas2", situacao: "realizado" },
    { id: 3, nome: "Lucas3", situacao: "cancelado" },
    { id: 4, nome: "Lucas4", situacao: "realizado" },
    { id: 5, nome: "Lucas5", situacao: "realizado" },
    { id: 6, nome: "Lucas6", situacao: "agendadas" },
    { id: 7, nome: "Lucas7", situacao: "agendadas" },
    { id: 8, nome: "Lucas8", situacao: "agendadas" },

]

export function MedicQuery() {
    const [statusList, setStatusList] = useState("agendadas")

    //State para os modals
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalMedicalRecord, setshowModalMedicalRecord] = useState(false);
    
    return (
        <>
            <Header source="https://github.com/Lucca-gOn.png" name="Dr. Lucas"/>
            <Container>
                <ContentStatus>
                    <StatusQuery textButton={"Agendadas"} clickButton={statusList === "agendadas"} onPress={() => setStatusList("agendadas")} />
                    <StatusQuery textButton={"Realizadas"} clickButton={statusList === "realizado"} onPress={() => setStatusList("realizado")} />
                    <StatusQuery textButton={"Canceladas"} clickButton={statusList === "cancelado"} onPress={() => setStatusList("cancelado")} />
                </ContentStatus>

                <ListComponent
                    data={Query}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) =>
                        statusList == item.situacao && (
                            <CardQuery
                                situacao={item.situacao}
                                onPressCancel={() => setShowModalCancel(true)}
                                onPressMedicalRecord={() => setshowModalMedicalRecord(true)}
                            />
                        )
                    }

                    contentContainerStyle={{ alignItems: 'center' }}
                />

                <CancellationModal visible={showModalCancel} setShowModalCancel={setShowModalCancel} />
                <MedicalRecordModal visible={showModalMedicalRecord} setshowModalMedicalRecord={setshowModalMedicalRecord} />
            </Container>
        </>

    );
}