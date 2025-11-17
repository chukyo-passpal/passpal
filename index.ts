// This is aliased to another location when server components are enabled.
// We use this intermediate file to avoid issues with aliases not applying to package.json main field resolution.
import "expo-router/entry-classic";

// Register Android widget task handler
import { registerWidgetTaskHandler } from "react-native-android-widget";

import { widgetTaskHandler } from "./src/widget/android/widget-task-handler";

registerWidgetTaskHandler(widgetTaskHandler);
