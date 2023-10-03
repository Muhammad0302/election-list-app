import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, PermissionsAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { TextInput } from 'react-native-paper';
import MapboxGL from '@rnmapbox/maps';
import { convertLength, lineString as makeLineString } from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { getAllSensors } from '../../services/sensor';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
const directionsClient = MapboxDirectionsFactory({
  accessToken:
    'pk.eyJ1IjoiZmFyaGFuYTc2IiwiYSI6ImNsYnlxNWU2djBzZ3YzeG81YXhtMHRiYmcifQ.2PX7oB2ag46-Cx6ioMa3yw',
});


MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZmFyaGFuYTc2IiwiYSI6ImNsYnlxNWU2djBzZ3YzeG81YXhtMHRiYmcifQ.2PX7oB2ag46-Cx6ioMa3yw'
);

interface MapComponentProps {
  region: number[];
  setRegion: React.Dispatch<React.SetStateAction<number[]>>;
}

const MapComponent: React.FC<MapComponentProps> = ({ region, setRegion }) => {
  const [allSensors, setAllSensors] = useState([]);
  const [load, setLoad] = useState(false);
  const [destinationPoint, setDestinationPoint] = useState([0, 0]);
  const [cordinatesPoint, setCordinatesPoint] = useState([0, 0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [DropDownHandler, setDropDownHandler] = useState(false);
  const [result, setResult] = useState<Array<any>>([]);
  const [city, setCity] = useState();
  const [route, setRoute] = useState(null);



  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoiZmFyaGFuYTc2IiwiYSI6ImNsYnlxNWU2djBzZ3YzeG81YXhtMHRiYmcifQ.2PX7oB2ag46-Cx6ioMa3yw';
  const startDestinationPoints = [

    {
      name: 'end',
      point: destinationPoint,
    },
    {
      name: 'rider',
      point: region,
    },
  ];

  const fetchCurrentLocation = async () => {
    const isGranted = await requestLocationPermission();
    if (isGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('The latitude and longitude is:', latitude, longitude);
          setRegion([longitude, latitude]);
          setCordinatesPoint([longitude, latitude])
          setLoad(false)

        },
        (error) => {
          setLoad(false)
          console.log('Error getting current location:', error)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  };
  const getAllSensorsData = async () => {
    const res = await getAllSensors();
    // console.log('The response of all sensor is:', res.data);
    setAllSensors(res.data);
  };
  useEffect(() => {


    fetchCurrentLocation();
    getAllSensorsData();
  }, []);

  const requestLocationPermission = async () => {
    setLoad(true)
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');

          return true;
        } else {
          console.log('You cannot use Geolocation');
          setLoad(false)

          return false;
        }
      } catch (err) {
        setLoad(false)

        return false;
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always').then((res) => {
        console.log('Permission FOR IOS', res);
        // getCurrentLocationDriver();
        setLoad(false)

        return true;
      });
    }
  };
  const fetchRoute = async () => {
    const reqOptions = {
      waypoints: [
        { coordinates: region },
        { coordinates: destinationPoint },
      ],
      profile: 'driving-traffic',
      geometries: 'geojson',
    };


    const res = await directionsClient.getDirections(reqOptions).send();

    let newRoute = makeLineString(res.body.routes[0].geometry.coordinates);


    console.log('newroutes', newRoute)
    setRoute(newRoute);


    const res2 = await directionsClient.getDirections(reqOptions).send();

  };
  useEffect(() => {
    console.log('use effect checking......');
    fetchRoute();
  }, [destinationPoint, region]);
  const renderAnnotations = () => {
    return startDestinationPoints.map((point, index) => (
      <MapboxGL.PointAnnotation
        key={`${index}-PointAnnotation`}
        id={`${index}-PointAnnotation`}
        coordinate={point.point}>

        {point.name === 'start' ? (
          <Icon name="motorcycle" size={30} color="#900" />
        ) : (
          <Icon name="map-marker" size={30} color="#900" />
        )}
      </MapboxGL.PointAnnotation>
    ));
  };

  const searchLocation = (query: any) => {
    let qry = query.trim();
    return new Promise((resolve, reject) => {
      fetch(
        // `https://api.mapbox.com/geocoding/v5/mapbox.places/${qry}.json?country=pk&access_token=${MAPBOX_ACCESS_TOKEN}`,
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?place_type=[address,poi,neighborhood,place]&access_token=${MAPBOX_ACCESS_TOKEN}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log(data, 'data of searchLocation');
          const address: any = [];
          const result = data;
          result.features.map((feature: any) => {
            address.push({
              id: feature.id,
              place_name: feature.place_name,
              center: feature.center,
            });
          });

          resolve(address);
        })
        .catch(err => reject(err));
    });
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      let x = setTimeout(() => {
        searchLocation(searchQuery).then((data: any) => {
          setDropDownHandler(true);
          setResult([...data]);
        });
      }, 200);
    } else {
      setDropDownHandler(false);

    }
  }, [searchQuery]);


  return (
    <View style={styles.page}>
      {load ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <ActivityIndicator color={'white'} />
        </View>
      ) : (

        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(95), alignSelf: 'center', marginTop: hp(1), justifyContent: 'center', alignItems: 'center' }}>
            <Searchbar
              placeholder="Search for place's"

              value={searchQuery ? searchQuery : selectedAddress}
              onChangeText={setSearchQuery}
              icon={() => <Icon name="search" size={15} color="#000" />}
              style={{
                height: 55,
                borderRadius: 25,
                borderWidth: 1,
                alignItems: 'center', alignContent: 'center'
              }}
            />

          </View>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              top: heightPercentageToDP(9),
              borderRadius: 8,
              // left: 35,
              // marginLeft: widthPercentageToDP(9),
              zIndex: 15,
              width: widthPercentageToDP(90),
              backgroundColor: '#DFA72C',
              alignSelf: 'center'
            }}>
            {DropDownHandler &&
              result.map((addressItem, index) => (
                <View
                  key={index}
                  style={{
                    marginVertical: 1,
                    // backgroundColor: '#000',
                    backgroundColor: "white"
                    ,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(addressItem, 'On Press in DropDown');
                      setDropDownHandler(false);
                      setSearchQuery('');
                      setSelectedAddress(addressItem.place_name)
                      setDestinationPoint(addressItem.center);
                      setCordinatesPoint(addressItem.center);
                      setDropDownHandler(false);

                    }}
                    activeOpacity={0.9}
                    style={{
                      backgroundColor: '#fff',
                      height: 44,
                      borderRadius: 10,
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        width: '100%',
                        fontSize: 16,
                        color: 'black',
                      }}>
                      {addressItem.place_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          <MapboxGL.MapView style={{ flex: 1, marginTop: -77, zIndex: -1 }}
          >

            <View>
              <MapboxGL.Camera
                zoomLevel={7}
                animationMode={'flyTo'}
                animationDuration={2000}
                centerCoordinate={cordinatesPoint}
              />

              {renderAnnotations()}
              {route && (
                <MapboxGL.ShapeSource id="shapeSource" shape={route}>
                  <MapboxGL.LineLayer
                    id="lineLayer"
                    style={{
                      lineWidth: 2,
                      lineJoin: 'bevel',
                      lineColor: '#000',
                    }}
                  />
                </MapboxGL.ShapeSource>
              )}
              {/* Render sensors destinations */}
              {allSensors?.map((sensor, index) => (
                <MapboxGL.PointAnnotation
                  key={`pointAnnotation-${index}`}
                  id={`pointAnnotation-${index}`}
                  coordinate={sensor?.location?.coordinates}
                ></MapboxGL.PointAnnotation>
              ))}
            </View>
          </MapboxGL.MapView>
        </View>
      )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: "3%",
    backgroundColor: '#1b1d1f',
    // height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default MapComponent;
