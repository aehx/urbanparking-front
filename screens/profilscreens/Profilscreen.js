import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Signin from "../profilscreens/Signin";
import Signup from "../profilscreens/Signup";

export default function Profilscreen({ navigation, route }) {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <SafeAreaView style={styles.globalContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur</Text>
        <Text style={styles.title}>Urban Parkings</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowSignup(true)}
          >
            <Text style={styles.btnText}>Inscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowSignin(true)}
          >
            <Text style={styles.btnText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showSignin && <Signin changeSignin={(state) => setShowSignin(state)} />}
      {showSignup && <Signup changeSignup={(state) => setShowSignup(state)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2E3740",
    paddingTop: "20%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 30,
  },
  btnContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#FC727B",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  btnText: {
    color: "#2E3740",
    fontWeight: "bold",
  },
});
