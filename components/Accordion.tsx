import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

export function Accordion({
  title,
  children,
  initiallyExpanded = false,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [contentHeight, setContentHeight] = useState(0);

  const animatedStyle = useAnimatedStyle(() => {
    const height = withTiming(isExpanded ? contentHeight : 0, {
      duration: 300,
    });

    return {
      height,
      opacity: withTiming(isExpanded ? 1 : 0, { duration: 200 }),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const rotation = withTiming(isExpanded ? 180 : 0, { duration: 300 });
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={iconStyle}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.content, animatedStyle]}>
        <View
          style={styles.measureContainer}
          onLayout={(event) => {
            setContentHeight(event.nativeEvent.layout.height);
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    overflow: "hidden",
  },
  measureContainer: {
    position: "absolute",
    width: "100%",
    padding: 16,
    paddingTop: 0,
  },
});
