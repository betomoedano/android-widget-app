import * as React from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import { WidgetPreview } from "react-native-android-widget";

import { HelloWidget } from "./widget/HelloWidget";
import { COUNTER_STORAGE_KEY } from "./widget/widget-task-handler";
import Storage from "expo-sqlite/kv-store";

function getStoredCount() {
  const stored = Storage.getItemSync(COUNTER_STORAGE_KEY);
  const parsed = Number(stored);
  return !isNaN(parsed) ? parsed : 0;
}

export default function App() {
  const [count, setCount] = React.useState(getStoredCount);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        console.log("[App] AppState is active, refreshing count");
        setCount(getStoredCount());
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>{count}</Text>
      <WidgetPreview
        renderWidget={() => <HelloWidget />}
        width={320}
        height={200}
      />
    </View>
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
