import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ViewProfileScreen from "../../screens/ProfileScreen/ViewProfileScreen";
import ThemeScreen from "../../screens/ThemeScreen/ThemeScreen";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";

const TabNavigator = (props) => {
  const Tab = createBottomTabNavigator();
  const theme = useSelector((state) => state.user.value.theme);
  const icon = theme ? "#87BBDD" : "#FC727B";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case "Parkings":
                return "map-o";
              case "Themes":
                return "paint-brush";
              case "Profil":
                return "user-o";
              default:
                return "";
            }
          })();

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: icon,
        tabBarInactiveTintColor: "#2E3740",
        headerShown: false,
      })}
      initialRouteName="Profil"
    >
      <Tab.Screen name="Themes" component={ThemeScreen} />
      <Tab.Screen name="Parkings" component={HomeScreen} />
      <Tab.Screen name="Profil" component={ViewProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
