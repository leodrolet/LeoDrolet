"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

function FloatingPaths({ position }: { position: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // On déplace les lignes vers le bas au fur et à mesure du scroll
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
            <motion.div style={{ y }} className="w-full h-full">
                <svg
                    className="w-full h-full"
                    viewBox="-500 -200 1200 1200"
                    fill="none"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'block'
                    }}
                >
                    <title>Background Paths</title>
                    {paths.map((path) => (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke="#f97316" // Orange-500 explicit
                            strokeWidth={path.width}
                            strokeOpacity={0.2 + path.id * 0.02} // Légèrement plus opaque pour le debug
                            initial={{ pathLength: 0.3, opacity: 0.6 }}
                            animate={{
                                pathLength: 1,
                                opacity: [0.3, 0.6, 0.3],
                                pathOffset: [0, 1, 0],
                            }}
                            transition={{
                                duration: 20 + Math.random() * 10,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    ))}
                </svg>
            </motion.div>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}
