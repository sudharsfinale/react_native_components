import { View, Text } from "react-native";
import React, { useState } from "react";
import { RangeSlider } from "@/components/RangeSlider";

const RangeSliderContainer = () => {
  const [values, setValues] = useState<[number, number]>([25, 75]);
  return (
    <View>
      <Text style={{ color: "dodgerblue", padding: 25 }}>
        RangeSliderContainer
      </Text>
      <View
        style={{
          alignItems: "center",
          marginVertical: 12,
          marginHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <RangeSlider
          min={0}
          max={1000}
          step={1}
          onValueChange={setValues}
          width={300}
          activeColor="#cc0000"
          inactiveColor="#E0E0E0"
          thumbColor="#FFFFFF"
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginHorizontal: 32,
        }}
      >
        <View
          style={{ borderWidth: 1, paddingHorizontal: 12, paddingVertical: 4 }}
        >
          <Text>{values[0]}</Text>
        </View>
        <View
          style={{ borderWidth: 1, paddingHorizontal: 12, paddingVertical: 4 }}
        >
          <Text>{values[1]}</Text>
        </View>
      </View>
    </View>
  );
};

export default RangeSliderContainer;
