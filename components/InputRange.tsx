//@ts-nocheck
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import React from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width - 40;
const KNOB_SIZE = 20;
const MAX_WIDTH = WIDTH - KNOB_SIZE / 2 + 6;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const InputRange = ({ min, max, title, steps, onValueChange }) => {
  const xKnob1 = useSharedValue(0);
  const xKnob2 = useSharedValue(1);
  const scaleKnob1 = useSharedValue(1);
  const scaleKnob2 = useSharedValue(1);
  const gestureHandlerLeft = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = xKnob1.value;
    },
    onActive: (event, ctx) => {
      scaleKnob1.value = 1.3;
      xKnob1.value =
        ctx.startX + event.translationX < 0
          ? 0
          : ctx.startX + event.translationX > xKnob2.value
          ? xKnob1.value
          : ctx.startX + event.translationX > MAX_WIDTH
          ? MAX_WIDTH
          : ctx.startX + event.translationX;
    },
    onEnd: () => {
      scaleKnob1.value = 1;
      runOnJS(onValueChange)({
        min:
          Math.round((min + (xKnob1.value / MAX_WIDTH) * (max - min)) / steps) *
          steps,
        max:
          Math.round((min + (xKnob2.value / MAX_WIDTH) * (max - min)) / steps) *
          steps,
      });
    },
  });
  const gestureHandlerRight = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = xKnob2.value;
    },
    onActive: (event, ctx) => {
      scaleKnob2.value = 1.3;
      xKnob2.value =
        ctx.startX + event.translationX < xKnob1.value
          ? xKnob1.value
          : ctx.startX + event.translationX > MAX_WIDTH
          ? MAX_WIDTH
          : ctx.startX + event.translationX;
    },
    onEnd: () => {
      scaleKnob2.value = 1;
      runOnJS(onValueChange)({
        min:
          Math.round((min + (xKnob1.value / MAX_WIDTH) * (max - min)) / steps) *
          steps,
        max:
          Math.round((min + (xKnob2.value / MAX_WIDTH) * (max - min)) / steps) *
          steps,
      });
    },
  });
  const styleLine = useAnimatedStyle(() => {
    return {
      backgroundColor: "orange",
      height: 3,
      marginTop: -3,
      borderRadius: 3,
      width: xKnob2.value - xKnob1.value,
      transform: [{ translateX: xKnob1.value }],
    };
  });
  const styleKnob1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xKnob1.value }, { scale: scaleKnob1.value }],
    };
  });
  const styleKnob2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xKnob2.value }, { scale: scaleKnob2.value }],
    };
  });
  const propsLabel1 = useAnimatedProps(() => {
    return {
      text: `${
        Math.round((min + (xKnob1.value / MAX_WIDTH) * (max - min)) / steps) *
        steps
      }`,
    };
  });
  const propsLabel2 = useAnimatedProps(() => {
    return {
      text: `${
        Math.round((min + (xKnob2.value / MAX_WIDTH) * (max - min)) / steps) *
        steps
      }`,
    };
  });
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        marginTop: 70,
      }}
    >
      {/* <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View> */}
      <View style={styles.rangeContainer}>
        <View style={styles.labelsContainer}>
          <AnimatedTextInput
            defaultValue={"0"}
            editable={false}
            style={styles.label}
            animatedProps={propsLabel1}
          ></AnimatedTextInput>
          <AnimatedTextInput
            defaultValue={"0"}
            editable={false}
            style={styles.label}
            animatedProps={propsLabel2}
          ></AnimatedTextInput>
        </View>
        <View style={styles.track}></View>
        <Animated.View style={styleLine} />
        <View>
          <PanGestureHandler onGestureEvent={gestureHandlerLeft}>
            <Animated.View style={[styles.knob, styleKnob1]}></Animated.View>
          </PanGestureHandler>
          <PanGestureHandler onGestureEvent={gestureHandlerRight}>
            <Animated.View style={[styles.knob, styleKnob2]}></Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#eee",
    // borderTopWidth: 1,
    borderColor: "#cccdb2",
    // borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: "#777",
    fontSize: 12,
  },
  rangeContainer: {
    padding: 20,
    // backgroundColor: "white",
    borderColor: "#cccdb2",
    // borderBottomWidth: 1,
  },
  labelsContainer: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  label: {
    color: "#333",
    fontSize: 12,
    width: 40,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  track: {
    height: 3,
    backgroundColor: "#cccdb2",
    borderRadius: 3,
  },
  knob: {
    position: "absolute",
    height: KNOB_SIZE,
    width: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "white",
    marginTop: -KNOB_SIZE + 8,
    marginLeft: -8,
  },
});
export default InputRange;
