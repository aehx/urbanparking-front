import FontAwesome from "react-native-vector-icons/FontAwesome";
import ReviewScreen from "../ParkingScreen/ReviewScreen";
import axios from "axios";
import { favorisPark } from "../../reducers/user";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
export default function ParkingSelected(props) {
  // REDUCER & DISPATCH

  const dispatch = useDispatch();
  const userFav = useSelector((state) => state.user.value.favorisPark);
  const user = useSelector((state) => state.user.value);

  // STATE

  const [parkingLocation, setParkingLocation] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [showComs, setShowComs] = useState(false);

  // STAR ICON & COLOR

  let starColor;
  let starIcon;

  if (userFav && userFav.includes(props.id)) {
    starColor = { color: "yellow" };
    starIcon = "star";
  } else {
    starIcon = "star-o";
    starColor = { color: "white" };
  }

  // COMPONENT INIT

  useEffect(() => {
    axios
      .get(
        `https://urbanparking-backend.vercel.app/users/favoris/${user.token}`
      )
      .then((response) => {
        if (response.data.favoris.length > 0) {
          dispatch(favorisPark(response.data.favoris));
        }
      });
  }, []);

  // MODIFY IN DB

  const addToFavoris = async () => {
    await axios.put(
      `https://urbanparking-backend.vercel.app/users/favoris/${user.token}`,
      { parkId: props.id }
    );
    dispatch(favorisPark(props.id));
  };

  // MAP REDIRECTION

  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${parkingLocation.latitude},${parkingLocation.longitude}`;
  const label = `${props.name}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <View style={styles.globalContainer}>
      {/* HEADER */}
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
          style={{ color: "white" }}
          onPress={() => {
            props.changeState(false);
          }}
        />
        <FontAwesome
          name={starIcon}
          size={30}
          style={starColor}
          onPress={() => {
            addToFavoris();
          }}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{props.name}</Text>
      </View>

      {/* MAP */}

      <View style={styles.mapContainer}>
        <MapView region={parkingLocation} style={styles.map}>
          <Marker
            coordinate={{
              latitude: parkingLocation.latitude,
              longitude: parkingLocation.longitude,
            }}
            title={props.name}
          ></Marker>
        </MapView>

        {/* REDIRECT GOOGLE MAP */}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => Linking.openURL(url)}
        >
          <FontAwesome name="car" size={20} style={{ color: "#2E3740" }} />
          <Text>Y aller</Text>
          <FontAwesome name="car" size={20} style={{ color: "#2E3740" }} />
        </TouchableOpacity>

        {/* PARK INFOS */}

        <View style={styles.textContainer}>
          <View>
            <Text style={styles.text}>
              places disponibles : {props.freeplace}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>{props.horaire}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => setShowComs(true)}
        >
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
          <Text>Avis</Text>
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
        </TouchableOpacity>
      </View>

      {showComs && (
        <ReviewScreen
          toggleComPage={(state) => setShowComs(state)}
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
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },

  // MAP

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

  // BTN REDIRECT GOOGLE MAP

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
