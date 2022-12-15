import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Themescreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.globalContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Thèmes</Text>
      </View>
      <View style={styles.themeContainer}>
        <View style={styles.themeCard}>
          <FontAwesome name="sun-o" style={styles.cardIcon} size={20} />
          <View style={styles.themeTextContainer}>
            <Text style={styles.themeText}>Clair</Text>
          </View>
        </View>
        <View style={styles.themeCard}>
          <FontAwesome name="moon-o" style={styles.cardIcon} size={20} />
          <View style={styles.themeTextContainer}>
            <Text style={styles.themeText}>Sombre</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    paddingTop: "27%",
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
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  themeContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "25%",
    width: "100%",
  },
  themeCard: {
    borderRadius: 15,
    width: "90%",
    height: "15%",
    padding: 20,
    // borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#FC727B",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  cardIcon: {
    color: "#FC727B",
  },
  themeTextContainer: {
    flex: 1,
    paddingLeft: "15%",
    height: "100%",
    justifyContent: "center",
    fontSize: 19,
  },
  themeText: {
    fontSize: 18,
    color: "#2E3740",
  },
});
