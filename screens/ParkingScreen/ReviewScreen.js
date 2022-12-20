import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import ComParkCard from "./ReviewCard";
import PostReview from "./PostReview";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ComParkScreen(props) {
  const [reviewData, setReviewData] = useState(null);
  const [count, setCount] = useState(0);
  const [showPostReview, setShowPostReview] = useState(false);

  useEffect(() => {
    console.log("render");
    axios
      .get(`https://urbanparking-backend.vercel.app/review/all/${props.id}`)
      .then((response) => {
        if (response.data.review.length > 0) {
          setReviewData(response.data.review);
        }
      });
  }, [showPostReview, count]);

  let reviews;
  if (reviewData !== null) {
    reviews = reviewData.map((el, i) => {
      // console.log("______---______-_-_-------_______----", el);
      // console.log("______---______-_-_-------_______----", el.author.username);
      // console.log("______---______-_-_-------_______----", el.content);
      // console.log("______---______-_-_-------_______----", el.creation_Date);
      return (
        <ComParkCard
          name={el.author.username}
          content={el.content}
          date={el.creation_Date}
          key={i}
        />
      );
    });
  }

  const showComPage = () => {
    props.toggleComPage(false);
  };

  return (
    <Animated.View entering={SlideInDown} style={styles.container}>
      {showPostReview && (
        <PostReview
          togglePostReview={(state) => setShowPostReview(state)}
          id={props.id}
        />
      )}
      <View style={styles.header}>
        <View style={styles.icon}>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={{ color: "white" }}
            onPress={() => showComPage()}
          />
        </View>
        <Text style={styles.title}>Avis</Text>
        <View style={styles.icon}>
          <FontAwesome
            name="refresh"
            size={30}
            style={{ color: "white" }}
            onPress={() => setCount(count + 1)}
          />
        </View>
      </View>
      <View style={styles.ParkingsContainer}>
        <ScrollView style={styles.ScrollView}>{reviews}</ScrollView>
        <TouchableOpacity
          style={[styles.btn]}
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
  },
});
