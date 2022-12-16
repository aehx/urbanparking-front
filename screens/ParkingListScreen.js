import FontAwesome from "react-native-vector-icons/FontAwesome";
import ParkingSelected from "../screens/ParkingSelected";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ParkingListCard from "../screens/parkingListCard";
export default function Parkingscreen({ navigation }) {
  const parkReducer = useSelector((state) => state.parking.value.parkingList);
  const [parkingClicked, setParkingClicked] = useState(null);
  const [showClickedParking, setShowClickedParking] = useState(false);
  const parking = parkReducer.map((el, i) => {
    return (
      <ParkingListCard
        {...el}
        key={i}
        displayCard={(state) => setParkingClicked(state)}
        displaySelectedCard={(state) => setShowClickedParking(state)}
      />
    );
  });

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.globalContainer}
    >
      {showClickedParking && (
        <View style={styles.popupContainer}>
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
            style={{ color: "white" }}
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Homescreen" })
            }
          />
        </View>
        <Text style={styles.title}>Liste de parkings</Text>
      </View>
      <View style={styles.ParkingsContainer}>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2E3740",
            paddingTop: 30,
          }}
        >
          {parking}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingTop: "20%",
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },
  popupContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: "15%",
    color: "#FFF",
  },

  ParkingsContainer: {
    width: "90%",
    height: "80%",
    justifycontent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
