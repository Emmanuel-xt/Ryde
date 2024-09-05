import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, customer } = await fetchAPI(
        "/(api)/(stripe)/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName || email.split("@")[0],
            email: email,
            amount: parseInt(amount) * 100, // Amount in cents
          }),
        }
      );

      console.log("API response:", { paymentIntent, customer });

      if (paymentIntent?.client_secret) {
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: paymentIntent.client_secret,
          merchantDisplayName: "Example, Inc.",
          customerId: customer,
          customFlow: false,
          allowsDelayedPaymentMethods: true,
        });

        if (error) {
          console.log("Error initializing payment sheet:", error);
          return { error };
        } else {
          return {};
        }
      } else {
        console.log("Invalid paymentIntent response:", paymentIntent);
        return { error: { message: "Invalid payment intent response." } };
      }
    } catch (error) {
      console.log("Error initializing payment sheet:", error);
      return { error: { message: "Failed to initialize payment sheet." } };
    }
  };

  const openPaymentSheet = async () => {
    const result = await initializePaymentSheet();

    // Check if result exists and has an error
    if (result && result.error) {
      Alert.alert("Initialization Error", result.error.message);
      return;
    }

    const { error: paymentError } = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className=""
        onPress={() => setSuccess(true)}
      />
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
