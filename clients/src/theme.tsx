// theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: any) => ({
            body: {
                bg: props.colorMode === "light" ? "gray.100" : "gray.900",
                color:
                    props.colorMode === "light" ? "gray.800" : "whiteAlpha.900",
            },
        }),
    },
    colors: {
        headerBg: {
            light: "teal.500",
            dark: "teal.700",
        },
        textColor: {
            light: "white",
            dark: "white",
        },
        linkBg: {
            light: "rgba(255, 255, 255, 0.1)",
            dark: "rgba(255, 255, 255, 0.2)",
        },
        linkHoverBg: {
            light: "rgba(255, 255, 255, 0.6)",
            dark: "rgba(56, 178, 172, 1)",
        },
        linkHoverColor: {
            light: "black",
            dark: "white",
        },
    },
});

export default theme;
