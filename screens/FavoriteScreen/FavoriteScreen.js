import FontAwesome from "react-native-vector-icons/FontAwesome";
import ParkingSelected from "../../components/parking/ParkingSelected";
import FavoriteCard from "./components/FavoriteCard";
import { getUserFavorites } from "../../services/FavoriteService";

import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FavoriteScreen(props) {
  const theme = useSelector((state) => state.user.value.theme);

  const [count, setCount] = useState(0);
  const [userFavorites, setUserFavorites] = useState([]);

  const [parkingClicked, setParkingClicked] = useState(null);
  const [showClickedParking, setShowClickedParking] = useState(false);

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };

  useEffect(() => {
    getUserFavorites().then((favorites) => setUserFavorites(favorites));
  }, [count]);

  const handleFav = () => {
    props.changeFavScreen(false);
  };

  const test = userFavorites.map((el, i) => {
    return (
      <FavoriteCard
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E3740",
    marginBottom: 65,
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
