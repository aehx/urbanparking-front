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
      <View style={fields}>
        {/* STEP 1 */}

        <View style={[styles.step, styles.step1]}>
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

        <View style={[styles.step, styles.step2]}>
          <TextInput placeholder="Prénom" type="text" style={styles.input} />
          <TextInput placeholder="Nom" type="text" style={styles.input} />
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
              <Text style={styles.btnText}>suivant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STEP 3 */}

        <View style={[styles.step, styles.step3]}>
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
              <Text style={styles.btnText}>suivant</Text>
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
});
