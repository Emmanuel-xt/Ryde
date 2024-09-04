import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";

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
    <View>
      <Text className="text-2xl ">You are here {userAddress}</Text>
      <Text className="text-2xl ">You are here {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
