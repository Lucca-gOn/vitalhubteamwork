import { Marker } from "react-native-maps";
import { Container } from "../../components/Container/Style";
import { MapLocal } from "./style";
import { DoubleView, MapContent, ViewColum } from "../../components/Content/Style";
import { Subtitle, Title, TitleCalendar } from "../../components/Title/Style";
import { ScrollForm } from "../InsertMedicalRecord/style";
import { BoxInput, InputDouble, InputLabel, InputNotEditable } from "../../components/Input/Style";
import { ViewRow } from "../../components/CardQuery/Style";
import MapViewDirections from "react-native-maps-directions";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text } from 'react-native';
import { mapskey } from "../../../Utils/mapsApiKey";

export const ConsultationLocal = () => {
    const mapReference = useRef(null);

    const [initialPosition, setInitialPosition] = useState(null);

    const [finalPosition, setFinalPosition] = useState({
        latitude: -23.6902,
        longitude: -46.5882,
    });

    async function CatchLocalization() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const captureLocation = await getCurrentPositionAsync()

            setInitialPosition(captureLocation)

            console.log(initialPosition);
        }
    }

    useEffect(() => {
        CatchLocalization()
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, async (response) => {
            await setInitialPosition(response)
            mapReference.current?.animateCamera({
                pitch: 60,
                center: response.coords
            })
            console.log(response);
        })
    }, [1000])

    useEffect(() => {
        RechargeVisuzualization()
    }, [initialPosition])

    async function RechargeVisuzualization() {
        if (mapReference.current && initialPosition) {
            await mapReference.current.fitToCoordinates(
                [{
                    latitude: initialPosition.coords.latitude,
                    longitude: initialPosition.coords.longitude,
                },
                {
                    latitude: finalPosition.latitude,
                    longitude: finalPosition.longitude,
                }],
                {
                    edgePadding: { top: 60, right: 60, left: 60, bottom: 60 },
                    animated: true
                }
            )
        }
    }
    return (

        <Container>
            {
                initialPosition != null
                    ? (
                        <Map
                            initialRegion={{
                                latitude: -23.6152,
                                longitude: -46.5708,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: initialPosition.coords.latitude,
                                    longitude: initialPosition.coords.longitude,
                                }}
                                title='Origin'
                                pinColor='green'
                                description='AtualPosition'
                            />
                            <MapViewDirections
                                origin={initialPosition.coords}
                                destination={{
                                    latitude: -23.6152,
                                    longitude: -46.5708,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                                strokeWidth={5}
                                strokeColor='#496BBA'
                                apikey={mapskey}
                            />
                            <Marker
                                coordinate={{
                                    latitude: -23.6152,
                                    longitude: -46.5708,
                                }}
                                title="Niteroi, 180"
                                description="São Caetano do Sul, São Paulo"
                            />
                        </Map>
                    ) : (
                        <>
                            <Text>Not Found</Text>
                            <ActivityIndicator />
                        </>
                    )
            }
            <MapLocal // Alterado para usar MapLocal
                initialRegion={{
                    latitude: -23.6152,
                    longitude: -46.5708,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: -23.6152,
                        longitude: -46.5708,
                    }}
                    title="Niteroi, 180"
                    description="São Caetano do Sul, São Paulo"
                />
            </MapLocal>
            <MapContent>
                <TitleCalendar>Clínica Natureh</TitleCalendar>
                <Subtitle>São Paulo , SP</Subtitle>

                <ViewColum style={{ width: '90%' }}>
                    <InputLabel>Endereço</InputLabel>
                    <InputNotEditable
                        placeholder="Rua Vicenso Silva, 987"
                    />
                </ViewColum>

                <DoubleView>
                    <ViewColum>
                        <InputLabel>Número</InputLabel>
                        <BoxInput>
                            <InputDouble
                                placeholder="578"
                            />
                        </BoxInput>
                    </ViewColum>

                    <ViewColum>
                        <InputLabel>Bairro</InputLabel>
                        <BoxInput>
                            <InputDouble
                                placeholder="Moema-SP"
                            />
                        </BoxInput>
                    </ViewColum>

                </DoubleView>
            </MapContent>

        </Container>
    )
}
