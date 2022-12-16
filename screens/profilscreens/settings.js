import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/user";

export default function Settings(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  if (!user.token) {
    props.navigation.navigate("TabNavigator", { screen: "Profil" });
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Bonjour <Text style={styles.userName}>{user.username}</Text>
        </Text>
        <View style={styles.themeContainer}>
          <View style={styles.themeCard}>
            <FontAwesome
              name="pencil-square-o"
              style={styles.cardIcon}
              size={20}
            />
            <View style={styles.themeTextContainer}>
              <Text style={styles.themeText}>Modifier mon profil</Text>
            </View>
          </View>
          <View style={styles.themeCard}>
            <FontAwesome name="star-o" style={styles.cardIcon} size={20} />
            <View style={styles.themeTextContainer}>
              <Text style={styles.themeText}>Mes parkings</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => handleLogout()}>
            <Text style={styles.btnText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2E3740",
    paddingTop: "20%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 30,
  },
  userName: {
    color: "#FC727B",
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
    borderWidth: "2px",
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
  btn: {
    position: "absolute",
    bottom: "4%",
    right: "5%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: "#FC727B",
  },
  btnText: {
    fontSize: 18,
  },
});
