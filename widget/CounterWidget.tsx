/* eslint-disable react-native/no-inline-styles */
import React from "react";
import type { ColorProp } from "react-native-android-widget";
import {
  FlexWidget,
  TextWidget,
  ImageWidget,
} from "react-native-android-widget";

interface CounterWidgetProps {
  count: number;
  backgroundColor?: ColorProp;
}

export function CounterWidget({
  count = 0,
  backgroundColor = "#1F2937",
}: CounterWidgetProps) {
  // Determine if background is light or dark for contrast
  const isDarkBackground =
    backgroundColor === "#1F2937" ||
    backgroundColor === "#3B82F6" ||
    backgroundColor === "#22C55E" ||
    backgroundColor === "#A855F7" ||
    backgroundColor === "#EC4899";

  const textColor = isDarkBackground ? "#FFFFFF" : "#1F2937";
  const subtleColor = isDarkBackground ? "#FFFFFF" : "#000000";

  // Button backgrounds - colorful backgrounds get lighter tinted versions
  const buttonColors: Record<string, ColorProp> = {
    "#1F2937": "#374151", // Dark -> slightly lighter gray
    "#FFFFFF": "#E5E7EB", // White -> light gray
    "#F97316": "#E5E7EB", // Orange -> light gray
    "#3B82F6": "#60A5FA", // Blue -> lighter blue
    "#22C55E": "#4ADE80", // Green -> lighter green
    "#A855F7": "#C084FC", // Purple -> lighter purple
    "#EC4899": "#F472B6", // Pink -> lighter pink
  };
  const buttonBg: ColorProp =
    buttonColors[backgroundColor as string] || "#374151";

  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: backgroundColor,
        borderRadius: 24,
        padding: 12,
        flexDirection: "column",
      }}
    >
      {/* Header with Expo branding */}
      <FlexWidget
        style={{
          width: "match_parent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "wrap_content",
        }}
        clickAction="OPEN_APP"
      >
        <ImageWidget
          image={require("../assets/widget-preview/hello.png")}
          imageWidth={14}
          imageHeight={14}
          radius={3}
        />
        <TextWidget
          text="Powered by Expo"
          style={{
            fontSize: 10,
            color: subtleColor,
            fontWeight: "500",
            marginLeft: 4,
          }}
        />
      </FlexWidget>

      {/* Main counter section - takes remaining space and centers content */}
      <FlexWidget
        style={{
          width: "match_parent",
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexGap: 12,
        }}
      >
        {/* Decrement button */}
        <FlexWidget
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: buttonBg,
            alignItems: "center",
            justifyContent: "center",
          }}
          clickAction="DECREMENT"
          clickActionData={{ value: count, backgroundColor }}
        >
          <TextWidget
            text="-"
            style={{
              fontSize: 24,
              color: textColor,
              fontWeight: "300",
            }}
          />
        </FlexWidget>

        {/* Count display */}
        <TextWidget
          text={`${count}`}
          style={{
            fontSize: 48,
            color: textColor,
            fontWeight: "200",
            fontFamily: "sans-serif-light",
          }}
        />

        {/* Increment button */}
        <FlexWidget
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: buttonBg,
            alignItems: "center",
            justifyContent: "center",
          }}
          clickAction="INCREMENT"
          clickActionData={{ value: count, backgroundColor }}
        >
          <TextWidget
            text="+"
            style={{
              fontSize: 24,
              color: textColor,
              fontWeight: "300",
            }}
          />
        </FlexWidget>
      </FlexWidget>

      {/* Footer label */}
      <FlexWidget
        style={{
          width: "match_parent",
          alignItems: "center",
          justifyContent: "center",
          height: "wrap_content",
        }}
      >
        <TextWidget
          text="COUNTER"
          style={{
            fontSize: 9,
            color: subtleColor,
            fontWeight: "600",
            letterSpacing: 2,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
