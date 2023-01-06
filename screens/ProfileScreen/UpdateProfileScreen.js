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
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { login } from "../../redux/reducers/user";
import ProgressBar from "../../components/ProgressBar";

export default function UpdateProfileScreen(props) {
  // DISPATCH & REDUCER

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);

  // STATE
  //  STEP

  const [step, setStep] = useState(0);

  //   INPUT

  const [showPassword, setShowPassword] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);

  // USER

  const [updateUser, setUpdateUser] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    city: "",
    address: "",
    postal: null,
  });

  // FOR EMAIL TESTING

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // INVERSE DATA FLOW

  const handleUpdate = () => {
    props.changeUpdateScreen(false);
  };

  //   FORM

  const formUpdate = () => {
    if (updateUser.email && !EMAIL_REGEX.test(updateUser.email)) {
      setInvalidEmail(true);
      return;
    } else {
      setInvalidEmail(false);
      for (let value in updateUser) {
        if (!updateUser[value] || updateUser[value] === "") {
          delete updateUser[value];
        }
      }
      axios
        .put(
          `https://urbanparking-backend.vercel.app/users/update/${user.token}`,
          updateUser
        )
        .then((response) =>
          dispatch(
            login({
              username: response.data.username,
              token: response.data.token,
            })
          )
        );
      props.changeUpdateScreen(false);
    }
  };

  const bg = theme && { backgroundColor: "#FFF" };
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

  return (
    <SafeAreaView style={[styles.globalContainer]}>
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
                handleUpdate();
              }}
            />
          </View>
          <Text style={[styles.title, text]}>Mise à jour</Text>
        </View>

        <ProgressBar step={step} />

        {/* INPUT CONTAINER */}

        <View style={fields}>
          {/* STEP 1 */}

          <View style={[styles.step, bgCard]}>
            <TextInput
              placeholder="Nom d'utilisateur"
              style={[styles.input, border, bg]}
              value={updateUser.username}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, username: value })
              }
            />
            <TextInput
              placeholder="E-mail"
              textContentType={"emailAddress"}
              keyboardType="email-address"
              style={[styles.input, border, bg]}
              value={updateUser.email}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, email: value })
              }
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btn, bgBtn]}
                onPress={() => setStep(step + 1)}
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
              style={[styles.input, border, bg]}
              value={updateUser.firstname}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, firstname: value })
              }
            />
            <TextInput
              placeholder="Nom"
              textContentType={"familyName"}
              style={[styles.input, border, bg]}
              value={updateUser.lastname}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, lastname: value })
              }
            />
            <View style={[styles.btnContainer, styles.btnContainerMiddle]}>
              <TouchableOpacity
                style={[styles.btn, styles.btnMiddle, bgBtn]}
                onPress={() => setStep(step - 1)}
              >
                <Text style={styles.btnText}>Precedent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnMiddle, bgBtn]}
                onPress={() => setStep(step + 1)}
              >
                <Text style={styles.btnText}>suivant</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* STEP 3 */}

          <View style={[styles.step, bgCard]}>
            <TextInput
              placeholder="Ville"
              style={[styles.input, border, bg]}
              value={updateUser.city}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, city: value })
              }
            />
            <TextInput
              placeholder="Adresse"
              style={[styles.input, border, bg]}
              value={updateUser.address}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, address: value })
              }
            />
            <TextInput
              placeholder="Code postal"
              textContentType={"postalCode"}
              keyboardType="phone-pad"
              style={[styles.input, border, bg]}
              value={updateUser.postal}
              onChangeText={(value) =>
                setUpdateUser({ ...updateUser, postal: value })
              }
            />

            <View style={styles.btnContainer}>
              {invalidEmail && (
                <Text style={styles.mailError}>email invalide</Text>
              )}
              <TouchableOpacity
                style={[styles.btn, bgBtn]}
                onPress={() => setStep(step - 1)}
              >
                <Text style={styles.btnText}>Precedent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, bgBtn]}
                onPress={() => formUpdate()}
              >
                <Text style={styles.btnText}>valider le formulaire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginBottom: 25,
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
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
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
  mailError: {
    fontSize: 18,
    color: "#990000",
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
