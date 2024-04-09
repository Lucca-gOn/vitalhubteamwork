import { useEffect, useRef, useState } from "react"
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import
MapView,
{
  Marker,
  PROVIDER_GOOGLE
} from 'react-native-maps'
import MapViewDirections from "react-native-maps-directions";
import { mapskey } from '../../utils/mapsApiKey'

export const MapLocation = ({
  latitudeClinica,
  longitudeClinica,
  nomeClinica
}) => {
  const clinica = [{ latitude: latitudeClinica, longitude: longitudeClinica, clinica: nomeClinica }]
  
  const [initialPosition, setInitialPosition] = useState(null); //Hook par armezar a posição atual do dispositivo
  const [endPosition, setEndPosition] = useState({ //Hook para armazenar a posição da clinica
    latitude: clinica[0].latitude,
    longitude: clinica[0].longitude
  }) 
  const mapReference = useRef(null);
  
  const [mapRendered, setMapRendered] = useState(false);
<<<<<<< HEAD
=======
  
  console.log(clinica)
>>>>>>> c7757d143544aa6b990aac96ba697f333385b034

  // Função para capturar a localização atual.
  async function CurrentLocation() {
    const { granted } = await requestForegroundPermissionsAsync(); // Solicita ao usuário que conceda permissões de localização enquanto o aplicativo estiver em primeiro plano.
    if (granted) { // Se a permissão for concedida faza
      const captureLocation = await getCurrentPositionAsync(); // Obtem a latitude e longitude do dispositivo
      setInitialPosition(captureLocation);// Seta a posição inicial com a localização obtida
      //console.log('posicao inicial : ',initialPosition)
    }
  }

  async function reloadPreviewMap() {
    if (mapReference.current && initialPosition) {
      await mapReference.current.fitToCoordinates(
        [
          {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude
          }
        ,
        {
          latitude: endPosition.latitude,
          longitude: endPosition.longitude
        }
      ], {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },     
          animated: true,
        }
      )
    }
  }

  useEffect(() => {
    CurrentLocation();
    //Monitora a posição em tempo real
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      }, async (response) => {
        await setInitialPosition(response)

        // mapReference.current?.animateCamera({
        //   pitch: 60,
        //   center: response.coords
        // })
      }
    )
  }, [1000])

  useEffect(() => {
    reloadPreviewMap()
  }, [mapRendered])

  return (
    <View style={styles.container}>
      {
        initialPosition !== null ?
          (
            <MapView
              ref={mapReference}
              initialRegion={{
                latitude: initialPosition.coords.latitude,
                longitude: initialPosition.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}

              provider={PROVIDER_GOOGLE}
              customMapStyle={grayMapStyle}

              style={{
                height: '100%',
                width: '100%',
              }}
              onLayout={()=> {setMapRendered(true)}}
            >
              <Marker
                coordinate={{
                  latitude: initialPosition.coords.latitude,
                  longitude: initialPosition.coords.longitude,
                }}
                title="Você está aqui"
                description="Posição inicial"
                pinColor="green"
              />
              <MapViewDirections
                origin={initialPosition.coords}
                destination={{
                  latitude: clinica[0].latitude,
                  longitude: clinica[0].longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                strokeWidth={5}
                strokeColor="#496BBA"
                apikey={mapskey}
              />

              <Marker
                coordinate={{
                  latitude: clinica[0].latitude,
                  longitude: clinica[0].longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                title={clinica[0].clinica}
                pinColor="blue"
              />


            </MapView>) : (

            <>
              <Text>Localizacão nao encontrado</Text>
              <ActivityIndicator />
            </>
          )
      }

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: "50%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
];