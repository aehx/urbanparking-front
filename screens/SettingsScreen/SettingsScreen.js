import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, addFavorite } from "../../redux/reducers/user";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import UpdateProfileScreen from "../ProfileScreen/UpdateProfileScreen";
import FavoriteScreen from "../FavoriteScreen/FavoriteScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);
  console.log(user);
  const [showUpdateProfilScreen, setShowUpdateProfilScreen] = useState(false);
  const [showFavoritesScreen, setShowFavoritesScreen] = useState(false);

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };
  const userText = theme && { color: "#87BBDD" };
  const icon = theme && { color: "#87BBDD" };
  const border = theme && { borderColor: "#87BBDD" };

  useEffect(() => {
    axios
      .get(
        `https://urbanparking-backend.vercel.app/users/favoris/${user.token}`
      )
      .then((response) => {
        // console.log(response.data);
        if (response.data.favoris.length > 0) {
          dispatch(addFavorite(response.data.favoris));
        }
      });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (showUpdateProfilScreen) {
    return (
      <UpdateProfileScreen
        changeUpdateScreen={(state) => setShowUpdateProfilScreen(state)}
      />
    );
  } else if (showFavoritesScreen) {
    return (
      <FavoriteScreen
        changeFavScreen={(state) => setShowFavoritesScreen(state)}
      />
    );
  } else {
    return (
      <SafeAreaView style={[styles.globalContainer]}>
        <View style={[styles.container, bgCard]}>
          <Text style={[styles.title, text]}>
            Bonjour{" "}
            <Text style={[styles.userName, userText]}>{user.username}</Text>
          </Text>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn, border]}
              onPress={() => setShowUpdateProfilScreen(true)}
            >
              <FontAwesome
                name="pencil-square-o"
                style={[styles.cardIcon, icon]}
                size={20}
              />
              <View style={styles.btnText}>
                <Text style={styles.text}>Modifier mon profil</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, border]}
              onPress={() => setShowFavoritesScreen(true)}
            >
              <FontAwesome
                name="star-o"
                style={[styles.cardIcon, icon]}
                size={20}
              />
              <View style={styles.btnText}>
                <Text style={styles.text}>Mes parkings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnLogout, bgBtn]}
              onPress={() => handleLogout()}
            >
              <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
  btnContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "25%",
    width: "100%",
  },
  btn: {
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
  btnText: {
    flex: 1,
    paddingLeft: "15%",
    height: "100%",
    justifyContent: "center",
    fontSize: 19,
  },
  text: {
    fontSize: 18,
    color: "#2E3740",
  },
  btnLogout: {
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
  logoutText: {
    fontSize: 18,
  },
});
