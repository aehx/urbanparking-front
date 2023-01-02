import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../reducers/user";

export default function ThemeScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.value.theme);

  // THEME

  let text;
  let bgCard;
  let border;
  let icon;
  if (theme) {
    text = { color: "#333" };
    bgCard = { backgroundColor: "#DAE9F2" };
    icon = { color: "#87BBDD" };
    border = { borderColor: "#87BBDD" };
  }
  return (
    <SafeAreaView style={[styles.globalContainer]}>
      <View style={[styles.container, bgCard]}>
        <View style={styles.header}>
          <Text style={[styles.title, text]}>Thèmes</Text>
        </View>
        <View style={styles.themeContainer}>
          <TouchableOpacity
            style={[styles.themeCard, border]}
            onPress={() => dispatch(changeTheme(true))}
          >
            <FontAwesome
              name="sun-o"
              style={[styles.cardIcon, icon]}
              size={20}
            />
            <View style={styles.themeTextContainer}>
              <Text style={[styles.themeText, text]}>Clair</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeCard, border]}
            onPress={() => dispatch(changeTheme(false))}
          >
            <FontAwesome
              name="moon-o"
              style={[styles.cardIcon, icon]}
              size={20}
            />
            <View style={styles.themeTextContainer}>
              <Text style={[styles.themeText, text]}>Sombre</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#2E3740",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2E3740",
    paddingTop: "20%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    borderWidth: 2,
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
