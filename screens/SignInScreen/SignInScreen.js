import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { login } from "../../redux/reducers/user";
import Animated, { SlideInDown } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SignInScreen(props) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.value.theme);

  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const bg = theme && { backgroundColor: "#FFF" };
  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };
  const border = theme && { borderColor: "#87BBDD" };

  const leaveSigninScreen = () => {
    props.changeSignin(false);
  };

  const validateSigninForm = () => {
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
    leaveSigninScreen();
  };

  const eye = showPassword ? "eye" : "eye-slash";

  return (
    <Animated.View
      style={[styles.globalContainer, bgCard]}
      entering={SlideInDown}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.globalContainer, bgCard]}
      >
        <View style={styles.header}>
          <View style={[styles.icon]}>
            <FontAwesome
              name="arrow-left"
              size={30}
              style={[{ color: "white" }, text]}
              onPress={() => leaveSigninScreen()}
            />
          </View>
          <Text style={[styles.title, text]}>Connexion</Text>
        </View>

        <View style={[styles.inputContainer, bgCard]}>
          <TextInput
            placeholder="Nom d'utilisateur"
            type="text"
            style={[styles.input, bg, border]}
            onChangeText={(value) => setUser({ ...user, username: value })}
          />
          <View style={styles.password}>
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              textContentType={"password"}
              style={[styles.input, bg, border]}
              onChangeText={(value) => setUser({ ...user, password: value })}
            />
            <FontAwesome
              name={eye}
              size={25}
              style={styles.eye}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn, bgBtn]}
              onPress={() => validateSigninForm()}
            >
              <Text style={styles.btnText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
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
  password: {
    alignItems: "center",
    width: "100%",
  },
  eye: {
    position: "absolute",
    top: 9,
    right: "20%",
  },
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
  btnText: {
    fontWeight: "bold",
  },
});
