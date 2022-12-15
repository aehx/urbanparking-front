import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Parkingscreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("Parkings");
            }}
          />
        </View>
        <Text style={styles.mainTitle}>"Liste des Parkings"</Text>
      </View>
      <View style={styles.input}>
        <TextInput type="text" placeholder="Recherchez par nom" />
        <FontAwesome name="sliders" size={25} color="#555" />
      </View>

      <View style={styles.parkingInfo}>
        <Image
          style={styles.image}
          source={require("../assets/favicon.png")}
        ></Image>
        <View style={styles.text}>
          <Text>Nom du Parking</Text>
          <Text>Ville</Text>
          <Text>Adresse</Text>
          <Text>"nombre" de KM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER

  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: "15%",
    alignItems: "center",
    backgroundColor: "#2E3740",
  },

  // HEADER

  header: {
    flexDirection: "row",
    height: "17%",
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginHorizontal: "1%",
    marginBottom: 5,
    justifyContent: "space-evenly",
  },

  icon: {
    width: 50,
    height: 50,
  },
  mainTitle: {
    display: "flex",
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
  },

  // INPUT

  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    marginBottom: 50,
    fontSize: 16,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#FC727B",
  },

  // PARKING CONTAINER LIST

  parkingInfo: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    height: "20%",
    width: "90%",
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginHorizontal: "1%",
    marginBottom: 5,
    justifyContent: "space-evenly",
  },

  image: {
    margin: 15,
  },
  text: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    justifyContent: "space-evenly",
    height: "auto",
    width: "auto",
  },
});
