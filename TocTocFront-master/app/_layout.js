import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: true,
        headerTransparent: true,
        title: "",
      }}
    >
      <Stack.Screen name="index" options={{ headerBackVisible: false }} />
      <Stack.Screen
        name="homeScreen"
        options={{
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      
    </Stack>
  );
}
