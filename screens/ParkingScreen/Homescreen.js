import React, { useEffect, useState } from "react";
import { addParking, removeParking } from "../../reducers/parking";
import { useDispatch, useSelector } from "react-redux";
import focus from "../../assets/focus.png";
import parkPin from "../../assets/parking.png";
import { getDistance } from "geolib";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Homescreen({ navigation }) {
  //  REDUCER & dispatch

  const dispatch = useDispatch();
  const parkReducer = useSelector((state) => state.parking.value);

  // STATE LOCATION
  const [currentPosition, setCurrentPosition] = useState(null);
  const [region, setRegion] = useState({
    latitude: 48.51,
    longitude: 2.34,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  // STATE POSITION & searchedplace

  const [showSearch, setShowSearch] = useState(true);
  const [positionGranted, setPositionGranted] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState(null);

  // STATE SEARCH (input)

  const [search, setSearch] = useState(null);

  // STATE PARKINGS
  const [distance, setDistance] = useState(15);
  const [parisParking, setParking] = useState([]);

  // GET PARKING

  const parking = async () => {
    const parkingsData = await axios.get(
      "https://data.opendatasoft.com/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes@saemes"
    );
    setParking(parkingsData.data.records);
  };

  // COMPONENT INIT

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setPositionGranted(true);
          setCurrentPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.421,
          });
        });
      } else if (status === "denied") {
        setCurrentPosition(region);
      }
    })();
    parking();
  }, []);

  // DATA FILTERED BY DISTANCE PARKINGS

  let parisparking;

  const dispatchParkings = () => {
    if (searchedPlace) {
      parisparking = parisParking.map((el, i) => {
        const distanceBetweenParkAndMe =
          getDistance(
            {
              latitude: el.geometry.coordinates[1],
              longitude: el.geometry.coordinates[0],
            },
            {
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }
          ) / 1000;
        const parkingFound = {
          id: el.recordid,
          name: el.fields.nom_parking,
          freeplace: el.fields.counterfreeplaces,
          horaire:
            el.fields.horaires_d_acces_au_public_pour_les_usagers_non_abonnes,
          distance: distanceBetweenParkAndMe,
          latitude: el.geometry.coordinates[1],
          longitude: el.geometry.coordinates[0],
        };
        dispatch(addParking(parkingFound));
      });
    }
  };

  // PARKING PIN ON MAP

  let parkingPin;
  let pinStyle;
  if (searchedPlace) {
    parkingPin = parisParking.map((el, i) => {
      if (el.fields.counterfreeplaces > 40) {
        pinStyle = { tintColor: "green" };
      } else if (el.fields.counterfreeplaces > 0) {
        pinStyle = { tintColor: "orange" };
      } else {
        pinStyle = { tintColor: "red" };
      }
      const distanceBetween =
        getDistance(
          {
            latitude: el.geometry.coordinates[1],
            longitude: el.geometry.coordinates[0],
          },
          {
            latitude: searchedPlace.latitude,
            longitude: searchedPlace.longitude,
          }
        ) / 1000;
      return (
        distanceBetween < 50 && (
          <Marker
            key={i}
            coordinate={{
              longitude: el.geometry.coordinates[0],
              latitude: el.geometry.coordinates[1],
            }}
            title={String(el.fields.counterfreeplaces)}
          >
            <Image source={parkPin} style={[styles.image, pinStyle]} />
          </Marker>
        )
      );
    });
  }
  // LAUNCH RESEARCH

  const handleSearch = () => {
    axios
      .get(`https://api-adresse.data.gouv.fr/search/?q=${search}`)
      .then((response) => {
        if (response.data.features.length === 0) {
          return;
        }

        const searchedPlaceData = response.data.features[0];

        setSearchedPlace({
          latitude: searchedPlaceData.geometry.coordinates[1],
          longitude: searchedPlaceData.geometry.coordinates[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setShowSearch(false);
        Keyboard.dismiss();
      });
  };

  // BUTTON "VOIR"

  const handleSubmit = () => {
    dispatchParkings();
    navigation.navigate("ParkingListScreen");
  };

  // BUTTON RESEARCH INPUT

  let searchButton;
  if (search && showSearch) {
    searchButton = (
      <TouchableOpacity
        style={styles.inputSearchBtn}
        onPress={() => {
          handleSearch();
        }}
      >
        <FontAwesome name="search" size={20} color="#444" />
        <Text style={styles.sliderBtnText}>Voir les résultats</Text>
      </TouchableOpacity>
    );
  }

  const handleSearchButton = () => {
    setShowSearch(true);
    setSearch(null);
    setSearchedPlace(null);
    dispatch(removeParking());
  };
  return (
    <View style={styles.container}>
      {/* MAP */}

      <MapView
        onPress={() => {
          Keyboard.dismiss();
        }}
        animatedToRegion={{ region: region, duration: 3000 }}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={positionGranted}
        initialRegion={currentPosition ? currentPosition : region}
        region={searchedPlace ? searchedPlace : currentPosition}
      >
        {searchedPlace && (
          <>
            <Marker
              coordinate={{
                latitude: searchedPlace.latitude,
                longitude: searchedPlace.longitude,
              }}
            >
              <Image
                source={focus}
                style={{ tintColor: "#2E3740", width: 20, height: 20 }}
              />
            </Marker>
          </>
        )}
        {searchedPlace && parkingPin}
      </MapView>

      {/* INPUT CONTAINER  */}

      <View style={styles.inputGlobalContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            type="text"
            style={styles.input}
            placeholder="Chercher un parking"
            value={search}
            onChangeText={(value) => setSearch(value)}
          />
          {!showSearch && (
            <FontAwesome
              name="times"
              size={25}
              color="#555"
              style={styles.filterBtn}
              onPress={() => {
                handleSearchButton();
              }}
            />
          )}
        </View>

        {/* BUTTON SEARCH INPUT*/}

        <View style={styles.inputSearchBtnContainer}>{searchButton}</View>
      </View>

      {/* BUTTON PARKING LIST  */}

      <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
        <Text style={{ fontWeight: "bold", color: "#2E3740" }}>
          Liste des parkings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },

  // INPUT

  inputGlobalContainer: {
    position: "absolute",
    top: "10%",
    right: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "5%",
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: "white",
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    padding: 10,
    borderRadius: 7,
    fontSize: 16,
  },

  // BUTTON SEARCH INPUT

  inputSearchBtnContainer: {
    justifyContent: "center",
    marginTop: 10,
    height: 30,
  },
  inputSearchBtn: {
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FC727B",
  },

  // DISTANCE FILTER

  distanceFilter: {
    position: "absolute",
    top: "15%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    height: "19%",
    width: "80%",
    backgroundColor: "white",
  },
  distanceText: {
    fontSize: 17,
  },

  //FILTER SLIDER

  sliderContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  slider: {
    width: "90%",
  },

  // BUTTON SLIDER

  sliderBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ddd",
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 15,
  },
  sliderBtnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#2E3740",
    marginLeft: 10,
  },

  // BUTTON "VOIR" LIST

  btn: {
    position: "absolute",
    bottom: "3%",
    right: "5%",
    height: "4%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FC727B",
  },
  searchIcon: {
    height: "100%",
    width: "4%",
  },
  // ICON MAP

  image: {
    width: 35,
    height: 35,
  },
  imageParking: {
    tintColor: "green",
  },
});
