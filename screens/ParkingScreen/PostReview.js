import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ComParkScreen(props) {
  const user = useSelector((state) => state.user.value);
  const [reviewContent, setReviewContent] = useState("");

  const showPostReview = () => {
    props.togglePostReview(false);
  };

  const postReview = () => {
    axios
      .post("https://urbanparking-backend.vercel.app/review/post", {
        token: user.token,
        content: reviewContent,
        parking: props.id,
      })
      .then((response) => console.log(response.data));
    props.togglePostReview(false);
  };

  return (
    <Animated.View entering={SlideInDown} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={{ color: "white" }}
            onPress={() => showPostReview()}
          />
        </View>
        <Text style={styles.title}>Votre avis</Text>
      </View>
      <View style={styles.ParkingsContainer}>
        <TextInput
          placeholder="Votre avis..."
          multiline={true}
          numberOfLines={4}
          onChangeText={(e) => setReviewContent(e)}
          value={reviewContent}
          style={styles.reviewInput}
        />
        <TouchableOpacity style={[styles.btn]} onPress={() => postReview()}>
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
          <Text style={{ fontWeight: "bold", color: "#2E3740" }}>Envoyer</Text>
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
        </TouchableOpacity>
      </View>
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

  //   HEADER

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
