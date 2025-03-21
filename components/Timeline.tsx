import { View, Text } from "react-native";
import React from "react";
const Dot = ({ color = "dodgerblue" }) => {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: color,
        borderRadius: 20 / 2,
      }}
    ></View>
  );
};
const Line = () => {
  return (
    <View style={{ width: 1, backgroundColor: "gray", height: "100%" }}></View>
  );
};
const DotAndLine = ({ dotColor = "dodgerblue" }) => {
  return (
    <View style={{ alignItems: "center", height: 100, flex: 0.1 }}>
      <Dot color={dotColor} />
      <Line />
    </View>
  );
};
const Timeline = () => {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Text style={{ flex: 0.2 }}>21 1</Text>
        <DotAndLine />
        <Text style={{ flex: 0.7 }}>Content 2</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Text style={{ flex: 0.2 }}>Content 1</Text>
        <DotAndLine />
        <Text style={{ flex: 0.7 }}>Content 2</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Text style={{ flex: 0.2 }}>Content 1</Text>
        <DotAndLine />
        <Text style={{ flex: 0.7 }}>Content 2</Text>
      </View>
    </View>
  );
};

export default Timeline;
