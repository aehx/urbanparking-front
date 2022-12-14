import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function ComParkCard(props) {
  const x = new Date(props.date);

  const theme = useSelector((state) => state.user.value.theme);
  //  Date

  const day = x.getDate();
  const month = x.getMonth();
  const monthformat = month < 10 ? "0" + month : month;
  const year = x.getFullYear();
  const newDate = `${day}/${monthformat}/${year}`;

  // THEME

  let border;
  if (theme) {
    border = { borderColor: "#87BBDD" };
  }
  return (
    <View style={[styles.container, border]}>
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="user" size={20} style={{ marginRight: 10 }} />
          <Text style={[styles.cardUserInfo, { fontWeight: "bold" }]}>
            {props.name}
          </Text>
        </View>

        <Text style={styles.cardUserInfo}>{newDate}</Text>
      </View>
      <View style={styles.cardBorderContainer}>
        <View style={styles.cardBorder}></View>
      </View>
      <Text style={styles.cardUserContent}>{props.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 3,
    borderColor: "#FC727B",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    minHeight: 110,
    marginBottom: 20,
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardUserInfo: {
    color: "#2E3740",
    fontSize: 16,
  },
  cardBorderContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  cardBorder: {
    height: 2,
    width: "50%",
    backgroundColor: "#2E3740",
  },
  cardUserContent: {
    color: "#2E3740",
    fontSize: 16,
    overflow: "scroll",
  },
});
