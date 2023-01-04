import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ProgressBar(props) {
  const theme = useSelector((state) => state.user.value.theme);
  const bgBtn = theme && { backgroundColor: "#87BBDD" };

  const barInsideStyle = (() => {
    switch (props.step) {
      case 0:
        return [styles.progressBarInside, { width: 0 }];
      case 1:
        return [styles.progressBarInside, { width: "50%" }, bgBtn];
      case 2:
        return [styles.progressBarInside, { width: "100%" }, bgBtn];
    }
  })();

  const circle2Style = (() => {
    switch (props.step) {
      case 0:
        return { display: "none" };
      case 1:
        return [
          styles.progressBarCircleInside,
          styles.circle2Inside,
          { right: -6 },
        ];
      case 2:
        return [styles.progressBarCircleInside, styles.circle2Inside];
    }
  })();

  const circle3Style = (() => {
    switch (props.step) {
      case 0:
        return { display: "none" };
      case 2:
        return [styles.progressBarCircleInside, styles.circle3Inside];
    }
  })();

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBarEmpty}>
        <View style={[styles.progressBarCircle, styles.circle1]}></View>
        <View style={[styles.progressBarCircle, styles.circle2]}></View>
        <View style={[styles.progressBarCircle, styles.circle3]}></View>
        <View style={barInsideStyle}>
          <View
            style={[
              styles.progressBarCircleInside,
              styles.circle1Inside,
              bgBtn,
            ]}
          ></View>
          <View style={[circle2Style, bgBtn]}></View>
          <View style={[circle3Style, bgBtn]}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  progressBarEmpty: {
    borderWidth: 1.5,
    borderColor: "#333",
    height: 10,
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
  },
  progressBarInside: {
    position: "absolute",
    top: 1,
    left: 0,
    alignItems: "center",
    backgroundColor: "#FC727B",
    height: 4,
    transition: "all 2s ease-in-out",
  },
  progressBarCircle: {
    position: "absolute",
    borderRadius: "50%",
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#333",
  },
  circle1: {
    top: -7,
    left: -10,
  },
  circle2: {
    top: -7,
  },
  circle3: {
    top: -7,
    right: -10,
  },
  progressBarCircleInside: {
    position: "absolute",
    borderRadius: "50%",
    width: 12,
    height: 12,
    backgroundColor: "#FC727B",
  },
  circle1Inside: {
    top: "-100%",
    left: -6,
  },
  circle2Inside: {
    top: "-100%",
  },
  circle3Inside: {
    top: "-100%",
    right: -6,
  },
});
