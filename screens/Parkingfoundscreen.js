import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Parkingfoundscreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("Parkingscreen");
            }}
          />
        </View>
        <Text style={styles.mainTitle}>"Nom du Parking"</Text>
      </View>
      <View style={styles.input}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Voir sur la Carte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        ></TouchableOpacity>
      </View>

      <View style={styles.parkingInfo}></View>

      <Text style={styles.usersReview}>Avis des utilisateurs</Text>
      <View style={styles.reviewInfo}></View>
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
  btnText: {
    backgroundColor: "#FC727B",
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },

  // PARKING INFO (white board)

  parkingInfo: {
    marginTop: 20,
    backgroundColor: "white",
    height: "15%",
    width: "80%",
    padding: 3,
    marginBottom: 200,
    borderRadius: 5,
  },

  // USERS REVIEW (+ white board)

  usersReview: {
    marginTop: -100,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  reviewInfo: {
    marginTop: 20,
    backgroundColor: "white",
    height: "15%",
    width: "80%",
    padding: 10,
    marginBottom: 200,
    borderRadius: 5,
  },
});
