import React from "react";
import {
  FlexWidget,
  TextWidget,
  ImageWidget,
} from "react-native-android-widget";

export function HelloWidget() {
  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        borderRadius: 16,
      }}
      clickAction="OPEN_APP"
    >
      <ImageWidget
        image={require("../assets/widget-preview/counter.png")}
        imageWidth={32}
        imageHeight={32}
      />
      <TextWidget
        text="Open App"
        style={{
          fontSize: 32,
          fontFamily: "Inter",
          color: "#ffffff",
        }}
      />
    </FlexWidget>
  );
}
