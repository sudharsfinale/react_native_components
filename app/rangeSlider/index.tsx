import { View, Text } from "react-native";
import React, { useState } from "react";
import { RangeSlider } from "@/components/RangeSlider";
import Header from "@/components/Header";

const RangeSliderContainer = () => {
  const [values, setValues] = useState<[number, number]>([25, 75]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header headerTitle="Range Slider" />
      <View
        style={{
          alignItems: "center",
          flex: 1,
          marginVertical: 12,
          marginHorizontal: 20,
          justifyContent: "center",
          gap: 16,
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
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginHorizontal: 32,
            width: "100%",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            <Text>{values[0]}</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            <Text>{values[1]}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RangeSliderContainer;
