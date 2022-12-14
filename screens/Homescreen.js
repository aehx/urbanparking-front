import React, { useEffect, useState } from "react";
import dot from "../assets/dot.png";
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
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";

export default function Homescreen({ navigation }) {
  // STATE LOCATION
  const [showDistance, setShowDistance] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [region, setRegion] = useState({
    latitude: 48.51,
    longitude: 2.34,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  // STATE POSITION & searchedplace

  const [positionGranted, setPositionGranted] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState(null);

  // STATE DISTANCE

  const [range, setRange] = useState(0);

  // STATE SEARCH

  const [search, setSearch] = useState(null);

  // STATE PARKINGS

  const [parisParking, setParking] = useState([]);

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

  // DATA PARKINGS

  const parkingsFound = parisParking.map((el, i) => {
    console.log("**************", el.geometry);
    return (
      <Marker
        key={i}
        coordinate={{
          longitude: el.geometry.coordinates[0],
          latitude: el.geometry.coordinates[1],
        }}
      >
        {/* <Image source={dot} style={styles.image} /> */}
      </Marker>
    );
  });
  // console.log("!!!!!!!!!!!!!!!!!!!", parisParking);
  // POPUP DISTANCE

  const handleDistance = () => {
    setShowDistance(!showDistance);
    setRange(0);
  };

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
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        });
        setSearch(null);
        Keyboard.dismiss();
      });
  };

  // BUTTON "VOIR"

  const handleSubmit = () => {
    navigation.navigate("Profil");
  };

  // BUTTON RESEARCH INPUT

  let test;
  if (search) {
    test = (
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
  return (
    <View style={styles.container}>
      {/* MAP */}

      <MapView
        onPress={() => Keyboard.dismiss()}
        mapType="hybrid"
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
              <Image source={dot} style={styles.image} />
            </Marker>
            <Circle
              center={{
                latitude: searchedPlace.latitude,
                longitude: searchedPlace.longitude,
              }}
              radius={Math.floor(range * 1000)}
              strokeWidth={3}
              strokeColor={"#fc727bb3"}
              fillColor={"#2e37407b"}
            />
          </>
        )}
        {searchedPlace && parkingsFound}
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
          <FontAwesome
            name="sliders"
            size={25}
            color="#555"
            style={styles.filterBtn}
            onPress={() => {
              handleDistance();
            }}
          />
        </View>

        {/* BUTTON SEARCH INPUT*/}

        <View style={styles.inputSearchBtnContainer}>{test}</View>
      </View>

      {/* POPUP DISTANCE */}

      {showDistance && (
        <View style={styles.distanceFilter}>
          <Text style={styles.distanceText}>
            Distance : {Math.floor(range * 20)} km
          </Text>
          <View style={styles.sliderContainer}>
            <Slider
              onValueChange={(value) => setRange(value)}
              minimumValue={0}
              maximumValue={1}
              style={styles.slider}
            />
          </View>
          <TouchableOpacity
            style={styles.sliderBtn}
            onPress={() => handleDistance()}
          >
            <Text style={styles.sliderBtnText}>Voir les résultats</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BUTTON PARKING LIST  */}

      <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
        <Text>Voir</Text>
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
    width: "20%",
    height: "4%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#ddd",
  },
  searchIcon: {
    height: "100%",
    width: "4%",
  },
  // ICON MAP
  image: {
    width: 20,
    height: 20,
  },
});
