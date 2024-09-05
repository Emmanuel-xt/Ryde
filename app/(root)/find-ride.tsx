import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  console.log("user address", userAddress);
  console.log("destination address", destinationAddress);
  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View className="my-3 ">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
          handleGoPress={() => ({})}
        />
      </View>
      <View className="my-3 ">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transperent"
          handlePress={(location) => setDestinationLocation(location)}
          handleGoPress={() => ({})}
        />
      </View>

      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-ride")}
      />
    </RideLayout>
  );
};

export default FindRide;
