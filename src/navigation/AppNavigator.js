import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import delle schermate
import ProfileAbout from "../screens/ProfileAbout";

import DatiUtente from "../screens/DatiUtente";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EventsMapScreen from "../screens/EventsMapScreen";
import EventsListScreen from "../screens/EventsListScreen";
import CreateReportScreen from "../screens/CreateReportScreen";
import WeatherBulletinScreen from "../screens/WeatherBulletinScreen";
import CommunicationsScreen from "../screens/CommunicationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AggiornaContatti from "../screens/AggiornaContatti";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfiloStack = createStackNavigator();

// Stack annidato per Profilo + DatiUtente
function ProfiloStackScreen() {
  return (
    <ProfiloStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfiloStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfiloStack.Screen name="DatiUtente" component={DatiUtente} />
      <ProfiloStack.Screen name="ProfileAbout" component={ProfileAbout} />

      <ProfiloStack.Screen
        name="AggiornaContatti"
        component={AggiornaContatti}
      />
    </ProfiloStack.Navigator>
  );
}

function EventiStackScreen({ route }) {
  const anonymous = route.params?.anonymous || false;

  return (
    <ProfiloStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfiloStack.Screen
        name="EventsMapScreen"
        component={EventsMapScreen}
        initialParams={{ anonymous }}
      />
      <ProfiloStack.Screen
        name="EventsListScreen"
        component={EventsListScreen}
        initialParams={{ anonymous }} //passa modalita anonima alla schermata event list screen
      />
    </ProfiloStack.Navigator>
  );
}

// Tab navigator principale
function MainTabNavigator({ route }) {
  const anonymous = route.params?.anonymous || false;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "EventsMapScreen") {
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
        name="Mappa"
        component={EventiStackScreen}
        initialParams={{ anonymous }} //passa modalita anonima alla schermata mappa
        options={{
          title: "Eventi",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
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
        component={ProfiloStackScreen}
        options={{
          title: "Profilo",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
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
          header2Style: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="CreateReportScreen"
          component={CreateReportScreen}
          options={{
            title: "CreateReportScreen",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Protezione Civile Calabria",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ title: "...", headerShown: false }}
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
          name="EventsMapScreen"
          component={EventsMapScreen}
          options={{ title: "Mappa Eventi", headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
