import type { Preview } from "@storybook/react";
import { TamaguiProvider } from "tamagui";
import { ThemeProvider } from "../src/presentation/hooks/ThemeProvider";
import config from "../tamagui.config";

const preview: Preview = {
    decorators: [
        (Story) => (
            <TamaguiProvider config={config}>
                <ThemeProvider>
                    <Story />
                </ThemeProvider>
            </TamaguiProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
