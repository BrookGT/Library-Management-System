import React, { ReactNode, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationFile from "/src/assets/enbb74yAaU.json";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const animationRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.setSpeed(0.5);
        }
    }, []);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="linear-gradient(135deg, rgba(0, 128, 128, 0.9) 0%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 43, 226, 0.9) 100%)"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            p={4}
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={0}
            >
                <Lottie
                    lottieRef={animationRef}
                    loop={false}
                    animationData={animationFile}
                    style={{ width: "100%", height: "100%" }}
                />
            </Box>
            <Box position="relative" zIndex={1} w="full" maxW="sm">
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
