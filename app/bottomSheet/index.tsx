import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import BottomSheet from "@/components/BottomSheet";

const BottomSheetContainer = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header headerTitle="Bottom Sheet" />
      <View style={{ flex: 1 }}>
        <BottomSheet />
      </View>
    </View>
  );
};

export default BottomSheetContainer;
