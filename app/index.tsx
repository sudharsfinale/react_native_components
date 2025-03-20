import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Index() {
  const components = [
    { componentName: "Range Slider", path: "rangeSlider" },
    { componentName: "Range Slider With Steps", path: "rangeSliderWithSteps" },
  ]; //path name should match the folder name
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 12,
      }}
    >
      <Text
        style={{
          marginVertical: 12,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        React Native Components
      </Text>
      <FlatList
        data={components}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{ padding: 12, borderColor: "lightblue", borderWidth: 1 }}
              onPress={() => {
                //@ts-ignore
                router.push(`/${item.path}`);
              }}
            >
              <Text>{item.componentName}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
