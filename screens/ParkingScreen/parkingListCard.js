import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { useSelector } from "react-redux";

// CHILD OF PARKLISTSCREEN

export default function ParkingListCard(props) {
  const theme = useSelector((state) => state.user.value.theme);

  // THEME

  let border;
  let borderLight;
  let bgBtn;
  if (theme) {
    bgBtn = { backgroundColor: "#87BBDD" };
    border = { borderColor: "#87BBDD" };
    borderLight = { borderColor: "#DAE9F2" };
  }

  // INVERSE DATA FLOW DISPLAY/DON'T DISPLAY COMPONENT

  const handleclick = () => {
    props.displayCard(props);
    props.displaySelectedCard(true);
  };

  return (
    //  CARD
    <TouchableOpacity
      style={[styles.container, border]}
      onPress={() => {
        handleclick();
      }}
    >
      <View style={[styles.distance, bgBtn, borderLight]}>
        <Text style={{ fontWeight: "bold", color: "#2E3740" }}>
          {props.distanceBetweenParkAndMe.toFixed(0)} km
        </Text>
      </View>
      {/* PIN */}

      <View
        style={[
          styles.pinFreeplaces,
          { backgroundColor: props.pinStyle.tintColor },
        ]}
      ></View>

      {/* PICTURE */}

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/park.png")}
          style={[styles.image, { tintColor: "#2E3740" }]}
        />
      </View>

      {/* PARKING INFOS */}

      <View style={styles.parkingsContainer}>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
        <Text style={{ fontWeight: "bold" }}> places : {props.freeplaces}</Text>
        <Text style={{ fontWeight: "bold" }}>{props.schedule}</Text>
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
    justifyContent: "space-around",
    flex: 1,
    height: "100%",
    paddingTop: 10,
  },

  // PICTURE

  imageContainer: {
    width: "30%",
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },

  // PARKING INFO

  distance: {
    zIndex: 1,
    borderRadius: 10,
    borderColor: "#2E3740",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "-15%",
    right: 10,
    width: "30%",
    height: 30,
    backgroundColor: "#FC727B",
  },
  pinFreeplaces: {
    position: "absolute",
    top: "50%",
    right: "5%",
    height: 15,
    width: 15,
    borderRadius: 50,
  },
});
