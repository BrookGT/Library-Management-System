import { motion } from "framer-motion";
import React from "react";

const PageTransition: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, transform: "rotateY(-90deg)" }}
            animate={{ opacity: 1, transform: "rotateY(0deg)" }}
            exit={{ opacity: 0, transform: "rotateY(90deg)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ perspective: 2000 }} // Add perspective to give a 3D effect
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
