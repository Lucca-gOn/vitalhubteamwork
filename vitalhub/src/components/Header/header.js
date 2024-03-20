import { CalendarList } from "../Calendar/Calendar";
import { ContainerHeader, ContainerHeaderHome } from "../Container/Style";
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./Style";
import { MaterialIcons } from '@expo/vector-icons';

export function Header({source, name}) {
    return (
        <ContainerHeaderHome>
            <ContainerHeader>
                <BoxUser>
                    <ImageUser
                        source={{ uri: source }}
                    />
                    <DataUser>
                        <TextDefault>Bem vindo</TextDefault>
                        <NameUser>{name}</NameUser>
                    </DataUser>
                </BoxUser>

                <MaterialIcons name="notifications" size={25} color="white" />

            </ContainerHeader>

            <CalendarList />
        </ContainerHeaderHome>
    );
}