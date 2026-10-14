import { Tabs } from "expo-router";
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#a187d7",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: "Camera",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
}

<Tabs
  screenOptions={{
    tabBarActiveTintColor: "#7841e7",
    headerStyle: {
      backgroundColor: "#3e7ecc",
    },
    headerShadowVisible: false,
    headerTintColor: "#ceb745",
    tabBarStyle: {
      backgroundColor: "#9b5b49",
    },
  }}
></Tabs>;
