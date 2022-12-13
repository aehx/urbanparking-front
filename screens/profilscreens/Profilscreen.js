import { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Settings from "./settings";
import Signin from "../profilscreens/Signin";
import Signup from "../profilscreens/Signup";

export default function Profilscreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  if (user.token) {
    return <Settings />;
  } else {
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
            <Text style={styles.text}>Déjà inscrit ? Connectez-vous !</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowSignin(true)}
            >
              <Text style={styles.btnText}>Connexion</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showSignin && (
          <Signin changeSignin={(state) => setShowSignin(state)} />
        )}
        {showSignup && (
          <Signup changeSignup={(state) => setShowSignup(state)} />
        )}
      </SafeAreaView>
    );
  }
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
  text: {
    color: "#FFF",
    fontSize: 15,
    marginBottom: 10,
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
  mainTitle: {
    color: "white",
    fontSize: 27,
    //letterSpacing: "1%",
    paddingBottom: 150,
    marginTop: 50,
    fontWeight: "bold",
  },
  textButton: {
    color: "#2E3740",
    fontWeight: "bold",
    paddingLeft: "27%",
  },
  button: {
    backgroundColor: "#FC727B",
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 15,
    width: "80%",
  },
  title: {
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
