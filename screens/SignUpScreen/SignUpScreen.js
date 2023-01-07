import { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import InputFields from "../../components/InputFields";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated, { SlideInDown } from "react-native-reanimated";

export default function SignUpScreen(props) {
  const theme = useSelector((state) => state.user.value.theme);

  const [step, setStep] = useState(0);

  const handleSignup = () => {
    props.changeSignup(false);
  };

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };

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

        <ProgressBar step={step} />
        <InputFields
          isSignupScreen={true}
          stepNumberValue={(value) => setStep(value)}
        />
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
});
