import FontAwesome from "react-native-vector-icons/FontAwesome";
import ParkingSelected from "../ParkingScreen/ParkingSelected";
import FavParkCard from "../ParkingScreen/favParkCard";
import axios from "axios";

import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function FavPark(props) {
  // REDUCER
  const userFavoritesParkings = useSelector(
    (state) => state.user.value.favorisPark
  );
  const theme = useSelector((state) => state.user.value.theme);

  // STATE
  const [count, setCount] = useState(0);
  const [userFavoris, setUserFavoris] = useState([]);

  const [parkingClicked, setParkingClicked] = useState(null);
  const [showClickedParking, setShowClickedParking] = useState(false);

  // THEME

  let text;
  let bgCard;
  let icon;
  if (theme) {
    text = { color: "#333" };
    bgCard = { backgroundColor: "#DAE9F2" };
    icon = { color: "#87BBDD" };
  }

  console.log(userFavoritesParkings);
  // FUNCTION

  // GET USER FAVPARK

  const getUserFavorites = async () => {
    let paris =
      "https://data.opendatasoft.com/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes@saemes";
    let orleans =
      "https://data.opendatasoft.com/api/records/1.0/search/?dataset=mobilite-places-disponibles-parkings-en-temps-reel@orleansmetropole&rows=20";
    const parisData = await axios.get(paris);
    const orleansData = await axios.get(orleans);
    let parkingsData = [];
    let favoriteOfUser = [];
    axios
      .all([parisData, orleansData])
      .then(
        axios.spread((...responses) => {
          const responseParis = responses[0];
          const responseOrleans = responses[1];

          parkingsData = [
            ...responseParis.data.records,
            ...responseOrleans.data.records,
          ].forEach((el) => {
            // console.log(
            //   el.datasetid,
            //   el.recordid,
            //   userFavoritesParkings.includes(el.recordid)
            // );
            if (
              userFavoritesParkings.includes(el.fields.id) ||
              userFavoritesParkings.includes(el.recordid)
            ) {
              favoriteOfUser.push({
                id: el.datasetid.includes("orleansmetropole")
                  ? el.fields.id
                  : el.recordid,
                freeplaces:
                  el.fields.counterfreeplaces >= 0
                    ? el.fields.counterfreeplaces
                    : el.fields.dispo,
                name: el.fields.nom_parking || el.fields.name,
                latitude: el.geometry.coordinates[1],
                longitude: el.geometry.coordinates[0],
                pinStyle: {
                  tintColor:
                    el?.fields.counterfreeplaces > 40 || el?.fields.dispo > 40
                      ? "green"
                      : el?.fields.counterfreeplaces > 0 || el?.fields.dispo > 0
                      ? "orange"
                      : "red",
                },
                schedule:
                  el.fields
                    .horaires_d_acces_au_public_pour_les_usagers_non_abonnes,
              });
            }
          });
          setUserFavoris([...favoriteOfUser]);
        })
      )
      .catch((err) => console.error(err));
  };

  // COMPONENT INIT

  useEffect(() => {
    getUserFavorites();
  }, [count]);

  const handleFav = () => {
    props.changeFavScreen(false);
  };

  const test = userFavoris.map((el, i) => {
    // console.log("____________------------_____________----------", el);
    return (
      <FavParkCard
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
          <View style={[styles.popupContainer]}>
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
              onPress={() => handleFav()}
            />
          </View>
          <Text style={[styles.title, text]}>Mes parkings</Text>
          <View style={styles.icon}>
            <FontAwesome
              name="refresh"
              size={25}
              style={[{ color: "white" }, text]}
              onPress={() => setCount(count + 1)}
            />
          </View>
        </View>
        <View style={styles.ParkingsContainer}>
          <ScrollView
            style={[
              {
                width: "100%",
                height: "100%",
                backgroundColor: "#2E3740",
                paddingTop: 30,
              },
              bgCard,
            ]}
          >
            {test}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2E3740",
    paddingTop: "10%",
    justifyContent: "flex-start",
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
