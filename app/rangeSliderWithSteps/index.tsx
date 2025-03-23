import { View, Text } from "react-native";
import React from "react";
import InputRange from "@/components/InputRange";
import Header from "@/components/Header";

const RangeSliderWithSteps = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerTitle="Range Slider(with steps)" />
      <InputRange
        min={1950}
        max={2000}
        title={"Sample Range Slider"}
        steps={1}
        onValueChange={(value: any) => console.log(value)}
      />
    </View>
  );
};

export default RangeSliderWithSteps;
