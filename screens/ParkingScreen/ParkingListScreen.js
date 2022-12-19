import ParkingListCard from "./parkingListCard";
import ParkingSelected from "./ParkingSelected";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";

// PARENT OF PARKINGSELECTED/ PARKINGLISTCARD

export default function Parkingscreen({ navigation }) {
  // REDUCER

  const parkReducer = useSelector((state) => state.parking.value.parkingList);
  const [parkingClicked, setParkingClicked] = useState(null);

  // STATE

  const [showClickedParking, setShowClickedParking] = useState(false);
  const [filteredByDispo, setFilteredByDispo] = useState(false);
  const [filteredByPlaces, setFilteredByPlaces] = useState(false);

  // FILTER TITLE

  let filterTitle;
  if (filteredByDispo) {
    filterTitle = "Parkings disponibles";
  }
  if (filteredByPlaces) {
    filterTitle = "Les plus proches";
  }
  if (!filteredByPlaces && !filteredByDispo) {
    filterTitle = "Aucun";
  }

  // PARKING

  const parking = parkReducer.map((el, i) => {
    return (
      <ParkingListCard
        {...el}
        key={i}
        displayCard={(state) => setParkingClicked(state)}
        displaySelectedCard={(state) => setShowClickedParking(state)}
      />
    );
  });

  // PARKING BY PLACES

  const parkingFilteredByPlace = [...parkReducer]
    .sort((a, b) => {
      return a.distance - b.distance;
    })
    .map((el, i) => {
      return (
        <ParkingListCard
          {...el}
          key={i}
          displayCard={(state) => setParkingClicked(state)}
          displaySelectedCard={(state) => setShowClickedParking(state)}
        />
      );
    });

  // PARKING DISPO

  const parkingFilteredByDispo = parkReducer
    .filter((el, i) => {
      return el.freeplace > 0;
    })
    .sort((a, b) => {
      return b.freeplace - a.freeplace;
    })
    .map((el, i) => {
      return (
        <ParkingListCard
          {...el}
          key={i}
          displayCard={(state) => setParkingClicked(state)}
          displaySelectedCard={(state) => setShowClickedParking(state)}
        />
      );
    });

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.globalContainer}
    >
      {/* POP UP OF THIS PARKING */}

      {showClickedParking && (
        <View style={styles.popupContainer}>
          <ParkingSelected
            {...parkingClicked}
            changeState={(state) => setShowClickedParking(state)}
          />
        </View>
      )}

      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={{ color: "white" }}
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Homescreen" })
            }
          />
        </View>
        <Text style={styles.title}>Liste de parkings</Text>
      </View>
      <Text
        style={[
          styles.title,
          {
            fontSize: 20,
            paddingRight: 0,
          },
        ]}
      >
        Filtre : {filterTitle}
      </Text>

      {/* BUTTON */}

      <View style={styles.filterBtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setFilteredByPlaces(!filteredByPlaces);
            setFilteredByDispo(false);
          }}
        >
          <Text style={styles.btnText}>Proche</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setFilteredByDispo(!filteredByDispo);
            setFilteredByPlaces(false);
          }}
        >
          <Text style={styles.btnText}>Dispo</Text>
        </TouchableOpacity>
      </View>

      {/* PARKING LIST CONTAINER */}

      <View style={styles.ParkingsContainer}>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2E3740",
            paddingTop: 30,
          }}
        >
          {/* THE DISPLAY DEPENDS ON THE STATE */}

          {!filteredByDispo && !filteredByPlaces && parking}
          {filteredByDispo && parkingFilteredByDispo}
          {filteredByPlaces && parkingFilteredByPlace}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingTop: "20%",
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },
  popupContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
  },

  //   TITLE

  header: {
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
    width: "100%",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: "100%",
    paddingLeft: 20,
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: "15%",
    color: "#FFF",
  },

  // PARKING LIST CONTAINER

  ParkingsContainer: {
    width: "90%",
    height: "80%",
    justifycontent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  // BTN CONTAINER

  filterBtnContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  btn: {
    marginRight: 10,
    flexDirection: "row",
    backgroundColor: "#FC727B",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#2E3740",
  },
});
