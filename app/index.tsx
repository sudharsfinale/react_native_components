import ItemSeperatorComponent from "@/components/ItemSeperatorComponent";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
  const components = [
    { componentName: "Range Slider", path: "rangeSlider" },
    { componentName: "Range Slider With Steps", path: "rangeSliderWithSteps" },
    { componentName: "TimeLine", path: "timeline" },
    { componentName: "Bouncy Checkbox", path: "bouncy_checkbox" },
    { componentName: "Custom Accordion", path: "accordion" },
    { componentName: "BottomSheet", path: "bottomSheet" },
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
        ItemSeparatorComponent={() => <ItemSeperatorComponent />}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 0.5,
                elevation: 5,
              }}
              onPress={() => {
                //@ts-ignore
                router.push(`/${item.path}`);
              }}
            >
              <Text style={{ fontSize: 16 }}>{item.componentName}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}
