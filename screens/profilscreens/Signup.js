import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
export default function Signup(props) {
  const [step, setStep] = useState(0);

  const handleSignup = () => {
    props.changeSignup(false);
  };

  const handleStepPlus = () => {
    if (step === 2) {
      return;
    }
    setStep(step + 1);
  };
  const handleStepMoins = () => {
    setStep(step - 1);
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
            onPress={() => handleSignup()}
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
          <View style={styles.progressBarFull}>
            <View
              style={[styles.progressBarCircleFull, styles.circle1Full]}
            ></View>
            <View
              style={[styles.progressBarCircleFull, styles.circle2Full]}
            ></View>
            <View
              style={[styles.progressBarCircleFull, styles.circle3Full]}
            ></View>
          </View>
        </View>
      </View>
      <View style={fields}>
        {/* STEP 1 */}

        <View style={styles.step}>
          <TextInput
            placeholder="Nom d'utilisateur"
            type="text"
            style={styles.input}
          />
          <TextInput placeholder="E-mail" type="text" style={styles.input} />
          <TextInput
            placeholder="Mot de passe"
            type="password"
            style={styles.input}
          />
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
          <TextInput placeholder="Prénom" type="text" style={styles.input} />
          <TextInput placeholder="Nom" type="text" style={styles.input} />
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
          <TextInput placeholder="Ville" type="text" style={styles.input} />
          <TextInput placeholder="Adresse" type="text" style={styles.input} />
          <TextInput
            placeholder="Code postal"
            type="text"
            style={styles.input}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleStepMoins()}
            >
              <Text style={styles.btnText}>Precedent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleStepPlus()}
            >
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
  },
  progressBarEmpty: {
    borderWidth: 1.5,
    borderColor: "#FC727B",
    height: 10,
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
  },
  progressBarFull: {
    position: "absolute",
    alignItems: "center",
    top: 1,
    left: 0,
    backgroundColor: "#2E3740",
    height: 4,
    width: "100%",
  },

  //   PROGRESS CIRCLE

  progressBarCircle: {
    position: "absolute",
    borderRadius: "50%",
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#FC727B",
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

  //   PROGRESS FULL

  progressBarCircleFull: {
    position: "absolute",
    borderRadius: "50%",
    width: 12,
    height: 12,
    backgroundColor: "#2E3740",
  },
  circle1Full: {
    top: "-100%",
    left: -6,
  },
  circle2Full: {
    top: "-100%",
  },
  circle3Full: {
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

  //   STEPS

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

  //   MIDDLE BUTTON

  btnContainerMiddle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnMiddle: {
    width: "40%",
    margin: 10,
    marginTop: "15%",
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
