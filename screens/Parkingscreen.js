import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Parkingscreen({ navigation }) {
  const [showDistance, setShowDistance] = useState(false);
  const [range, setRange] = useState(0);

  return (
    <View style={styles.header}>
      <Text style={styles.mainTitle}>Liste des Parkings</Text>
      <View style={styles.input}>
        <TextInput type="text" placeholder="Indiquez un lieu" />
        <FontAwesome name="sliders" size={25} color="#555" />
      </View>
      <TouchableOpacity style={styles.sliderBtn} onPress={() => handleSubmit()}>
        <Text style={styles.title}>Filtrer au plus proche</Text>
      </TouchableOpacity>
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#2E3740",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
  },
  mainTitle: {
    color: "white",
    fontSize: 27,
    paddingBottom: 150,
    marginTop: 50,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
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
  container: {
    backgroundColor: "white",
    width: "80%",
    paddingTop: 50,
    marginBottom: 200,
  },

  sliderBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ddd",
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 15,
  },
});

/*        /* <ScrollView contentContainerStyle={styles.scrollView}>{}</ScrollView>
        {showDistance} && (
        <View style={styles.distanceFilter}>
          <Text style={styles.distanceText}>
            Distance : {Math.floor(range * 100)} km
          </Text>
          <View style={styles.sliderContainer}>
            <Slider
              onValueChange={(value) => setRange(value)}
              minimumValue={0}
              maximumValue={1}
              style={styles.slider}
            />
          </View> */
