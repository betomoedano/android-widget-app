import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import type { WidgetConfigurationScreenProps } from "react-native-android-widget";
import Storage from "expo-sqlite/kv-store";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = [
  { name: "Dark", value: "#1F2937" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#22C55E" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Orange", value: "#F97316" },
  { name: "White", value: "#FFFFFF" },
];

export function getWidgetConfigStorageKey(widgetId: number) {
  return `widget-config-${widgetId}`;
}

export function WidgetConfigurationScreen({
  widgetInfo,
  setResult,
  renderWidget,
}: WidgetConfigurationScreenProps) {
  const storageKey = getWidgetConfigStorageKey(widgetInfo.widgetId);
  const existingConfig = Storage.getItemSync(storageKey);
  const initialColor = existingConfig
    ? JSON.parse(existingConfig).backgroundColor
    : "#1F2937";

  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleSave = () => {
    // Save the configuration
    Storage.setItemSync(
      storageKey,
      JSON.stringify({ backgroundColor: selectedColor })
    );

    // Re-render the widget with the new configuration
    // We need to import and render the widget here
    const { CounterWidget } = require("./CounterWidget");
    const countKey = "CounterWidget:count";
    const stored = Storage.getItemSync(countKey);
    const count = stored ? Number(stored) : 0;

    renderWidget(
      <CounterWidget count={count} backgroundColor={selectedColor} />
    );

    // Signal success
    setResult("ok");
  };

  const handleCancel = () => {
    setResult("cancel");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configure Widget</Text>
        <Text style={styles.subtitle}>Choose a background color</Text>

        <View style={styles.colorsContainer}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color.value}
              style={[
                styles.colorButton,
                { backgroundColor: color.value },
                selectedColor === color.value && styles.selectedColor,
              ]}
              onPress={() => setSelectedColor(color.value)}
            >
              {selectedColor === color.value && (
                <Text
                  style={[
                    styles.checkmark,
                    color.value === "#FFFFFF" || color.value === "#F97316"
                      ? styles.darkCheckmark
                      : styles.lightCheckmark,
                  ]}
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Preview</Text>
          <View
            style={[styles.previewWidget, { backgroundColor: selectedColor }]}
          >
            {/* Header with Expo branding */}
            <View style={styles.previewHeader}>
              <Image
                source={require("../assets/widget-preview/hello.png")}
                style={styles.previewLogo}
              />
              <Text
                style={[
                  styles.previewBranding,
                  selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                    ? styles.brandingDark
                    : styles.brandingLight,
                ]}
              >
                Powered by Expo
              </Text>
            </View>

            {/* Counter display */}
            <View style={styles.previewCounter}>
              <View
                style={[
                  styles.previewButton,
                  selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                    ? styles.buttonLight
                    : styles.buttonDark,
                ]}
              >
                <Text
                  style={[
                    styles.previewButtonText,
                    selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                      ? styles.darkText
                      : styles.lightText,
                  ]}
                >
                  −
                </Text>
              </View>
              <Text
                style={[
                  styles.previewCount,
                  selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                    ? styles.darkText
                    : styles.lightText,
                ]}
              >
                0
              </Text>
              <View
                style={[
                  styles.previewButton,
                  selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                    ? styles.buttonLight
                    : styles.buttonDark,
                ]}
              >
                <Text
                  style={[
                    styles.previewButtonText,
                    selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                      ? styles.darkText
                      : styles.lightText,
                  ]}
                >
                  +
                </Text>
              </View>
            </View>

            {/* Footer */}
            <Text
              style={[
                styles.previewFooter,
                selectedColor === "#FFFFFF" || selectedColor === "#F97316"
                  ? styles.brandingDark
                  : styles.brandingLight,
              ]}
            >
              COUNTER
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },
  colorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  colorButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  selectedColor: {
    borderColor: "#3B82F6",
    borderWidth: 3,
  },
  checkmark: {
    fontSize: 24,
    fontWeight: "bold",
  },
  darkCheckmark: {
    color: "#1F2937",
  },
  lightCheckmark: {
    color: "#FFFFFF",
  },
  preview: {
    marginBottom: 32,
  },
  previewLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  previewWidget: {
    height: 140,
    borderRadius: 24,
    padding: 16,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewLogo: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  previewBranding: {
    fontSize: 11,
    marginLeft: 6,
    fontWeight: "500",
  },
  brandingLight: {
    color: "rgba(255,255,255,0.4)",
  },
  brandingDark: {
    color: "rgba(0,0,0,0.3)",
  },
  previewCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  previewButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDark: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  buttonLight: {
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  previewButtonText: {
    fontSize: 24,
    fontWeight: "300",
  },
  previewCount: {
    fontSize: 48,
    fontWeight: "200",
    minWidth: 60,
    textAlign: "center",
  },
  previewFooter: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 2,
  },
  darkText: {
    color: "#1F2937",
  },
  lightText: {
    color: "#FFFFFF",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
