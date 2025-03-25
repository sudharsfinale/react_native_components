import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import BouncyCheckBox from "@/components/BouncyCheckBox";

const BouncyCheckBoxContainer = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header headerTitle="Bouncy Checkbox" />
      <BouncyCheckBox />
    </View>
  );
};

export default BouncyCheckBoxContainer;
