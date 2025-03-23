import { View, Text, Pressable } from "react-native";
import React from "react";
import { colors } from "@/constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const Dot = ({
  color = colors.PRIMARY,
  showIcon = false,
  extraDotStyles = {},
  showFullTimeline = false,
  setShowFullTimeline = (boolean: any) => {},
}) => {
  return (
    <View
      style={{
        height: 13,
        width: 13,
        backgroundColor: color,
        borderRadius: 13 / 2,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        ...extraDotStyles,
      }}
    >
      {showIcon ? (
        <Pressable onPress={() => setShowFullTimeline(!showFullTimeline)}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color="black"
            style={{
              transform: [{ rotate: showFullTimeline ? "180deg" : "0deg" }],
            }}
          />
        </Pressable>
      ) : null}
    </View>
  );
};
const LeftContent = () => {
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: "#FEFA84",
          justifyContent: "flex-end",
          paddingVertical: 4,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 12 }}>02h 00m</Text>
      </View>
    </View>
  );
};
const RightContent = () => {
  return (
    <View style={{}}>
      <Text style={{ textAlign: "left" }}>
        Riyadh-King Khaled Intl-Saudi Arabia(RUH)
      </Text>
    </View>
  );
};
const LayoverBlock = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <View style={{ flex: 0.2, paddingRight: 10 }}>
        {/* <LeftContent /> */}
      </View>
      <View
        style={{
          flex: 0.1,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: "50%",
            zIndex: 10,
            transform: [{ translateY: -8 }],
          }}
        >
          {/* <Dot /> */}
        </View>
        <View
          style={{
            width: 1,
            flex: 1,
            backgroundColor: "gray",
          }}
        ></View>
      </View>
      <View
        style={{
          flex: 0.7,
          marginTop: 24,
          marginBottom: 12,
          backgroundColor: "#EDF4F5",
        }}
      >
        <Text style={{ padding: 6 }}>Layover</Text>
      </View>
    </View>
  );
};
const Block = ({
  align = "flex-start",
  top = "50%",
  translateY = -8,
  extraStyles = {},
  rightStyles = {},
  firstBlockStyles = {},
  lastBlockStyles = {},
  dotColor = colors.PRIMARY,
  showDot = true,
  showFlight = false,
  showIcon = false,
  extraDotStyles = {},
  showFullTimeline = false,
  setShowFullTimeline = () => {},
}: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: align,
        gap: 4,
      }}
    >
      <View
        style={{
          flex: 0.2,
          paddingRight: 10,
        }}
      >
        <LeftContent />
      </View>
      <View
        style={{
          flex: 0.1,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: top,
            zIndex: 10,
            transform: [{ translateY: translateY }],
            ...extraStyles,
          }}
        >
          {showDot ? (
            <Dot
              color={dotColor}
              showIcon={showIcon}
              extraDotStyles={extraDotStyles}
              showFullTimeline={showFullTimeline}
              setShowFullTimeline={setShowFullTimeline}
            />
          ) : null}
          {showFlight ? (
            <View style={{ transform: [{ rotate: "180deg" }] }}>
              <MaterialIcons name="flight" size={24} color="black" />
            </View>
          ) : null}
        </View>
        <View
          style={{
            width: 1,
            flex: 1,
            backgroundColor: "gray",
          }}
        ></View>
      </View>
      <View
        style={{
          flex: 0.7,
          ...rightStyles,
          //   paddingHorizontal: 10,
        }}
      >
        <RightContent />
      </View>
    </View>
  );
};
const TimelineNew = ({
  isFirstIndex = false,
  isLastIndex = false,
  showFullTimeline = false,
  setShowFullTimeline = (any: any) => {},
}) => {
  return (
    <View style={{ gap: 0, flex: 1 }}>
      <Block
        translateY={isFirstIndex ? 0 : -8}
        rightStyles={{
          paddingTop: isFirstIndex ? 0 : 12,
          paddingBottom: isFirstIndex ? 0 : 12,
        }}
        firstBlockStyles={{}}
        top={isFirstIndex ? "0%" : "50%"}
        align={isFirstIndex ? "flex-start" : "center"}
      />
      <Block
        align={"center"}
        rightStyles={{
          paddingTop: isFirstIndex ? 24 : 12,
          paddingBottom: isFirstIndex ? 24 : 12,
        }}
        dotColor={colors.SECONDARY}
        showDot={isFirstIndex}
        showFlight={!isFirstIndex}
        showIcon={isFirstIndex}
        extraDotStyles={
          isFirstIndex ? { height: 24, width: 24, borderRadius: 24 / 2 } : {}
        }
        showFullTimeline={showFullTimeline}
        setShowFullTimeline={setShowFullTimeline}
        // translateY={isFirstIndex ? 0 : -8}
      />
      <Block
        translateY={isLastIndex ? -13 : -8}
        top={isLastIndex ? "100%" : "50%"}
        align={isLastIndex ? "flex-end" : "center"}
        lastBlockStyles={{}}
        rightStyles={{
          paddingTop: isFirstIndex ? 0 : isLastIndex ? 12 : 24,
        }}
      />
      {isLastIndex ? null : <LayoverBlock />}
    </View>
  );
};

export default TimelineNew;
