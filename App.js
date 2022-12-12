import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// NAVIGATION

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// COMPONENTS

import Profilscreen from "./screens/profilscreens/Profilscreen";
import Themescreen from "./screens/Themescreen";
import Homescreen from "./screens/Homescreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // TAB NAVIGATOR

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Parkings") {
              iconName = "map-o";
            } else if (route.name === "Themes") {
              iconName = "paint-brush";
            } else if (route.name === "Profil") {
              iconName = "user-o";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#e8be4b",
          tabBarInactiveTintColor: "#b2b2b2",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Themes" component={Themescreen} />
        <Tab.Screen name="Parkings" component={Homescreen} />
        <Tab.Screen name="Profil" component={Profilscreen} />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
