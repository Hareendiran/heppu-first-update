import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 162;

const MilkPotScroll: React.FC = () => {
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
        if (loaded < FRAME_COUNT || !canvasRef.current || !isMounted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw(Math.round(frameIndex.get()));
        };

        const draw = (index: number) => {
            const img = images[index - 1];
            if (!img || !ctx) return;

            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const unsubscribe = frameIndex.on("change", (val) => {
            draw(Math.round(val));
        });

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            unsubscribe();
        };
    }, [loaded, images, frameIndex, isMounted]);

    const beatAOpacity = useTransform(smoothProgress, [0, 0.1, 0.15, 0.25], [1, 1, 0, 0]);
    const beatAY = useTransform(smoothProgress, [0, 0.1, 0.15, 0.25], [0, 0, -20, -20]);

    const beatBOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.35, 0.45], [0, 1, 1, 0]);
    const beatBY = useTransform(smoothProgress, [0.25, 0.35, 0.35, 0.45], [20, 0, 0, -20]);

    const beatCOpacity = useTransform(smoothProgress, [0.50, 0.60, 0.60, 0.70], [0, 1, 1, 0]);
    const beatCY = useTransform(smoothProgress, [0.50, 0.60, 0.60, 0.70], [20, 0, 0, -20]);

    const beatDOpacity = useTransform(smoothProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);
    const beatDY = useTransform(smoothProgress, [0.75, 0.85, 1, 1], [20, 0, 0, 0]);

    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

    if (!isMounted) return null;

    if (loaded < FRAME_COUNT) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-[#f5f5f4]">
                <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-neutral-400 transition-all duration-300"
                        style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }}
                    />
                </div>
                <p className="mt-4 font-sans text-sm tracking-widest uppercase">Loading Legacy</p>
            </div>
        );
    }

    return (
        <div className="relative w-full bg-[#050505]" style={{ height: "400vh" }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center pointer-events-none">

                    <motion.div
                        style={{ opacity: scrollIndicatorOpacity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Scroll to pour</span>
                        <div className="w-[1px] h-12 bg-neutral-800 overflow-hidden relative">
                            <motion.div
                                className="w-full h-1/2 bg-neutral-400 animate-pulse"
                                initial={{ y: -24 }}
                                animate={{ y: 48 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ opacity: beatAOpacity, y: beatAY }}
                        className="absolute text-center"
                    >
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-[#f5f5f4] mb-4 tracking-tight">
                            EARTH & ESSENCE
                        </h1>
                        <p className="font-sans text-neutral-400 text-lg md:text-xl max-w-md mx-auto">
                            Tradition crafted from the ground up, inside ancient clay vessels.
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: beatBOpacity, y: beatBY }}
                        className="absolute left-6 md:left-24 text-left max-w-lg"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#f5f5f4] mb-4 tracking-tight">
                            RAW PURITY
                        </h2>
                        <p className="font-sans text-neutral-400 text-lg md:text-xl">
                            Unfiltered natural nourishment that feels alive with every pour.
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: beatCOpacity, y: beatCY }}
                        className="absolute right-6 md:right-24 text-right max-w-lg"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#f5f5f4] mb-4 tracking-tight">
                            DYNAMIC FLOW
                        </h2>
                        <p className="font-sans text-neutral-400 text-lg md:text-xl">
                            Captured in the moment of perfection, untouched by modern processing.
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: beatDOpacity, y: beatDY }}
                        className="absolute text-center"
                    >
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-[#f5f5f4] mb-6 tracking-tight">
                            TASTE THE ORIGINS
                        </h2>
                        <p className="font-sans text-neutral-400 text-lg md:text-xl mb-12 max-w-md mx-auto">
                            Experience the difference real tradition makes.
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default MilkPotScroll;
