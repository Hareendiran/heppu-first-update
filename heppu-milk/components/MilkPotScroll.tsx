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

    const containerRef = useRef<HTMLDivElement>(null);

    // Provide a fallback scroll value for hydration. Since the outer div is permanently mounted,
    // we can safely use the containerRef directly.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

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

    const beatAOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.40, 0.50], [0, 1, 1, 0]);
    const beatAY = useTransform(smoothProgress, [0.15, 0.25, 0.40, 0.50], [20, 0, 0, -20]);

    const beatBOpacity = useTransform(smoothProgress, [0.55, 0.65, 0.80, 0.90], [0, 1, 1, 0]);
    const beatBY = useTransform(smoothProgress, [0.55, 0.65, 0.80, 0.90], [20, 0, 0, -20]);

    // We cannot return null early, because `containerRef` must be rendered in the DOM 
    // for framer-motion's useScroll hook to hydrate properly.

    return (
        <div ref={containerRef} className="relative w-full bg-[#050505]" style={loaded < FRAME_COUNT ? { height: "100vh" } : { height: "400vh" }}>
            {loaded < FRAME_COUNT ? (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-[#f5f5f4]">
                    <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-neutral-400 transition-all duration-300"
                            style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }}
                        />
                    </div>
                    <p className="mt-4 font-sans text-sm tracking-widest uppercase">Loading Legacy</p>
                </div>
            ) : (
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center pointer-events-none">

                        <motion.div
                            style={{ opacity: beatAOpacity, y: beatAY }}
                            className="absolute text-center max-w-lg"
                        >
                            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#f5f5f4] mb-4 tracking-tight">
                                EARTH & ESSENCE
                            </h1>
                            <p className="font-sans text-neutral-400 text-lg md:text-xl mx-auto">
                                Tradition crafted from the ground up, inside ancient clay vessels.
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ opacity: beatBOpacity, y: beatBY }}
                            className="absolute text-center max-w-lg"
                        >
                            <h2 className="font-display text-5xl md:text-7xl font-bold text-[#f5f5f4] mb-4 tracking-tight">
                                TASTE THE ORIGINS
                            </h2>
                            <p className="font-sans text-neutral-400 text-lg md:text-xl mx-auto">
                                Experience the difference real tradition makes.
                            </p>
                        </motion.div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MilkPotScroll;
