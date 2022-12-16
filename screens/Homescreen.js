import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapView, { Marker } from "react-native-maps";
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
  const [positionGranted, setPositionGranted] = useState(false);

  // STATE DISTANCE

  const [range, setRange] = useState(0);

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
  }, []);

  const handleDistance = () => {
    setShowDistance(!showDistance);
    setRange(0);
  };

  // BUTTON "VOIR"

  const handleSubmit = () => {
    navigation.navigate("Profil");
  };

  return (
    <View style={styles.container}>
      <MapView
        mapType="hybrid"
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={positionGranted}
        region={currentPosition ? currentPosition : region}
      ></MapView>

      {/* INPUT CONTAINER  */}

      <View style={styles.inputGlobalContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome name="search" size={25} color="#444" />
          <TextInput
            type="text"
            style={styles.input}
            placeholder="Chercher un parking"
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
      </View>

      {/* DISTANCE POPUP */}

      {showDistance && (
        <View style={styles.distanceFilter}>
          <Text style={styles.distanceText}>
            Distance : {Math.floor(range * 100)} km
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
    top: "7%",
    right: 0,
    flexDirection: "row",
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

  // BUTTON

  sliderBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 15,
  },
  sliderBtnText: {
    textAlign: "center",
    fontWeight: "bold",
  },

  // BUTTON LIST

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
});
