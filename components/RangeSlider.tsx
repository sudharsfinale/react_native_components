import { StyleSheet, View, I18nManager } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  width?: number;
  height?: number;
  onValueChange?: (values: [number, number]) => void;
  thumbSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  width = 300,
  height = 6,
  onValueChange,
  thumbSize = 24,
  activeColor = "#007AFF",
  inactiveColor = "#E0E0E0",
  thumbColor = "#FFFFFF",
}: RangeSliderProps) {
  const isRTL = I18nManager.isRTL;
  const leftPosition = useSharedValue(isRTL ? width - thumbSize : 0);
  const rightPosition = useSharedValue(isRTL ? 0 : width - thumbSize);
  const isLeftSliding = useSharedValue(false);
  const isRightSliding = useSharedValue(false);

  const clamp = (value: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
  };

  const getValueFromPosition = (position: number) => {
    "worklet";
    let percentage = position / (width - thumbSize);
    if (isRTL) {
      percentage = 1 - percentage;
    }
    const range = max - min;
    return min + Math.round((range * percentage) / step) * step;
  };

  const leftGesture = Gesture.Pan()
    .onBegin(() => {
      isLeftSliding.value = true;
    })
    .onUpdate((e) => {
      const newPosition = clamp(
        e.absoluteX - thumbSize / 2,
        0,
        isRTL ? width - thumbSize : rightPosition.value - thumbSize
      );
      leftPosition.value = newPosition;

      if (onValueChange) {
        const leftValue = getValueFromPosition(newPosition);
        const rightValue = getValueFromPosition(rightPosition.value);
        runOnJS(onValueChange)(
          isRTL ? [rightValue, leftValue] : [leftValue, rightValue]
        );
      }
    })
    .onFinalize(() => {
      isLeftSliding.value = false;
    });

  const rightGesture = Gesture.Pan()
    .onBegin(() => {
      isRightSliding.value = true;
    })
    .onUpdate((e) => {
      const newPosition = clamp(
        e.absoluteX - thumbSize / 2,
        isRTL ? leftPosition.value + thumbSize : 0,
        width - thumbSize
      );
      console.log(newPosition);
      rightPosition.value = newPosition;

      if (onValueChange) {
        const leftValue = getValueFromPosition(leftPosition.value);
        const rightValue = getValueFromPosition(newPosition);
        runOnJS(onValueChange)(
          isRTL ? [rightValue, leftValue] : [leftValue, rightValue]
        );
      }
    })
    .onFinalize(() => {
      isRightSliding.value = false;
    });

  const leftThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(leftPosition.value, {
            damping: 20,
            stiffness: 500,
          }),
        },
      ],
      scale: withSpring(isLeftSliding.value ? 1.2 : 1),
    };
  });

  const rightThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(rightPosition.value, {
            damping: 20,
            stiffness: 500,
          }),
        },
      ],
      scale: withSpring(isRightSliding.value ? 1.2 : 1),
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    const start = isRTL ? rightPosition.value : leftPosition.value;
    const end = isRTL ? leftPosition.value : rightPosition.value;
    return {
      left: start + thumbSize / 2,
      width: end - start,
    };
  });
  return (
    <View style={[styles.container, { width, height: thumbSize }]}>
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: inactiveColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.progress,
            {
              height,
              backgroundColor: activeColor,
            },
            progressStyle,
          ]}
        />
      </View>
      <GestureDetector gesture={leftGesture}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              backgroundColor: thumbColor,
            },
            leftThumbStyle,
          ]}
        />
      </GestureDetector>
      <GestureDetector gesture={rightGesture}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              backgroundColor: thumbColor,
            },
            rightThumbStyle,
          ]}
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  track: {
    borderRadius: 3,
  },
  progress: {
    position: "absolute",
    borderRadius: 3,
  },
  thumb: {
    position: "absolute",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
