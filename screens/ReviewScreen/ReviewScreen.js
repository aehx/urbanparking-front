import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from "react-native";
import ComParkCard from "./components/ReviewCard";
import PostReview from "./components/PostReview";
import Animated, { SlideInDown } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ReviewScreen(props) {
  const theme = useSelector((state) => state.user.value.theme);

  const [reviewData, setReviewData] = useState(null);
  const [refreshPage, setRefreshPage] = useState(0);
  const [showPostReview, setShowPostReview] = useState(false);

  const text = theme && { color: "#333" };
  const bgCard = theme && { backgroundColor: "#DAE9F2" };
  const bgBtn = theme && { backgroundColor: "#87BBDD" };

  useEffect(() => {
    axios
      .get(`https://urbanparking-backend.vercel.app/review/all/${props.id}`)
      .then((response) => {
        if (response.data.review && response.data.review.length > 0) {
          setReviewData(response.data.review);
        }
      });
  }, [refreshPage]);

  const reviews =
    reviewData !== null &&
    reviewData.map((el, i) => {
      return (
        <ComParkCard
          name={el.author.username}
          content={el.content}
          date={el.creation_Date}
          key={i}
        />
      );
    });

  const leaveReviewScreen = () => {
    props.toggleReviewScreen(false);
  };

  return (
    <Animated.View entering={SlideInDown} style={styles.container}>
      {showPostReview && (
        <PostReview
          togglePostReview={(state) => setShowPostReview(state)}
          id={props.id}
        />
      )}
      <View style={[styles.header, bgCard]}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={[{ color: "white" }, text]}
            onPress={() => leaveReviewScreen()}
          />
        </View>
        <Text style={[styles.title, text]}>Avis</Text>
        <View style={styles.icon}>
          <FontAwesome
            name="refresh"
            size={25}
            style={[{ color: "white" }, text]}
            onPress={() => setRefreshPage(refreshPage + 1)}
          />
        </View>
      </View>
      <View style={[styles.ParkingsContainer, bgCard]}>
        <ScrollView style={styles.ScrollView}>{reviews}</ScrollView>
        <TouchableOpacity
          style={[styles.btn, bgBtn]}
          onPress={() => setShowPostReview(true)}
        >
          <FontAwesome name="wechat" size={20} style={{ color: "#2E3740" }} />
          <Text style={{ fontWeight: "bold", color: "#2E3740" }}>
            Commenter
          </Text>
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
    height: "105%",
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
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  ParkingsContainer: {
    width: "100%",
    height: "80%",
    justifycontent: "center",
    alignItems: "center",
    backgroundColor: "#2E3740",
  },
  ScrollView: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
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
    marginBottom: "15%",
  },
});
