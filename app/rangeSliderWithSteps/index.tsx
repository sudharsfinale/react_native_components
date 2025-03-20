import { View, Text } from "react-native";
import React from "react";
import InputRange from "@/components/InputRange";

const RangeSliderWithSteps = () => {
  return (
    <View>
      <Text>RangeSliderWithSteps</Text>
      <InputRange
        min={1950}
        max={2000}
        title={"year"}
        steps={1}
        onValueChange={(value: any) => console.log(value)}
      />
    </View>
  );
};

export default RangeSliderWithSteps;
