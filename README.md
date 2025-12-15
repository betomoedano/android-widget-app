# Android Widget App with Expo

A showcase example demonstrating how to build **native Android home screen widgets** using [React Native Android Widget](https://saleksovski.github.io/react-native-android-widget/docs) with Expo.

## Features

### 🎯 Counter Widget

A fully interactive home screen widget featuring:

- **Increment/Decrement buttons** - Tap to change the counter value
- **Persistent storage** - Count persists across app restarts using `expo-sqlite`
- **Configurable background color** - 7 color themes to choose from
- **Resizable** - Drag handles to resize the widget
- **Powered by Expo branding** - Subtle branding with adaptive colors

### 🎨 Widget Configuration

- Long-press widget to access configuration screen
- Live preview of color changes
- Settings persist and sync with the main app

### 📱 App Integration

- Main app displays a widget preview
- Background color syncs between widget and app
- Real-time updates when returning to the app

## Project Structure

```
├── App.tsx                          # Main app with widget preview
├── index.ts                         # Entry point & widget registration
├── app.json                         # Expo config with widget definitions
└── widget/
    ├── CounterWidget.tsx            # Widget UI component
    ├── HelloWidget.tsx              # Simple example widget
    ├── WidgetConfigurationScreen.tsx # Configuration UI
    └── widget-task-handler.tsx      # Widget event handler
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Build and run on Android
npx expo run:android
```

### Adding the Widget

1. Build and install the app on your Android device/emulator
2. Long-press on your home screen
3. Select "Widgets"
4. Find "My Counter Widget" and drag it to your home screen
5. Configure the background color (optional)

## Widget Configuration

### app.json Widget Definition

```json
{
  "name": "Counter",
  "label": "My Counter Widget",
  "minWidth": "180dp",
  "minHeight": "100dp",
  "targetCellWidth": 3,
  "targetCellHeight": 2,
  "widgetFeatures": "reconfigurable",
  "resizeMode": "horizontal|vertical"
}
```

### Key Properties

| Property                 | Description                       |
| ------------------------ | --------------------------------- |
| `name`                   | Internal widget identifier        |
| `label`                  | Display name in widget picker     |
| `minWidth/minHeight`     | Minimum widget dimensions         |
| `targetCellWidth/Height` | Default size in grid cells        |
| `widgetFeatures`         | `reconfigurable` enables settings |
| `resizeMode`             | Allow horizontal/vertical resize  |

## Storage Keys

```typescript
// Counter value
COUNTER_STORAGE_KEY = "CounterWidget:count";

// Background color
COUNTER_BACKGROUND_KEY = "CounterWidget:backgroundColor";
```

## Widget Events

The task handler responds to these events:

| Event            | Description                        |
| ---------------- | ---------------------------------- |
| `WIDGET_ADDED`   | Widget placed on home screen       |
| `WIDGET_UPDATE`  | Periodic or manual refresh         |
| `WIDGET_RESIZED` | User resized the widget            |
| `WIDGET_DELETED` | Widget removed from home screen    |
| `WIDGET_CLICK`   | User tapped an interactive element |

## Color Themes

| Theme  | Hex Code  |
| ------ | --------- |
| Dark   | `#1F2937` |
| Blue   | `#3B82F6` |
| Green  | `#22C55E` |
| Purple | `#A855F7` |
| Pink   | `#EC4899` |
| Orange | `#F97316` |
| White  | `#FFFFFF` |

## Learn More

- [React Native Android Widget Docs](https://saleksovski.github.io/react-native-android-widget/)
- [Expo Documentation](https://docs.expo.dev/)
- [Android App Widgets Guide](https://developer.android.com/develop/ui/views/appwidgets)
