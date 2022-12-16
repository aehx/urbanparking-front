import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Favoritescreen({ navigation }) {
  // DELETE PARKINGS FROM FAVORITES

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("Profilscreen");
            }}
          />
        </View>
        <Text style={styles.mainTitle}>Mes Favoris</Text>
      </View>

      <View style={styles.favoriteInfo}>
        <View style={styles.trash}>
          <FontAwesome
            name="trash-o"
            size={30}
            color="#2E3740"
            // onPress={() => {}} // DELETE THIS PARKING BY PRESSING THE TRASH ICON
          />
        </View>
        <View style={styles.favoriteContainer}>
          <Text style={styles.favoriteTitle}>Nom du Favoris</Text>
          <Text style={styles.favoriteText}>Adresse du Favoris</Text>
        </View>
        <View style={styles.angleRight}>
          <FontAwesome
            name="angle-right"
            size={30}
            color="#2E3740"
            // onPress={() => {navigation.navigate("");}} // GOING TO FAVORITE PARKING INFOS SCREEN BY PRESSING THE ANGLE-RIGHT ICON
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER

  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: "15%",
    alignItems: "center",
    backgroundColor: "#2E3740",
  },

  // HEADER

  header: {
    flexDirection: "row",
    height: "17%",
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginHorizontal: "1%",
    marginBottom: 5,
    justifyContent: "space-evenly",
  },

  icon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  mainTitle: {
    width: 200,
    height: 40,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
  },

  // FAVORITE INFO (white board)

  favoriteInfo: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "white",
    height: "15%",
    width: "90%",
    padding: 3,
    marginBottom: 200,
    borderRadius: 5,
    justifyContent: "space-between",
  },

  trash: {
    backgroundColor: "white",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteContainer: {
    backgroundColor: "white",
    height: "100%",
    width: "70%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  angleRight: {
    backgroundColor: "white",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

/* import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

// HELENE FRONT créer un "update" dans reducers ? ⬇️
import { login } from "../../reducers/user";

import { useState } from "react";
import axios from "axios";

export default function Updatescreen({ navigation }) {
  const dispatch = useDispatch();

  //   INPUT USESTATE

  const [emptyFields, setEmptyFields] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  //   USER
  const user = useSelector((state) => state.user.value);

  //  NEWUSER/SETNEWUSER BEFORE ⬇️

  const [newUserUpdate, setNewUserUpdate] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // SAVE THE NEW INFORMATIONS WHICH HAVE BEEN UPDATED

  const formSubmit = () => {
    // CHECK FIELDS EMPTY OR NOT

    const checkFields = Object.entries(newUser);
    const check = checkFields.forEach((field) => {
      if (field[1] === "" || field[1] === null) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
      }
    });

    // PUSH IN DB IF MAIL & NOT EMPTY field ------- // NEWUSERUPDATE INSTEAD OF NEWUSER ⬇️
    if (!emptyFields && EMAIL_REGEX.test(newUserUpdate.email)) {
      setShowPassword(false);
      axios
        .post(
          "https://urbanparking-backend.vercel.app/users/signup",
          newUserUpdate
        )
        .then((response) =>
          dispatch(
            // CHANGER LOGIN PAR "UPDATE" DANS REDUCER ?? ⬇️
            login({
              token: response.data.token,
              username: response.data.username,
            })
          )
        );
    }
  };

  //   PASSWORD SHOW/DON'T SHOW

  let eye;
  if (!showPassword) {
    eye = "eye-slash";
  } else {
    eye = "eye";
  }

  // EVERY NEWUSER AND SETNEWUSER HAVE BEEN CHANGED FOR NEWUSERUPDATE AND SETNEWUSERUPDATE ⬇️

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("Profilscreen");
            }}
          />
        </View>
        <Text style={styles.mainTitle}>Mes Informations</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              placeholder="Prénom"
              textContentType={"name"}
              style={styles.input}
              value={newUserUpdate.firstname}
              onChangeText={(value) =>
                setNewUserUpdate({ ...newUserUpdate, firstname: value })
              }
            />
          </View>
          <View>
            <TextInput
              placeholder="Nom"
              textContentType={"familyName"}
              style={styles.input}
              value={newUserUpdate.lastname}
              onChangeText={(value) =>
                setNewUserUpdate({ ...newUserUpdate, lastname: value })
              }
            />
          </View>
          <View>
            <TextInput
              placeholder="E-mail"
              textContentType={"emailAddress"}
              keyboardType="email-address"
              style={styles.input}
              value={newUserUpdate.email}
              onChangeText={(value) =>
                setNewUserUpdate({ ...newUserUpdate, email: value })
              }
            />
          </View>
          <View>
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry={showPassword}
              textContentType={"password"}
              style={styles.input}
              value={newUserUpdate.password}
              onChangeText={(value) =>
                setNewUserUpdate({ ...newUserUpdate, password: value })
              }
            />
            <FontAwesome
              name={eye}
              size={25}
              style={styles.eye}
              color={"#FC727B"}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Nom d'utilisateur"
              style={styles.input}
              value={newUserUpdate.username}
              onChangeText={(value) =>
                setNewUserUpdate({ ...newUserUpdate, username: value })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Enregistrer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => formSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER

  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingTop: "8%",
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3740",
    alignItems: "center",
  },

  // HEADER

  header: {
    flexDirection: "row",
    height: "18%",
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: "space-evenly",
    backgroundColor: "#2E3740",
  },
  icon: {
    width: 50,
    height: 50,
  },
  mainTitle: {
    display: "flex",
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
  },

  //   INPUT CONTAINER

  inputContainer: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#2E3740",
    padding: 5,
  },

  input: {
    borderWidth: 2,
    borderColor: "#FC727B",
    backgroundColor: "#eee",
    width: 250,
    fontSize: 16,
    padding: 8,
    marginBottom: "7%",
    borderRadius: 15,
    justifyContent: "space-evenly",
  },

  eye: {
    position: "absolute",
    top: 12,
    right: "10%",
  },

  // FOOTER

  footer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#2E3740",
    width: "auto",
  },

  btnText: {
    backgroundColor: "#FC727B",
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
*/
