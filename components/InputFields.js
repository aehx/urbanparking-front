import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { login } from "../redux/reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function InputFields(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);

  const [stepNumber, setStepNumber] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    city: "",
    address: "",
    postal: null,
  });

  const bg = theme && { backgroundColor: "#FFF" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };
  const border = theme && { borderColor: "#87BBDD" };

  const fields = (() => {
    switch (stepNumber) {
      case 0:
        return [styles.inputContainer, styles.inputContainer1];
      case 1:
        return [styles.inputContainer, styles.inputContainer2];
      case 2:
        return [styles.inputContainer, styles.inputContainer3];
    }
  })();

  const eyeIconForPassword = !showPassword ? "eye" : "eye-slash";

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sendUpdateForm = () => {
    if (userInfos.email && !EMAIL_REGEX.test(userInfos.email)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
      for (let value in userInfos) {
        if (!userInfos[value] || userInfos[value] === "") {
          delete userInfos[value];
        }
      }
      axios
        .put(
          `https://urbanparking-backend.vercel.app/users/update/${user.token}`,
          userInfos
        )
        .then((response) =>
          dispatch(
            login({
              token: response.data.token,
              username: response.data.username,
            })
          )
        );
    }
  };

  const sendSignupForm = () => {
    const checkFields = Object.entries(userInfos);
    const check = checkFields.forEach((field) => {
      if (field[1] === "" || field[1] === null) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
      }
    });

    if (!emptyFields && EMAIL_REGEX.test(userInfos.email)) {
      setShowPassword(false);
      axios
        .post("https://urbanparking-backend.vercel.app/users/signup", userInfos)
        .then((response) =>
          dispatch(
            login({
              token: response.data.token,
              username: response.data.username,
            })
          )
        );
    }
  };

  return (
    <View style={fields}>
      <View style={[styles.step, bgCard]}>
        <TextInput
          placeholder="Nom d'utilisateur"
          style={[styles.input, border, bg]}
          value={userInfos.username}
          onChangeText={(value) =>
            setUserInfos({ ...userInfos, username: value })
          }
        />
        <TextInput
          placeholder="E-mail"
          textContentType={"emailAddress"}
          keyboardType="email-address"
          style={[styles.input, border, bg]}
          value={userInfos.email}
          onChangeText={(value) => setUserInfos({ ...userInfos, email: value })}
        />
        {props.isSignupScreen && (
          <View style={styles.password}>
            <TextInput
              placeholder="** Mot de passe"
              secureTextEntry={!showPassword}
              textContentType={"password"}
              style={[styles.input, border]}
              value={userInfos.password}
              onChangeText={(value) =>
                setUserInfos({ ...userInfos, password: value })
              }
            />
            <FontAwesome
              name={eyeIconForPassword}
              size={25}
              style={styles.eye}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          </View>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => {
              setStepNumber(stepNumber + 1), props.stepNumberValue(1);
            }}
          >
            <Text style={styles.btnText}>suivant</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.step, bgCard]}>
        <TextInput
          placeholder="Prénom"
          textContentType={"name"}
          style={[styles.input, border, bg]}
          value={userInfos.firstname}
          onChangeText={(value) =>
            setUserInfos({ ...userInfos, firstname: value })
          }
        />
        <TextInput
          placeholder="Nom"
          textContentType={"familyName"}
          style={[styles.input, border, bg]}
          value={userInfos.lastname}
          onChangeText={(value) =>
            setUserInfos({ ...userInfos, lastname: value })
          }
        />
        <View style={[styles.btnContainer, styles.btnContainerMiddle]}>
          <TouchableOpacity
            style={[styles.btn, styles.btnMiddle, bgBtn]}
            onPress={() => {
              setStepNumber(stepNumber - 1), props.stepNumberValue(0);
            }}
          >
            <Text style={styles.btnText}>Precedent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnMiddle, bgBtn]}
            onPress={() => {
              setStepNumber(stepNumber + 1), props.stepNumberValue(2);
            }}
          >
            <Text style={styles.btnText}>suivant</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.step, bgCard]}>
        <TextInput
          placeholder="Ville"
          style={[styles.input, border, bg]}
          value={userInfos.city}
          onChangeText={(value) => setUserInfos({ ...userInfos, city: value })}
        />
        <TextInput
          placeholder="Adresse"
          style={[styles.input, border, bg]}
          value={userInfos.address}
          onChangeText={(value) =>
            setUserInfos({ ...userInfos, address: value })
          }
        />
        <TextInput
          placeholder="Code postal"
          textContentType={"postalCode"}
          keyboardType="phone-pad"
          style={[styles.input, border, bg]}
          value={userInfos.postal}
          onChangeText={(value) =>
            setUserInfos({ ...userInfos, postal: value })
          }
        />

        <View style={styles.btnContainer}>
          {isValidEmail && <Text style={styles.mailError}>email invalide</Text>}
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => {
              setStepNumber(stepNumber - 1), props.stepNumberValue(1);
            }}
          >
            <Text style={styles.btnText}>Precedent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() =>
              props.isSignupScreen ? sendSignupForm() : sendUpdateForm()
            }
          >
            <Text style={styles.btnText}>valider le formulaire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer1: {
    justifyContent: "flex-start",
  },
  inputContainer2: {
    justifyContent: "center",
  },
  inputContainer3: {
    justifyContent: "flex-end",
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
  step: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E3740",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#FC727B",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  mailError: {
    fontSize: 18,
    color: "#990000",
    fontWeight: "bold",
  },
  btnContainerMiddle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnMiddle: {
    width: "40%",
    margin: 10,
    marginTop: "15%",
  },
  password: {
    alignItems: "center",
    width: "100%",
  },
  eye: {
    position: "absolute",
    top: 9,
    right: "20%",
  },
});
