import FontAwesome from "react-native-vector-icons/FontAwesome";
import ParkingSelected from "../ParkingScreen/ParkingSelected";
import FavParkCard from "../ParkingScreen/favParkCard";
import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FavPark(props) {
  // REDUCER
  const userFav = useSelector((state) => state.user.value.favorisPark);

  // STATE
  const [count, setCount] = useState(0);
  const [userFavoris, setUserFavoris] = useState([]);
  const [parkingClicked, setParkingClicked] = useState(null);
  const [showClickedParking, setShowClickedParking] = useState(false);

  // FUNCTION

  // GET USER FAVPARK

  const parking = () => {
    axios
      .get(
        "https://data.opendatasoft.com/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes@saemes"
      )
      .then((response) => {
        let favPark = [];
        const fav = response.data.records.forEach((el) => {
          if (userFav.includes(el.recordid)) {
            favPark.push(el);
          }
        });
        setUserFavoris(favPark);
      });
  };

  // COMPONENT INIT

  useEffect(() => {
    parking();
  }, [count]);

  const handleFav = () => {
    props.changeFavScreen(false);
  };

  const test = userFavoris.map((el, i) => {
    return (
      <FavParkCard
        name={el.fields.nom_parking}
        freeplace={el.fields.counterfreeplaces}
        horaire={
          el.fieldshoraires_d_acces_au_public_pour_les_usagers_non_abonnes
        }
        latitude={el.fields.geo[0]}
        longitude={el.fields.geo[1]}
        id={el.recordid}
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
            style={{ color: "white" }}
            onPress={() => handleFav()}
          />
        </View>
        <Text style={styles.title}>Mes parkings</Text>
        <View style={styles.icon}>
          <FontAwesome
            name="refresh"
            size={30}
            style={{ color: "white" }}
            onPress={() => setCount(count + 1)}
          />
        </View>
      </View>
      <View style={styles.ParkingsContainer}>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2E3740",
            paddingTop: 30,
          }}
        >
          {test}
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
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },

  ParkingsContainer: {
    width: "90%",
    height: "80%",
    justifycontent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
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
