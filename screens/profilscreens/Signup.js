import FontAwesome from "react-native-vector-icons/FontAwesome";
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

import { useState } from "react";
import axios from "axios";

// CHILD OF PROFILSCREEN

export default function Signup(props) {
  // DISPATCH & REDUCER
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // STEP USESTATE

  const [step, setStep] = useState(0);

  //   INPUT USESTATE

  const [emptyFields, setEmptyFields] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  //   USER USESTATE

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

  // EMAIL TESTING

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // INVERSE DATA FLOW

  const handleSignup = () => {
    props.changeSignup(false);
  };

  // NEXT/PREVIOUS STEP

  const handleStepPlus = () => {
    setStep(step + 1);
  };

  const handleStepMoins = () => {
    setStep(step - 1);
  };

  //   FORM

  const formSubmit = () => {
    // CHECK FIELDS EMPTY OR NOT

    const checkFields = Object.entries(newUser);
    const check = checkFields.forEach((field) => {
      if (field[1] === "" || field[1] === null) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
      }
    });

    // PUSH IN DB IF MAIL & NOT EMPTY field

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

  //   SELECT FIELDS

  let fields;
  if (step === 0) {
    fields = [styles.inputContainer, styles.inputContainer1];
  } else if (step === 1) {
    fields = [styles.inputContainer, styles.inputContainer2];
  } else if (step === 2) {
    fields = [styles.inputContainer, styles.inputContainer3];
  }

  //   InsideCircle style

  let circle2Style;
  let circle3Style;
  let barInsideStyle;
  if (step < 1) {
    barInsideStyle = [styles.progressBarInside, { width: 0 }];
    circle2Style = { display: "none" };
    circle3Style = { display: "none" };
  } else if (step === 1) {
    barInsideStyle = [styles.progressBarInside, { width: "50%" }];
    circle2Style = [
      styles.progressBarCircleInside,
      styles.circle2Inside,
      { right: -6 },
    ];
  } else if (step === 2) {
    barInsideStyle = [styles.progressBarInside, { width: "100%" }];
    circle2Style = [styles.progressBarCircleInside, styles.circle2Inside];
    circle3Style = [styles.progressBarCircleInside, styles.circle3Inside];
  }

  //   PASSWORD SHOW/DON'T SHOW

  let eye;
  if (!showPassword) {
    eye = "eye-slash";
  } else {
    eye = "eye";
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.globalContainer}
    >
      <View style={styles.header}>
        {/* TITLE */}

        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={{ color: "white" }}
            onPress={() => {
              handleSignup();
            }}
          />
        </View>
        <Text style={styles.title}>Inscription</Text>
      </View>

      {/* PROGRESS BAR  */}

      <View style={styles.progressContainer}>
        <View style={styles.progressBarEmpty}>
          <View style={[styles.progressBarCircle, styles.circle1]}></View>
          <View style={[styles.progressBarCircle, styles.circle2]}></View>
          <View style={[styles.progressBarCircle, styles.circle3]}></View>

          {/* BAR Inside  */}

          <View style={barInsideStyle}>
            <View
              style={[styles.progressBarCircleInside, styles.circle1Inside]}
            ></View>
            <View style={circle2Style}></View>
            <View style={circle3Style}></View>
          </View>
        </View>
      </View>

      {/* INPUT CONTAINER */}

      <View style={fields}>
        {/* STEP 1 */}

        <View style={styles.step}>
          <TextInput
            placeholder="Nom d'utilisateur"
            style={styles.input}
            value={newUser.username}
            onChangeText={(value) =>
              setNewUser({ ...newUser, username: value })
            }
          />
          <TextInput
            placeholder="E-mail"
            textContentType={"emailAddress"}
            keyboardType="email-address"
            style={styles.input}
            value={newUser.email}
            onChangeText={(value) => setNewUser({ ...newUser, email: value })}
          />
          <View style={styles.password}>
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry={showPassword}
              textContentType={"password"}
              style={styles.input}
              value={newUser.password}
              onChangeText={(value) =>
                setNewUser({ ...newUser, password: value })
              }
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
              style={styles.btn}
              onPress={() => handleStepPlus()}
            >
              <Text style={styles.btnText}>suivant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STEP 2 */}

        <View style={styles.step}>
          <TextInput
            placeholder="Prénom"
            textContentType={"name"}
            style={styles.input}
            value={newUser.firstname}
            onChangeText={(value) =>
              setNewUser({ ...newUser, firstname: value })
            }
          />
          <TextInput
            placeholder="Nom"
            textContentType={"familyName"}
            style={styles.input}
            value={newUser.lastname}
            onChangeText={(value) =>
              setNewUser({ ...newUser, lastname: value })
            }
          />
          <View style={[styles.btnContainer, styles.btnContainerMiddle]}>
            <TouchableOpacity
              style={[styles.btn, styles.btnMiddle]}
              onPress={() => handleStepMoins()}
            >
              <Text style={styles.btnText}>Precedent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnMiddle]}
              onPress={() => handleStepPlus()}
            >
              <Text style={styles.btnText}>suivant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STEP 3 */}

        <View style={styles.step}>
          <TextInput
            placeholder="Ville"
            style={styles.input}
            value={newUser.city}
            onChangeText={(value) => setNewUser({ ...newUser, city: value })}
          />
          <TextInput
            placeholder="Adresse"
            style={styles.input}
            value={newUser.address}
            onChangeText={(value) => setNewUser({ ...newUser, address: value })}
          />
          <TextInput
            placeholder="Code postal"
            textContentType={"postalCode"}
            keyboardType="phone-pad"
            style={styles.input}
            value={newUser.postal}
            onChangeText={(value) => setNewUser({ ...newUser, postal: value })}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleStepMoins()}
            >
              <Text style={styles.btnText}>Precedent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => formSubmit()}>
              <Text style={styles.btnText}>valider le formulaire</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: "15%",
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

  //   PROGRESS BAR

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
