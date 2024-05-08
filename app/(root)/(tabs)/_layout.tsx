import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { setBackgroundMessageHandler } from "@/providers/PushNotificationsProvider";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  
  return (
    <Tabs
      initialRouteName="one"
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message tab",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
