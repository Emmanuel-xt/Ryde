import { View, Text, Image, Alert } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = React.useCallback(async () => {
    console.log("something was clicked");
    try {
      const result = await googleOAuth(startOAuthFlow);

      console.log("result =", result);

      if (result.code === "session exists") {
        Alert.alert("Success", "Session exists . Redirecting to Home Page");
        router.push;
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-1 bg-general-100" />
        <Text className="text-lg ">or</Text>
        <View className="flex-1 h-1 bg-general-100" />
      </View>
      <CustomButton
        title="Log in with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
