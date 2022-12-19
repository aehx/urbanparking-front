import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/user";

// CHILD OF PROFILSCREEN

export default function Signin(props) {
  // DISPATCH & REDUCER

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.value);

  // STATE

  const [user, setUser] = useState({ username: "", password: "" });
  const [securePassword, setSecurePassword] = useState(true);

  // INVERSE DATA FLOW

  const handleSignin = () => {
    props.changeSignin(false);
  };

  // FORM

  const validateSignin = () => {
    axios
      .post("https://urbanparking-backend.vercel.app/users/signin", user)
      .then((response) => {
        dispatch(
          login({
            token: response.data.token,
            username: response.data.username,
          })
        );
      });
  };

  // EYE STYLE

  let eye;
  if (!securePassword) {
    eye = "eye-slash";
  } else {
    eye = "eye";
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.globalContainer}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={{ color: "white" }}
            onPress={() => handleSignin()}
          />
        </View>
        <Text style={styles.title}>Connexion</Text>
      </View>

      {/* FIELD FOR CONNECTION */}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom d'utilisateur"
          type="text"
          style={styles.input}
          onChangeText={(value) => setUser({ ...user, username: value })}
        />
        <View style={styles.password}>
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry={securePassword}
            textContentType={"password"}
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, password: value })}
          />
          <FontAwesome
            name={eye}
            size={25}
            style={styles.eye}
            onPress={() => {
              setSecurePassword(!securePassword);
            }}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => validateSignin()}>
            <Text style={styles.btnText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingTop: "10%",
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },

  //   HEADER

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

  // FIELDS

  inputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E3740",
  },
  input: {
    borderWidth: 2,
    borderColor: "#FC727B",
    backgroundColor: "#eee",
    width: "70%",
    fontSize: 18,
    padding: 10,
    marginBottom: "7%",
    borderRadius: 15,
  },

  // PASSWORD INPUT

  password: {
    alignItems: "center",
    width: "100%",
  },
  eye: {
    position: "absolute",
    top: 9,
    right: "20%",
  },
  // BUTTON
  btnContainer: {
    width: "100%",
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
});
