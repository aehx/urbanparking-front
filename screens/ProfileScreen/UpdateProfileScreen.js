import { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProgressBar from "../../components/ProgressBar";
import InputFields from "../../components/InputFields";

export default function UpdateProfileScreen(props) {
  const theme = useSelector((state) => state.user.value.theme);

  const [step, setStep] = useState(0);

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };

  const leaveUpdateProfilScreen = () => {
    props.changeUpdateScreen(false);
  };

  return (
    <SafeAreaView style={[styles.globalContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.globalContainer, bgCard]}
      >
        <View style={styles.header}>
          <View style={styles.icon}>
            <FontAwesome
              name="arrow-left"
              size={30}
              style={[{ color: "white" }, text]}
              onPress={() => {
                leaveUpdateProfilScreen();
              }}
            />
          </View>
          <Text style={[styles.title, text]}>Mise à jour</Text>
        </View>

        <ProgressBar step={step} />
        <InputFields
          isSignupScreen={false}
          stepNumberValue={(value) => setStep(value)}
        />
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
});
