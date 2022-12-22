import React, { useEffect, useState } from "react";
import ParkingSelected from "../ParkingScreen/ParkingSelected";
import { addParking, removeParking } from "../../reducers/parking";
import { useDispatch, useSelector } from "react-redux";
import parkPin from "../../assets/placeholder.png";
import { getDistance } from "geolib";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Homescreen({ navigation }) {
  //  dispatch

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.value.theme);

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
  const [showSelected, setShowSelected] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState(null);

  // STATE SEARCH (input)
  const [search, setSearch] = useState(null);

  // STATE PARKINGS
  const [parkingClicked, setParkingClicked] = useState(null);
  const [parisParking, setParking] = useState([]);

  // THEME

  let text;
  let bg;
  let bgCard;
  let border;
  let bgBtn;
  let icon;
  if (theme) {
    text = { color: "#333" };
    bgBtn = { backgroundColor: "#87BBDD" };
    bgCard = { backgroundColor: "#DAE9F2" };
    border = { borderColor: "#87BBDD" };
    bg = { borderColor: "#fff" };
    icon = { tintColor: "#87BBDD" };
  }

  // GET PARKING

  const parking = async () => {
    const parkingsData = await axios.get(
      "https://data.opendatasoft.com/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes@saemes"
    );
    const orleans = await axios.get(
      "https://data.opendatasoft.com/api/records/1.0/search/?dataset=mobilite-places-disponibles-parkings-en-temps-reel@orleansmetropole"
    );
    const filteredParis = parkingsData.data.records.filter(
      (el) => el.geometry !== undefined
    );
    const filteredOrleans = orleans.data.records.filter(
      (el) => el.geometry !== undefined
    );
    setParking([...filteredOrleans, ...filteredParis]);
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
  }, []);

  // PARKINGS FILTERED BY DISTANCE

  let parkingResults;
  const dispatchParkings = () => {
    if (searchedPlace) {
      parkingResults = parisParking.map((el, i) => {
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
        const parkingFound = {
          id: el.recordid,
          name: el.fields.nom_parking || el.fields.name,
          freeplace: el.fields.counterfreeplaces || el.fields.dispo,
          horaire:
            el.fields.horaires_d_acces_au_public_pour_les_usagers_non_abonnes ||
            "24h/24, 7j/7",
          distance: distanceBetweenParkAndMe,
          latitude: el.geometry.coordinates[1],
          longitude: el.geometry.coordinates[0],
        };
        {
          distanceBetween < 60 && dispatch(addParking(parkingFound));
        }
      });
    }
  };

  // PARKING PIN ON MAP

  let parkingPin;
  let pinStyle;
  if (searchedPlace) {
    parkingPin = parisParking.map((el, i) => {
      if (el.fields.counterfreeplaces > 40 || el.fields.dispo > 40) {
        pinStyle = { tintColor: "green" };
      } else if (el.fields.counterfreeplaces > 0 || el.fields.dispo > 0) {
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
        searchedPlace &&
        distanceBetween < 60 && (
          <Marker
            key={i}
            coordinate={{
              longitude: el.geometry.coordinates[0],
              latitude: el.geometry.coordinates[1],
            }}
            onPress={() => {
              setSearchedPlace({
                latitude: el.geometry.coordinates[1],
                longitude: el.geometry.coordinates[0],
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }),
                setParkingClicked(el);
            }}
          >
            <Image source={parkPin} style={[styles.image, pinStyle]} />
          </Marker>
        )
      );
    });
  }

  // POPUP PARKING

  console.log(parkingClicked);
  let popupParkingClicked;
  if (parkingClicked) {
    // MAP REDIRECTION
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${searchedPlace.latitude},${searchedPlace.longitude}`;
    const label = `${
      parkingClicked.fields.nom_parking || parkingClicked.fields.name
    }`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    // PIN STYLE

    if (
      parkingClicked.fields.counterfreeplaces > 40 ||
      parkingClicked.fields.dispo > 40
    ) {
      pinStyle = { backgroundColor: "green" };
    } else if (
      parkingClicked.fields.counterfreeplaces > 0 ||
      parkingClicked.fields.dispo > 0
    ) {
      pinStyle = { backgroundColor: "orange" };
    } else {
      pinStyle = { backgroundColor: "red" };
    }

    // JSX

    popupParkingClicked = (
      <View style={[styles.popupParking, bgCard, border]}>
        <View style={styles.imagePopUpContainer}>
          <Image
            source={require("../../assets/park.png")}
            style={[styles.imagePopup, icon]}
            onPress={() => {
              setShowSelected(true);
            }}
          />
        </View>
        <View
          style={{
            padding: 10,
            width: "70%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.popupText, text]}>
            {parkingClicked.fields.nom_parking || parkingClicked.fields.name}
          </Text>
          <TouchableOpacity
            style={[styles.btnVoir, bgCard, border]}
            onPress={() => setShowSelected(true)}
          >
            <Text style={[styles.popupText, text]}>voir</Text>
          </TouchableOpacity>
          <Text style={[styles.popupText, text]}>
            places : {parkingClicked.fields.counterfreeplaces}
            {parkingClicked.fields.dispo}
          </Text>
        </View>
        <View style={[styles.pinFreeplaces, pinStyle]}></View>
        <TouchableOpacity
          style={[styles.btnGo, bgCard, border]}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={[styles.popupText, text]}>Go</Text>
        </TouchableOpacity>
      </View>
    );
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
        style={[styles.inputSearchBtn, bgBtn]}
        onPress={() => {
          handleSearch();
          parking();
        }}
      >
        <FontAwesome name="search" size={20} color="#444" />
        <Text style={styles.sliderBtnText}>Voir les résultats</Text>
      </TouchableOpacity>
    );
  }

  // PRESS ON "TIMES" ICON

  const handleSearchButton = () => {
    setShowSearch(true);
    setSearch(null);
    setSearchedPlace(null);
    dispatch(removeParking());
    setParkingClicked(null);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
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

      {/* POPUP PARKING */}

      {parkingClicked && popupParkingClicked}
      {showSelected && (
        <SafeAreaView
          style={[
            styles.container,
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#2E3740",
              zIndex: 1,
            },
          ]}
        >
          <ParkingSelected
            freeplace={
              parkingClicked.fields.counterfreeplaces ||
              parkingClicked.fields.dispo
            }
            name={
              parkingClicked.fields.nom_parking || parkingClicked.fields.name
            }
            latitude={parkingClicked.geometry.coordinates[1]}
            longitude={parkingClicked.geometry.coordinates[0]}
            id={parkingClicked.recordid}
            changeState={(state) => setShowSelected(state)}
          />
        </SafeAreaView>
      )}
      {/* BUTTON PARKING LIST  */}

      <TouchableOpacity
        style={[styles.btn, bgBtn]}
        onPress={() => handleSubmit()}
      >
        <Text style={{ fontWeight: "bold", color: "#2E3740" }}>
          Liste des parkings
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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

  // POPUP

  popupParking: {
    flexDirection: "row",
    padding: 10,
    width: "90%",
    height: "20%",
    borderRadius: 15,
    position: "absolute",
    bottom: "10%",
    left: "5%",
    borderColor: "#FC727B",
    borderWidth: 3,
    backgroundColor: "#2E3740",
  },
  popupText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  imagePopUpContainer: {
    width: "30%",
    marginRight: 5,
  },
  imagePopup: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
    tintColor: "#FC727B",
  },
  pinFreeplaces: {
    position: "absolute",
    top: "40%",
    right: "5%",
    height: 15,
    width: 15,
    borderRadius: 50,
  },
  btnGo: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: "50%",
    padding: 10,
    borderColor: "#FC727B",
    borderWidth: 3,
    backgroundColor: "#2E3740",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnVoir: {
    borderRadius: "50%",
    padding: 5,
    width: "40%",
    borderColor: "#FC727B",
    borderWidth: 3,
    backgroundColor: "#2E3740",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
