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

// PARENT OF SIGNIN/SIGNUP/SETTING

export default function Profilscreen() {
  // REDUCER
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);

  // STATE
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // THEME

  let text;
  let bgCard;
  let bgBtn;
  if (theme) {
    text = { color: "#333" };
    bgCard = { backgroundColor: "#DAE9F2" };
    bgBtn = { backgroundColor: "#87BBDD" };
  }

  // REDIRECT DEPENDS OF USER ALREADY CONNECTED OR NOT

  if (user.token) {
    return (
      <Settings
        changeSignup={(state) => {
          setShowSignup(state);
        }}
        changeSignin={(state) => {
          setShowSignin(state);
        }}
      />
    );
  } else {
    return (
      <SafeAreaView style={[styles.globalContainer]}>
        <View style={[styles.container, bgCard]}>
          <Text style={[styles.title, text]}>Bienvenue sur</Text>
          <Text style={[styles.title, text]}>Urban Parkings</Text>
          <View style={styles.btnContainer}>
            {/* INVERSE DATA FLOW */}

            <TouchableOpacity
              style={[styles.btn, bgBtn]}
              onPress={() => setShowSignup(true)}
            >
              <Text style={styles.btnText}>Inscription</Text>
            </TouchableOpacity>
            <Text style={[styles.text, text]}>
              Déjà inscrit ? Connectez-vous !
            </Text>
            <TouchableOpacity
              style={[styles.btn, bgBtn]}
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
});
