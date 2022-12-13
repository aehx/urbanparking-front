import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addParking } from "../reducers/user";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Parkingfoundscreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            onPress={() => {
              navigation.navigate("Parkings");
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Indiquez un lieu"
            onChangeText={(value) => setParkings(value)}
            value={parking}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.button}
            activeOpacity={0.8}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "13%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // HEADER

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
});
