import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
export default function Signin(props) {
  const handleSignin = () => {
    props.changeSignin(false);
  };
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
            onPress={() => handleSignin()}
          />
        </View>
        <Text style={styles.title}>Connexion</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom d'utilisateur"
          type="text"
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          type="password"
          style={styles.input}
        />
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
});
