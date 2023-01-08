import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ReviewScreen from "../../screens/ReviewScreen/ReviewScreen";
import { favorisPark } from "../../redux/reducers/user";

export default function ParkingSelected(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const userFavoritePark = useSelector((state) => state.user.value.favorisPark);
  const theme = useSelector((state) => state.user.value.theme);

  const [parkingLocation] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [userNotLogged, setUserNotLogged] = useState(false);

  const starIcon =
    userFavoritePark && userFavoritePark.includes(props.id) ? "star" : "star-o";
  const starColor = theme
    ? { color: "#333" }
    : userFavoritePark && userFavoritePark.includes(props.id)
    ? { color: "yellow" }
    : { color: "white" };

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };
  const border = theme && { borderColor: "#87BBDD" };

  const addOrRemoveFavorite = async () => {
    if (user.token) {
      await axios.put(
        `https://urbanparking-backend.vercel.app/users/favoris/${user.token}`,
        { parkId: props.id }
      );
      dispatch(favorisPark(props.id));
    }
  };

  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${parkingLocation.latitude},${parkingLocation.longitude}`;
  const label = `${props.name}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <View style={[styles.globalContainer, bgCard]}>
      <View
        style={[
          styles.header,
          {
            justifyContent: "space-between",
            paddingRight: 30,
            paddingLeft: 30,
          },
        ]}
      >
        <FontAwesome
          name="arrow-left"
          size={30}
          style={[{ color: "white" }, text]}
          onPress={() => {
            setUserNotLogged(false);
            props.showParkingSelected(false);
          }}
        />
        {!user.token && userNotLogged && (
          <View>
            <Text
              style={[
                { fontSize: 16, fontWeight: "bold", color: "white" },
                text,
              ]}
            >
              Inscrivez-vous pour{" "}
            </Text>
            <Text
              style={[
                { fontSize: 16, fontWeight: "bold", color: "white" },
                text,
              ]}
            >
              {" "}
              ajouter aux favoris{" "}
            </Text>
          </View>
        )}
        <FontAwesome
          name={starIcon}
          size={30}
          style={starColor}
          onPress={() => {
            if (!user.token) {
              setUserNotLogged(true);
            }
            addOrRemoveFavorite();
          }}
        />
      </View>
      <View style={styles.header}>
        <Text style={[styles.title, text]}>{props.name}</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView region={parkingLocation} style={[styles.map, border]}>
          <Marker
            coordinate={{
              latitude: parkingLocation.latitude,
              longitude: parkingLocation.longitude,
            }}
            title={props.name}
          ></Marker>
        </MapView>
        <TouchableOpacity
          style={[styles.btn, bgBtn]}
          onPress={() => Linking.openURL(url)}
        >
          <FontAwesome name="car" size={20} style={{ color: "#2E3740" }} />
          <Text>Y aller</Text>
          <FontAwesome name="car" size={20} style={{ color: "#2E3740" }} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View>
            <Text style={[styles.text, text]}>
              places disponibles : {props.freeplaces}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, text]}>{props.schedule}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.btn, bgBtn]}
          onPress={() => setShowReviewScreen(true)}
        >
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
          <Text>Avis</Text>
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
        </TouchableOpacity>
      </View>

      {showReviewScreen && (
        <ReviewScreen
          toggleReviewScreen={(state) => setShowReviewScreen(state)}
          id={props.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
    width: "100%",
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  mapContainer: {
    marginTop: "5%",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  map: {
    height: "40%",
    width: "90%",
    borderRadius: 15,
    borderWidth: 4,
    marginBottom: 30,
    borderColor: "#FC727B",
  },
  btn: {
    flexDirection: "row",
    backgroundColor: "#FC727B",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
});
