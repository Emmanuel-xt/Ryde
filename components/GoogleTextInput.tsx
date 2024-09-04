import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  handleGoPress,
}: GoogleInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleManualInput = () => {
    // Split input into latitude and longitude, and convert to float
    const [latitudeStr, longitudeStr] = inputValue.split(",");
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    // Check if both latitude and longitude are valid numbers
    if (!isNaN(latitude) && !isNaN(longitude)) {
      handleGoPress({
        latitude,
        longitude,
        address: `Manual Input: ${latitude}, ${longitude}`,
      });
    } else {
      Alert.alert(
        "Invalid Input",
        "Please enter valid coordinates in the format 'latitude,longitude'."
      );
    }
  };

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
          onChangeText: (text) => setInputValue(text), // Capture input value
        }}
        renderRightButton={() => (
          <TouchableOpacity onPress={handleManualInput}>
            <Text className="bg-blue-600 text-white text-lg p-1 rounded-full">
              Go
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GoogleTextInput;
