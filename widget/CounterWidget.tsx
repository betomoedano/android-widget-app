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
  // Using semi-transparent colors approximated as solid hex
  const subtleColor = isDarkBackground ? "#9CA3AF" : "#9CA3AF";
  const buttonBg = isDarkBackground ? "#374151" : "#E5E7EB";

  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: backgroundColor,
        borderRadius: 24,
        padding: 16,
        flexDirection: "column",
        justifyContent: "space-between",
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
          imageWidth={16}
          imageHeight={16}
          radius={4}
        />
        <TextWidget
          text="Powered by Expo"
          style={{
            fontSize: 11,
            color: subtleColor,
            fontWeight: "500",
            marginLeft: 6,
          }}
        />
      </FlexWidget>

      {/* Main counter section */}
      <FlexWidget
        style={{
          width: "match_parent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "wrap_content",
          flexGap: 20,
        }}
      >
        {/* Decrement button */}
        <FlexWidget
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: buttonBg,
            alignItems: "center",
            justifyContent: "center",
          }}
          clickAction="DECREMENT"
          clickActionData={{ value: count, backgroundColor }}
        >
          <TextWidget
            text="−"
            style={{
              fontSize: 28,
              color: textColor,
              fontWeight: "300",
            }}
          />
        </FlexWidget>

        {/* Count display */}
        <FlexWidget
          style={{
            width: 80,
            alignItems: "center",
            justifyContent: "center",
            height: "wrap_content",
          }}
        >
          <TextWidget
            text={`${count}`}
            style={{
              fontSize: 56,
              color: textColor,
              fontWeight: "200",
              fontFamily: "sans-serif-light",
            }}
          />
        </FlexWidget>

        {/* Increment button */}
        <FlexWidget
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
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
              fontSize: 28,
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
            fontSize: 10,
            color: subtleColor,
            fontWeight: "600",
            letterSpacing: 2,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
