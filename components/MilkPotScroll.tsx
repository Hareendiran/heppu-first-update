"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 162;

export default function MilkPotScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll tracking on window
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Map progress to frame index (1 to 162)
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

    // Preloading images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Use the available file names: ezgif-frame-001.jpg, ezgif-frame-002.jpg ... ezgif-frame-162.jpg
            const frameString = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${frameString}.jpg`;

            img.onload = () => {
                loadedCount++;
                setLoaded(loadedCount);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Drawing frame
    useEffect(() => {
        if (loaded < FRAME_COUNT || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize canvas to match window
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw(Math.round(frameIndex.get()));
        };

        const draw = (index: number) => {
            const img = images[index - 1];
            if (!img || !ctx) return;

            // Fill background to blend seamlessly with pure black #050505
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Scale to fit (object-fit: contain logic)
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // initial draw

        // Subscribe to framer motion changes
        const unsubscribe = frameIndex.on("change", (val) => {
            draw(Math.round(val));
        });

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            unsubscribe();
        };
    }, [loaded, images, frameIndex]);

    // Text animation transforms
    // Rule: opacity mapping: [start, start + 0.1, end - 0.1, end] -> [0, 1, 1, 0]
    // Y mapping: enter 20px -> 0, exit 0 -> -20px

    // Beat A: 0 - 0.20
    const beatAOpacity = useTransform(smoothProgress, [0, 0.1, 0.15, 0.25], [1, 1, 0, 0]); // modified because starts at 0%
    const beatAY = useTransform(smoothProgress, [0, 0.1, 0.15, 0.25], [0, 0, -20, -20]);

    // Beat B: 0.25 - 0.45
    const beatBOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.35, 0.45], [0, 1, 1, 0]);
    const beatBY = useTransform(smoothProgress, [0.25, 0.35, 0.35, 0.45], [20, 0, 0, -20]);

    // Beat C: 0.50 - 0.70
    const beatCOpacity = useTransform(smoothProgress, [0.50, 0.60, 0.60, 0.70], [0, 1, 1, 0]);
    const beatCY = useTransform(smoothProgress, [0.50, 0.60, 0.60, 0.70], [20, 0, 0, -20]);

    // Beat D: 0.75 - 0.95 (stay visible at end)
    const beatDOpacity = useTransform(smoothProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);
    const beatDY = useTransform(smoothProgress, [0.75, 0.85, 1, 1], [20, 0, 0, 0]);

    // Scroll Indicator Fade
    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

    if (!isMounted) return null;

    if (loaded < FRAME_COUNT) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-stone-400">
                <div className="w-48 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-stone-400 transition-all duration-300"
                        style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }}
                    />
                </div>
                <p className="mt-4 font-sans text-sm tracking-widest uppercase">Loading Experience</p>
            </div>
        );
    }

    return (
        <div className="relative w-full" style={{ height: "400vh" }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

                {/* Scrollytelling Overlay Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center pointer-events-none">

                    {/* Scroll Indicator */}
                    <motion.div
                        style={{ opacity: scrollIndicatorOpacity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-xs uppercase tracking-[0.2em] text-stone-400">Scroll to Taste</span>
                        <div className="w-[1px] h-12 bg-stone-700 overflow-hidden relative">
                            <motion.div
                                className="w-full h-1/2 bg-stone-400 animate-pulse"
                                initial={{ y: -24 }}
                                animate={{ y: 48 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </div>
                    </motion.div>

                    {/* Beat A */}
                    <motion.div
                        style={{ opacity: beatAOpacity, y: beatAY }}
                        className="absolute text-center"
                    >
                        <h1 className="font-serif text-6xl md:text-8xl font-thin text-stone-100 mb-4 tracking-tight">
                            EARTH & ESSENCE
                        </h1>
                        <p className="font-sans text-stone-400 text-lg md:text-xl tracking-wide font-light">
                            Tradition crafted from the ground up.
                        </p>
                    </motion.div>

                    {/* Beat B */}
                    <motion.div
                        style={{ opacity: beatBOpacity, y: beatBY }}
                        className="absolute left-6 md:left-24 text-left max-w-lg"
                    >
                        <h2 className="font-serif text-5xl md:text-7xl font-thin text-stone-100 mb-4 tracking-tight">
                            RAW PURITY
                        </h2>
                        <p className="font-sans text-stone-400 text-lg md:text-xl tracking-wide font-light">
                            Unfiltered nourishment in its natural vessel.
                        </p>
                    </motion.div>

                    {/* Beat C */}
                    <motion.div
                        style={{ opacity: beatCOpacity, y: beatCY }}
                        className="absolute right-6 md:right-24 text-right max-w-lg"
                    >
                        <h2 className="font-serif text-5xl md:text-7xl font-thin text-stone-100 mb-4 tracking-tight">
                            DYNAMIC FLOW
                        </h2>
                        <p className="font-sans text-stone-400 text-lg md:text-xl tracking-wide font-light">
                            Captured in the moment of perfection.
                        </p>
                    </motion.div>

                    {/* Beat D */}
                    <motion.div
                        style={{ opacity: beatDOpacity, y: beatDY }}
                        className="absolute text-center"
                    >
                        <h2 className="font-serif text-6xl md:text-8xl font-thin text-stone-100 mb-6 tracking-tight">
                            TASTE THE ORIGINS
                        </h2>
                        <p className="font-sans text-stone-400 text-lg md:text-xl tracking-wide font-light mb-12">
                            Experience the difference.
                        </p>
                        <button className="pointer-events-auto px-8 py-4 border border-stone-700 hover:border-stone-400 text-stone-300 transition-colors tracking-widest uppercase text-sm font-sans backdrop-blur-sm bg-black/20">
                            Discover More
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
