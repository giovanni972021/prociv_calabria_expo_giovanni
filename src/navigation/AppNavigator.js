import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import delle schermate (da creare)
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EventsMapScreen from "../screens/EventsMapScreen";
import EventsListScreen from "../screens/EventsListScreen";
import CreateReportScreen from "../screens/CreateReportScreen";
import WeatherBulletinScreen from "../screens/WeatherBulletinScreen";
import CommunicationsScreen from "../screens/CommunicationsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navigazione principale con tab
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Eventi") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Segnala") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Bollettino") {
            iconName = focused ? "cloud" : "cloud-outline";
          } else if (route.name === "Comunicazioni") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Profilo") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Eventi"
        component={EventsMapScreen}
        options={{
          title: "Eventi",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Segnala"
        component={CreateReportScreen}
        options={{ title: "Segnala", headerShown: false }}
      />
      <Tab.Screen
        name="Bollettino"
        component={WeatherBulletinScreen}
        options={{ title: "Bollettino", headerShown: false }}
      />
      <Tab.Screen
        name="Comunicazioni"
        component={CommunicationsScreen}
        options={{ title: "Comunicazioni", headerShown: false }}
      />
      <Tab.Screen
        name="Profilo"
        component={ProfileScreen}
        options={{ title: "Profilo", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Navigazione principale dell'app
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF6B35",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Protezione Civile Calabria",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Accedi", headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Registrati", headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventsList"
          component={EventsListScreen}
          options={{ title: "Lista Eventi" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
