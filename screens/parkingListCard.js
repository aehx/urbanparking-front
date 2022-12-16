import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

export default function ParkingListCard(props) {
  let pinColor;
  if (props.freeplace > 40) {
    pinColor = { backgroundColor: "green" };
  } else if (props.freeplace > 0) {
    pinColor = { backgroundColor: "orange" };
  } else {
    pinColor = { backgroundColor: "red" };
  }
  const handleclick = () => {
    props.displayCard(props);
    props.displaySelectedCard(true);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleclick()}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/parkingPicture.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.parkingsContainer}>
        <View style={styles.distance}>
          <Text style={{ fontWeight: "bold", color: "#2E3740" }}>
            {props.distance.toFixed(0)} km
          </Text>
        </View>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
        <View style={styles.infosContainer}>
          <View style={[styles.pinFreeplaces, pinColor]}></View>
          <View style={styles.horaire}>
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              places : {props.freeplace}
            </Text>
          </View>
          <View style={styles.freeplace}>
            <Text style={{ fontWeight: "bold" }}>{props.horaire}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // CONTAINER

  container: {
    padding: 5,
    borderWidth: 3,
    borderColor: "#FC727B",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 110,
    width: "100%",
    marginBottom: 20,
  },
  parkingsContainer: {
    flex: 1,
    height: "100%",
    paddingTop: 10,
  },
  imageContainer: {
    width: "30%",
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  distance: {
    zIndex: 1,
    borderRadius: 10,
    borderColor: "#2E3740",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -20,
    right: 0,
    width: "33%",
    height: 27,
    backgroundColor: "#FC727B",
  },
  infosContainer: {
    justifyContent: "space-between",
  },
  horaire: {
    marginTop: 10,
  },
  freeplace: {
    marginTop: 10,
  },
  pinFreeplaces: {
    position: "absolute",
    right: 0,
    height: 15,
    width: 15,
    borderRadius: "50%",
    backgroundColor: "red",
  },
});
