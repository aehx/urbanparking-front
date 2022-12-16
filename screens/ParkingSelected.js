import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
export default function ParkingSelected(props) {
  const [parkingLocation, setParkingLocation] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  console.log(props);
  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.globalContainer}
    >
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
          name="star-o"
          size={30}
          style={{ color: "white" }}
          onPress={() => {
            props.changeState(false);
          }}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <MapView region={parkingLocation} style={styles.map}>
          <Marker
            coordinate={{
              latitude: parkingLocation.latitude,
              longitude: parkingLocation.longitude,
            }}
            title={props.name}
          ></Marker>
        </MapView>
        <TouchableOpacity style={styles.btn}>
          <FontAwesome name="car" size={20} />
          <Text>Y aller</Text>
          <FontAwesome name="car" size={20} />
        </TouchableOpacity>
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
      </View>
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
  inputContainer: {
    marginTop: "5%",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10%",
  },
  map: {
    height: "40%",
    width: "90%",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#FC727B",
  },
  textContainer: {
    width: "90%",
  },
  text: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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
});
