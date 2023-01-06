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
  Keyboard,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated, { SlideInDown } from "react-native-reanimated";
import { login } from "../../redux/reducers/user";

export default function SignUpScreen(props) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.value.theme);

  const [step, setStep] = useState(0);
  const [emptyFields, setEmptyFields] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    address: "",
    postal: null,
  });

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignup = () => {
    props.changeSignup(false);
  };

  const formSubmit = () => {
    const checkFields = Object.entries(newUser);
    const check = checkFields.forEach((field) => {
      if (field[1] === "" || field[1] === null) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
      }
    });

    if (!emptyFields && EMAIL_REGEX.test(newUser.email)) {
      setShowPassword(false);
      axios
        .post("https://urbanparking-backend.vercel.app/users/signup", newUser)
        .then((response) =>
          dispatch(
            login({
              token: response.data.token,
              username: response.data.username,
            })
          )
        );
    }
  };

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };
  const border = theme && { borderColor: "#87BBDD" };

  const fields = (() => {
    switch (step) {
      case 0:
        return [styles.inputContainer, styles.inputContainer1];
      case 1:
        return [styles.inputContainer, styles.inputContainer2];
      case 2:
        return [styles.inputContainer, styles.inputContainer3];
    }
  })();

  let circle2Style;
  let circle3Style;
  let barInsideStyle;
  if (step < 1) {
    barInsideStyle = [styles.progressBarInside, { width: 0 }];
    circle2Style = { display: "none" };
    circle3Style = { display: "none" };
  } else if (step === 1) {
    barInsideStyle = [styles.progressBarInside, { width: "50%" }, bgBtn];
    circle2Style = [
      styles.progressBarCircleInside,
      styles.circle2Inside,
      { right: -6 },
    ];
  } else if (step === 2) {
    barInsideStyle = [styles.progressBarInside, { width: "100%" }, bgBtn];
    circle2Style = [styles.progressBarCircleInside, styles.circle2Inside];
    circle3Style = [styles.progressBarCircleInside, styles.circle3Inside];
  }

  const eyeIconForPassword = !showPassword ? "eye-slash" : "eye";

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
          {/* TITLE */}

          <View style={styles.icon}>
            <FontAwesome
              name="arrow-left"
              size={30}
              style={[{ color: "white" }, text]}
              onPress={() => {
                handleSignup();
              }}
            />
          </View>
          <Text style={[styles.title, text]}>Inscription</Text>
        </View>
        <Text style={[{ color: "white", fontSize: 16 }, text]}>
          ** Champs obligatoires
        </Text>
        {/* PROGRESS BAR  */}

        <View style={styles.progressContainer}>
          <View style={styles.progressBarEmpty}>
            <View style={[styles.progressBarCircle, styles.circle1]}></View>
            <View style={[styles.progressBarCircle, styles.circle2]}></View>
            <View style={[styles.progressBarCircle, styles.circle3]}></View>

            {/* BAR Inside  */}

            <View style={barInsideStyle}>
              <View
                style={[
                  styles.progressBarCircleInside,
                  styles.circle1Inside,
                  bgBtn,
                ]}
              ></View>
              <View style={[circle2Style, bgBtn]}></View>
              <View style={[circle3Style, bgBtn]}></View>
            </View>
          </View>
        </View>

        {/* INPUT CONTAINER */}

        <View style={fields}>
          {/* STEP 1 */}
          <View style={[styles.step, bgCard, { paddingBottom: 20 }]}>
            <TextInput
              placeholder="** Nom d'utilisateur"
              style={[styles.input, border]}
              value={newUser.username}
              onChangeText={(value) =>
                setNewUser({ ...newUser, username: value })
              }
            />
            <TextInput
              placeholder="** E-mail"
              textContentType={"emailAddress"}
              keyboardType="email-address"
              style={[styles.input, border]}
              value={newUser.email}
              onChangeText={(value) => setNewUser({ ...newUser, email: value })}
            />
            <View style={styles.password}>
              <TextInput
                placeholder="** Mot de passe"
                secureTextEntry={showPassword}
                textContentType={"password"}
                style={[styles.input, border]}
                value={newUser.password}
                onChangeText={(value) =>
                  setNewUser({ ...newUser, password: value })
                }
              />
              <FontAwesome
                name={eyeIconForPassword}
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
                onPress={() => {
                  setStep(step + 1), Keyboard.dismiss();
                }}
              >
                <Text style={styles.btnText}>suivant</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* STEP 2 */}

          <View style={[styles.step, bgCard]}>
            <TextInput
              placeholder="Prénom"
              textContentType={"name"}
              style={[styles.input, border]}
              value={newUser.firstname}
              onChangeText={(value) =>
                setNewUser({ ...newUser, firstname: value })
              }
            />
            <TextInput
              placeholder="Nom"
              textContentType={"familyName"}
              style={[styles.input, border]}
              value={newUser.lastname}
              onChangeText={(value) =>
                setNewUser({ ...newUser, lastname: value })
              }
            />
            <View style={[styles.btnContainer, styles.btnContainerMiddle]}>
              <TouchableOpacity
                style={[styles.btn, styles.btnMiddle, bgBtn]}
                onPress={() => {
                  setStep(step - 1), Keyboard.dismiss();
                }}
              >
                <Text style={styles.btnText}>Precedent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnMiddle, bgBtn]}
                onPress={() => {
                  setStep(step + 1), Keyboard.dismiss();
                }}
              >
                <Text style={styles.btnText}>suivant</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* STEP 3 */}

          <View style={[styles.step, bgCard, { marginBottom: 20 }]}>
            <TextInput
              placeholder="Ville"
              style={[styles.input, border]}
              value={newUser.city}
              onChangeText={(value) => setNewUser({ ...newUser, city: value })}
            />
            <TextInput
              placeholder="Adresse"
              style={[styles.input, border]}
              value={newUser.address}
              onChangeText={(value) =>
                setNewUser({ ...newUser, address: value })
              }
            />
            <TextInput
              placeholder="Code postal"
              textContentType={"postalCode"}
              keyboardType="phone-pad"
              style={[styles.input, border]}
              value={newUser.postal}
              onChangeText={(value) =>
                setNewUser({ ...newUser, postal: value })
              }
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btn, bgBtn, { marginBottom: 10 }]}
                onPress={() => {
                  setStep(step - 1), Keyboard.dismiss();
                }}
              >
                <Text style={styles.btnText}>Precedent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, bgBtn]}
                onPress={() => formSubmit()}
              >
                <Text style={styles.btnText}>valider le formulaire</Text>
              </TouchableOpacity>
            </View>
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
  progressContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBarEmpty: {
    borderWidth: 1.5,
    borderColor: "#333",
    height: 10,
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
  },
  progressBarInside: {
    position: "absolute",
    top: 1,
    left: 0,
    alignItems: "center",
    backgroundColor: "#FC727B",
    height: 4,
    transition: "all 2s ease-in-out",
  },

  //   PROGRESS CIRCLE

  progressBarCircle: {
    position: "absolute",
    borderRadius: "50%",
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#333",
  },
  circle1: {
    top: -7,
    left: -10,
  },
  circle2: {
    top: -7,
  },
  circle3: {
    top: -7,
    right: -10,
  },

  //   PROGRESS Inside

  progressBarCircleInside: {
    position: "absolute",
    borderRadius: "50%",
    width: 12,
    height: 12,
    backgroundColor: "#FC727B",
  },
  circle1Inside: {
    top: "-100%",
    left: -6,
  },
  circle2Inside: {
    top: "-100%",
  },
  circle3Inside: {
    top: "-100%",
    right: -6,
  },
  //   INPUT CONTAINER

  inputContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E3740",
    backgroundColor: "white",
  },
  inputContainer1: {
    justifyContent: "flex-start",
  },
  inputContainer2: {
    justifyContent: "center",
  },
  inputContainer3: {
    justifyContent: "flex-end",
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

  //   STEPS (InputContainer child)

  step: {
    width: "100%",
    height: "100%",
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

  //   BUTTON

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

  //  STEP 2  || BUTTON

  btnContainerMiddle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnMiddle: {
    width: "40%",
    margin: 10,
    marginTop: "15%",
  },
});
