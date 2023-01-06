import { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import SettingsScreen from "../SettingsScreen/SettingsScreen";
import SignInScreen from "../SignInScreen/SignInScreen";
import SignUpScreen from "../SignUpScreen/SignUpScreen";

export default function ViewProfileScreen() {
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);

  const [showSignInScreen, setShowSignInScreen] = useState(false);
  const [showSignUpScreen, setShowSignUpScreen] = useState(false);

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };

  if (user.token) {
    return <SettingsScreen />;
  }

  return (
    <SafeAreaView style={[styles.globalContainer]}>
      <View style={[styles.container, bgCard]}>
        <Text style={[styles.title, text]}>Bienvenue sur</Text>
        <Text style={[styles.title, text]}>Urban Parkings</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => setShowSignUpScreen(true)}
          >
            <Text style={styles.btnText}>Inscription</Text>
          </TouchableOpacity>
          <Text style={[styles.text, text]}>
            Déjà inscrit ? Connectez-vous !
          </Text>
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => setShowSignInScreen(true)}
          >
            <Text style={styles.btnText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showSignInScreen && (
        <SignInScreen changeSignin={(state) => setShowSignInScreen(state)} />
      )}
      {showSignUpScreen && (
        <SignUpScreen changeSignup={(state) => setShowSignUpScreen(state)} />
      )}
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
