import { registerRootComponent } from "expo";
import {
  registerWidgetTaskHandler,
  registerWidgetConfigurationScreen,
} from "react-native-android-widget";

import App from "./App";
import { widgetTaskHandler } from "./widget/widget-task-handler";
import { WidgetConfigurationScreen } from "./widget/WidgetConfigurationScreen";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);
