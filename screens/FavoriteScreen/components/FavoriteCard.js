import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { useSelector } from "react-redux";

export default function FavoriteCard(props) {
  const theme = useSelector((state) => state.user.value.theme);

  const border = theme && { borderColor: "#87BBDD" };

  // INVERSE DATA FLOW DISPLAY/DON'T DISPLAY COMPONENT

  const handleclick = () => {
    props.displayCard(props);
    props.displaySelectedCard(true);
  };

  return (
    <TouchableOpacity
      style={[styles.container, border]}
      onPress={() => {
        handleclick();
      }}
    >
      <View
        style={[
          styles.pinFreeplaces,
          { backgroundColor: props.pinStyle.tintColor },
        ]}
      ></View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/park.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.parkingsContainer}>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
        <Text style={{ fontWeight: "bold" }}> places : {props.freeplaces}</Text>
        <Text style={{ fontWeight: "bold" }}>{props.schedule}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  },
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
  infosContainer: {
    justifyContent: "space-between",
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
