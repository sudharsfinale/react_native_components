import { View, Text, StyleSheet, Button } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
const BottomSheetC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "100%"], []);
  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
  };
  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const snapToIndex = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };
  return (
    <View style={styles.container}>
      <Button title="Open" onPress={() => handleOpenSheet()} />
      <Button title="Close" onPress={() => handleCloseSheet()} />
      <Button title="Snap to 0" onPress={() => snapToIndex(0)} />
      <Button title="Snap to 1" onPress={() => snapToIndex(1)} />
      <Button title="Snap to 2" onPress={() => snapToIndex(2)} />
      <Button title="Snap to 3" onPress={() => snapToIndex(3)} />
      <BottomSheet
        enablePanDownToClose
        index={1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        backgroundStyle={{ backgroundColor: "rgb(0, 24, 67)" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            Awesome 🎉
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(243, 243, 243)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
export default BottomSheetC;
