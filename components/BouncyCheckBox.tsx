import { View, Text } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const BouncyCheckBox = () => {
  return (
    <View style={{ padding: 25 }}>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unFillColor="#FFFFFF"
        text="Custom Checkbox"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={(isChecked: boolean) => {
          console.log(isChecked);
        }}
      />
    </View>
  );
};

export default BouncyCheckBox;
