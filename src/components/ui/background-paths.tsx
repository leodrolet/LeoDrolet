import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

// SVG coordinate units between each row of paths
const ROW_HEIGHT = 1064;

function FloatingPaths({ position }: { position: number }) {
    const { scrollY } = useScroll();
    const [pageH, setPageH] = useState(4000);

    useEffect(() => {
        const measure = () =>
            setPageH(Math.max(document.body.scrollHeight - window.innerHeight, 100));
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(document.body);
        return () => ro.disconnect();
    }, []);

    // SVG is 200vh tall. Translate it upward at the same pace as scroll so
    // paths follow the user from top to bottom of the page.
    const y = useTransform(scrollY, [0, pageH], ["0vh", "-100vh"]);

    // Two rows of 36 paths: row 0 visible at page top, row 1 at page bottom.
    // viewBox "-500 -400 1200 2600" maps cleanly to the 200vh SVG height.
    const paths = Array.from({ length: 72 }, (_, idx) => {
        const i = idx % 36;
        const yOff = Math.floor(idx / 36) * ROW_HEIGHT;
        return {
            id: idx,
            d: `M-${380 - i * 5 * position} ${yOff - 189 - i * 6}C-${
                380 - i * 5 * position
            } ${yOff - 189 - i * 6} -${312 - i * 5 * position} ${yOff + 216 - i * 6} ${
                152 - i * 5 * position
            } ${yOff + 343 - i * 6}C${616 - i * 5 * position} ${yOff + 470 - i * 6} ${
                684 - i * 5 * position
            } ${yOff + 875 - i * 6} ${684 - i * 5 * position} ${yOff + 875 - i * 6}`,
            width: 0.5 + (i % 36) * 0.03,
        };
    });

    return (
        <motion.div style={{ y }} className="absolute top-0 left-0 w-full">
            <svg
                className="w-full"
                height="200vh"
                viewBox="-500 -400 1200 2600"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="#f97316"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + (path.id % 36) * 0.008}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + (path.id % 15) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: (path.id % 36) * 0.2,
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}
