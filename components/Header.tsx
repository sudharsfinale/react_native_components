import { View, Text, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
const Header = ({ headerTitle = "" }) => {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingTop: 12,
        paddingHorizontal: 10,
        backgroundColor: "white",
      }}
      onPress={() => router.back()}
    >
      <MaterialIcons name="keyboard-arrow-left" size={24} color="dodgerblue" />
      <Text style={{ color: "dodgerblue", fontSize: 20 }}>{headerTitle}</Text>
    </Pressable>
  );
};

export default Header;
