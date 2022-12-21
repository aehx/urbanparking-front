import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { useSelector } from "react-redux";

// CHILD OF PARKLISTSCREEN

export default function FavParkCard(props) {
  const theme = useSelector((state) => state.user.value.theme);

  // THEME

  let border;
  if (theme) {
    border = { borderColor: "#87BBDD" };
  }

  // STYLE PIN PARKING

  let pinColor;
  if (props.freeplace > 40) {
    pinColor = { backgroundColor: "green" };
  } else if (props.freeplace > 0) {
    pinColor = { backgroundColor: "orange" };
  } else {
    pinColor = { backgroundColor: "red" };
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
      {/* PIN */}

      <View style={[styles.pinFreeplaces, pinColor]}></View>

      {/* PICTURE */}

      <View style={styles.imageContainer}>
        <Image source={require("../../assets/park.png")} style={styles.image} />
      </View>

      {/* PARKING INFOS */}

      <View style={styles.parkingsContainer}>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
        <View style={styles.infosContainer}>
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
    top: "50%",
    right: "5%",
    height: 15,
    width: 15,
    borderRadius: "50%",
  },
});
