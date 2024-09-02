import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Home = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // if (!isLoaded) {
  //   return <Text>Loading...</Text>;
  // }

  // if (isSignedIn) {
  //   return <Redirect href="/(root)/(tabs)/home" />;
  // }

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
