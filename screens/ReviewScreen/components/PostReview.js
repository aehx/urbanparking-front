import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ComParkScreen(props) {
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.user.value.theme);
  const [reviewContent, setReviewContent] = useState("");

  const showPostReview = () => {
    props.togglePostReview(false);
  };

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };
  const border = theme && { borderColor: "#87BBDD", borderWidth: 3 };

  const postReview = () => {
    axios.post("https://urbanparking-backend.vercel.app/review/postReview", {
      token: user.token,
      content: reviewContent,
      parking: props.id,
    });
    props.togglePostReview(false);
  };

  return (
    <Animated.View entering={SlideInDown} style={[styles.container]}>
      <View style={[styles.header, bgCard]}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={[{ color: "white" }, text]}
            onPress={() => showPostReview()}
          />
        </View>
        <Text style={[styles.title, text]}>Votre avis</Text>
      </View>
      {user.token ? (
        <View style={[styles.ParkingsContainer, bgCard]}>
          <TextInput
            placeholder="Votre avis..."
            multiline={true}
            numberOfLines={10}
            onChangeText={(e) => setReviewContent(e)}
            value={reviewContent}
            style={[styles.reviewInput, border]}
          />
          <TouchableOpacity
            style={[styles.btn, bgBtn]}
            onPress={() => postReview()}
          >
            <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
            <Text style={{ fontWeight: "bold", color: "#2E3740" }}>
              Envoyer
            </Text>
            <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.ParkingsContainer, bgCard]}>
          <Text
            style={[{ color: "white", fontSize: 17, fontWeight: "bold" }, text]}
          >
            Inscrivez-vous pour commenter !
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    backgroundColor: "#2E3740",
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
  ParkingsContainer: {
    width: "90%",
    height: "80%",
    justifycontent: "center",
    alignItems: "center",
    backgroundColor: "#2E3740",
  },
  btn: {
    flexDirection: "row",
    backgroundColor: "#FC727B",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  reviewInput: {
    width: "80%",
    height: "20%",
    padding: 15,
    borderRadius: 15,
    fontSize: 18,
    backgroundColor: "white",
    marginVertical: 50,
  },
});
