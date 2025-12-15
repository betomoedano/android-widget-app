/* eslint-disable react-native/no-inline-styles */
import React from "react";
import type { ColorProp } from "react-native-android-widget";
import { FlexWidget, TextWidget } from "react-native-android-widget";

interface CounterWidgetProps {
  count: number;
  backgroundColor?: ColorProp;
}

export function CounterWidget({
  count = 0,
  backgroundColor = "#FFFFFF",
}: CounterWidgetProps) {
  // Determine text color based on background brightness
  const isDarkBackground =
    backgroundColor === "#1F2937" ||
    backgroundColor === "#3B82F6" ||
    backgroundColor === "#22C55E" ||
    backgroundColor === "#A855F7" ||
    backgroundColor === "#EC4899";
  const textColor = isDarkBackground ? "#FFFFFF" : "#000000";

  return (
    <FlexWidget
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        height: "match_parent",
        width: "match_parent",
        borderRadius: 32,
        flex: 1,
        flexDirection: "row",
        flexGap: 48,
      }}
    >
      <FlexWidget
        style={{
          height: "wrap_content",
          width: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
        clickAction="DECREMENT"
        clickActionData={{ value: count, backgroundColor }}
      >
        <TextWidget style={{ fontSize: 48, color: textColor }} text="-" />
      </FlexWidget>
      <TextWidget
        style={{ fontSize: 48, color: textColor }}
        text={`${count}`}
      />
      <FlexWidget
        style={{
          height: "wrap_content",
          width: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
        clickAction="INCREMENT"
        clickActionData={{ value: count, backgroundColor }}
      >
        <TextWidget style={{ fontSize: 48, color: textColor }} text="+" />
      </FlexWidget>
    </FlexWidget>
  );
}
