import ParkingCard from "./components/ParkingCard";
import ParkingSelected from "../../components/parking/ParkingSelected";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ParkingListScreen({ navigation }) {
  const { parkingList } = useSelector((state) => state.parking.value);
  const theme = useSelector((state) => state.user.value.theme);

  const [parkingClicked, setParkingClicked] = useState(null);
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

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };

  const parkingNotFiltered = parkingList.map((el, i) => {
    return (
      <ParkingCard
        {...el}
        key={i}
        displayCard={(state) => setParkingClicked(state)}
        displaySelectedCard={(state) => setShowClickedParking(state)}
      />
    );
  });

  const parkingFilteredByPlace = [...parkingList]
    .sort((a, b) => {
      return a.distanceBetweenParkAndMe - b.distanceBetweenParkAndMe;
    })
    .map((el, i) => {
      return (
        <ParkingCard
          {...el}
          key={i}
          displayCard={(state) => setParkingClicked(state)}
          displaySelectedCard={(state) => setShowClickedParking(state)}
        />
      );
    });

  const parkingFilteredByDispo = parkingList
    .filter((el) => {
      return el.freeplaces > 0;
    })
    .sort((a, b) => {
      return b.freeplaces - a.freeplaces;
    })
    .map((el, i) => {
      return (
        <ParkingCard
          {...el}
          key={i}
          displayCard={(state) => setParkingClicked(state)}
          displaySelectedCard={(state) => setShowClickedParking(state)}
        />
      );
    });

  return (
    <SafeAreaView style={[styles.globalContainer]}>
      <View style={[styles.container, bgCard]}>
        {showClickedParking && (
          <View style={styles.popupContainer}>
            <ParkingSelected
              {...parkingClicked}
              changeState={(state) => setShowClickedParking(state)}
            />
          </View>
        )}

        <View style={styles.header}>
          <View style={styles.icon}>
            <FontAwesome
              name="arrow-left"
              size={30}
              style={[{ color: "white" }, text]}
              onPress={() =>
                navigation.navigate("TabNavigator", { screen: "HomeScreen" })
              }
            />
          </View>
          <Text style={[styles.title, text]}>Liste de parkings</Text>
        </View>
        <Text
          style={[
            styles.title,
            {
              fontSize: 20,
              paddingRight: 0,
            },
            text,
          ]}
        >
          Filtre : {filterTitle}
        </Text>

        <View style={styles.filterBtnContainer}>
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => {
              setFilteredByPlaces(!filteredByPlaces);
              setFilteredByDispo(false);
            }}
          >
            <Text style={styles.btnText}>Proche</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => {
              setFilteredByDispo(!filteredByDispo);
              setFilteredByPlaces(false);
            }}
          >
            <Text style={styles.btnText}>Dispo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ParkingsContainer}>
          <ScrollView
            style={[
              {
                width: "100%",
                height: "100%",
                backgroundColor: "#2E3740",
                paddingTop: 20,
              },
              bgCard,
            ]}
          >
            {/* THE DISPLAY DEPENDS ON THE STATE */}

            {!filteredByDispo && !filteredByPlaces && parkingNotFiltered}
            {filteredByDispo && parkingFilteredByDispo}
            {filteredByPlaces && parkingFilteredByPlace}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    position: "absolute",
    bottom: "-10%",
    left: 0,
    width: "100%",
    height: "110%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2E3740",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  popupContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
    width: "100%",
  },
  icon: {
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
    paddingRight: "10%",
    color: "#FFF",
  },
  ParkingsContainer: {
    width: "90%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 65,
  },
  filterBtnContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
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
