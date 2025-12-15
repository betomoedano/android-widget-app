import * as React from "react";
import { AppState, StyleSheet, View } from "react-native";
import type { ColorProp } from "react-native-android-widget";
import { WidgetPreview } from "react-native-android-widget";

import {
  COUNTER_STORAGE_KEY,
  getStoredBackgroundColor,
} from "./widget/widget-task-handler";
import Storage from "expo-sqlite/kv-store";
import { StatusBar } from "expo-status-bar";
import { CounterWidget } from "./widget/CounterWidget";

function getStoredCount() {
  const stored = Storage.getItemSync(COUNTER_STORAGE_KEY);
  const parsed = Number(stored);
  return !isNaN(parsed) ? parsed : 0;
}

export default function App() {
  const [count, setCount] = React.useState(getStoredCount);
  const [backgroundColor, setBackgroundColor] = React.useState(
    getStoredBackgroundColor
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setCount(getStoredCount());
        setBackgroundColor(getStoredBackgroundColor());
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <>
      <View style={[styles.container, { backgroundColor }]}>
        {/* <WidgetPreview
          renderWidget={() => <HelloWidget />}
          width={320}
          height={200}
        /> */}
        <WidgetPreview
          renderWidget={() => (
            <CounterWidget
              count={count}
              backgroundColor={backgroundColor as ColorProp}
            />
          )}
          width={320}
          height={200}
        />
      </View>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
