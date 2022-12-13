import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Profilscreen({ navigation }) {
  const handleSubmit = () => {
    dispatch(updateNickname(nickname));
    navigation.navigate("TabNavigator");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome to Urban Parkings</Text>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Already have an account ?</Text>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3740",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    color: "white",
    fontSize: 27,
    //letterSpacing: "1%",
    paddingBottom: 150,
    marginTop: 50,
    fontWeight: "bold",
  },
  textButton: {
    color: "#2E3740",
    fontWeight: "bold",
    paddingLeft: "27%",
  },
  button: {
    backgroundColor: "#FC727B",
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 15,
    width: "80%",
  },
  title: {
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
