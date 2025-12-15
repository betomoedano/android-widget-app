import React from "react";
import { Linking } from "react-native";
import Storage from "expo-sqlite/kv-store";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { HelloWidget } from "./HelloWidget";
import { CounterWidget } from "./CounterWidget";
import { getWidgetConfigStorageKey } from "./WidgetConfigurationScreen";

const nameToWidget = {
  // Hello will be the **name** with which we will reference our widget.
  Hello: HelloWidget,
  Counter: CounterWidget,
};

export const COUNTER_STORAGE_KEY = "CounterWidget:count";

function getWidgetConfig(widgetId: number) {
  const storageKey = getWidgetConfigStorageKey(widgetId);
  const stored = Storage.getItemSync(storageKey);
  if (stored) {
    return JSON.parse(stored);
  }
  return { backgroundColor: "#FFFFFF" };
}

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

  switch (props.widgetAction) {
    case "WIDGET_ADDED": {
      if (widgetInfo.widgetName === "Counter") {
        const stored = Storage.getItemSync(COUNTER_STORAGE_KEY);
        const count = stored ? Number(stored) : 0;
        const config = getWidgetConfig(widgetInfo.widgetId);
        props.renderWidget(
          <CounterWidget
            count={count}
            backgroundColor={config.backgroundColor}
          />
        );
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;
    }

    case "WIDGET_UPDATE": {
      if (widgetInfo.widgetName === "Counter") {
        const stored = Storage.getItemSync(COUNTER_STORAGE_KEY);
        const count = stored ? Number(stored) : 0;
        const config = getWidgetConfig(widgetInfo.widgetId);
        props.renderWidget(
          <CounterWidget
            count={count}
            backgroundColor={config.backgroundColor}
          />
        );
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }

      break;
    }
    case "WIDGET_RESIZED":
      // Not needed for now
      break;

    case "WIDGET_DELETED":
      // Not needed for now
      break;

    case "WIDGET_CLICK": {
      if (props.clickAction === "OPEN_APP") {
        Linking.openURL("androidwidgetapp://home");
        break;
      }

      if (widgetInfo.widgetName === "Counter") {
        const currentValue = Number(props.clickActionData?.value) || 0;
        const backgroundColor =
          props.clickActionData?.backgroundColor ||
          getWidgetConfig(widgetInfo.widgetId).backgroundColor;
        const count =
          currentValue + (props.clickAction === "INCREMENT" ? 1 : -1);
        console.log(
          "[Widget] Saving count:",
          count,
          "to key:",
          COUNTER_STORAGE_KEY
        );
        props.renderWidget(
          <CounterWidget count={count} backgroundColor={backgroundColor} />
        );

        Storage.setItemSync(COUNTER_STORAGE_KEY, `${count}`);
        console.log(
          "[Widget] After save, read back:",
          Storage.getItemSync(COUNTER_STORAGE_KEY)
        );
      }
      break;
    }
    default:
      break;
  }
}
