// COMPONENT IMPORT

import Updatescreen from "./Updatescreen";
import FavParks from "./FavParks";
import axios from "axios";

// STYLE
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, addFavorite } from "../../reducers/user";

// PARENT OF Updatescreen/FAVPARKS

export default function Settings() {
  // REDUCER & DISPATCH

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);

  // STATE

  const [updateProfil, setUpdateProfil] = useState(false);
  const [favorisScreen, setFavorisScreen] = useState(false);

  // THEME

  let text;
  let bgCard;
  let border;
  let icon;
  let userText;
  let bgBtn;
  if (theme) {
    text = { color: "#333" };
    bgCard = { backgroundColor: "#DAE9F2" };
    bgBtn = { backgroundColor: "#87BBDD" };
    userText = { color: "#87BBDD" };
    icon = { color: "#87BBDD" };
    border = { borderColor: "#87BBDD" };
  }

  useEffect(() => {
    axios
      .get(
        `https://urbanparking-backend.vercel.app/users/favoris/${user.token}`
      )
      .then((response) => {
        if (response.data.favoris.length > 0) {
          dispatch(addFavorite(response.data.favoris));
        }
      });
  }, []);
  // FUNCTION

  const handleLogout = () => {
    dispatch(logout());
  };

  if (updateProfil) {
    return (
      <Updatescreen changeUpdateScreen={(state) => setUpdateProfil(state)} />
    );
  } else if (favorisScreen) {
    return <FavParks changeFavScreen={(state) => setFavorisScreen(state)} />;
  } else {
    return (
      <SafeAreaView style={[styles.globalContainer]}>
        <View style={[styles.container, bgCard]}>
          <Text style={[styles.title, text]}>
            Bonjour{" "}
            <Text style={[styles.userName, userText]}>{user.username}</Text>
          </Text>

          {/* UPDATE PROFIL */}

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn, border]}
              onPress={() => setUpdateProfil(true)}
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

            {/* FAVORITE */}

            <TouchableOpacity
              style={[styles.btn, border]}
              onPress={() => setFavorisScreen(true)}
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

  // HEADER

  title: {
    color: "#FFF",
    fontSize: 30,
  },
  userName: {
    color: "#FC727B",
  },

  // BTN CONTAINER

  btnContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "25%",
    width: "100%",
  },

  // BTN

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

  // TEXT

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
