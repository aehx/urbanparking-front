import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

// NAVIGATION

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// COMPONENTS

import Profilscreen from "./screens/profilscreens/Profilscreen";
import ParkingListScreen from "./screens/ParkingScreen/ParkingListScreen";
import Themescreen from "./screens/Themescreen";
import Homescreen from "./screens/ParkingScreen/Homescreen";
import Updatescreen from "./screens/profilscreens/Updatescreen";

// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import parking from "./reducers/parking";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user, parking });
const persistConfig = {
  key: "urbanparking",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TAB NAVIGATOR

const TabNavigator = (props) => {
  const theme = useSelector((state) => state.user.value.theme);

  // THEME

  let icon;
  if (theme) {
    icon = "#87BBDD";
  } else {
    icon = "#FC727B";
  }
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
        tabBarActiveTintColor: icon,
        tabBarInactiveTintColor: "#2E3740",
        headerShown: false,
      })}
      initialRouteName="Profil"
    >
      <Tab.Screen name="Themes" component={Themescreen} />
      <Tab.Screen name="Parkings" component={Homescreen} />
      <Tab.Screen name="Profil" component={Profilscreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="TabNavigator"
            >
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen
                name="ParkingListScreen"
                component={ParkingListScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
