import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Themescreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            onPress={() => {
              navigation.navigate("Parkings");
            }}
          />
        </View>
        <Text style={styles.title}>Thèmes</Text>
      </View>
      <View style={styles.themeContainer}>
        <View style={styles.themeCard}>
          <FontAwesome name="sun-o" style={styles.cardIcon} size={20} />
          <View style={styles.themeTextContainer}>
            <Text style={styles.themeText}>Clair</Text>
          </View>
          <FontAwesome
            name="check-circle-o"
            style={styles.cardIcon}
            size={20}
          />
        </View>
        <View style={styles.themeCard}>
          <FontAwesome name="moon-o" style={styles.cardIcon} size={20} />
          <View style={styles.themeTextContainer}>
            <Text style={styles.themeText}>Sombre</Text>
          </View>
          <FontAwesome name="check-circle" style={styles.cardIcon} size={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "13%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // HEADER

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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: "15%",
  },

  // THEME CONTAINER

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
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "orange",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  cardIcon: {
    color: "red",
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
  },
});
