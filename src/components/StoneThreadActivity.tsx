import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, RotateCcw } from 'lucide-react';

export default function StoneThreadActivity() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [hasReleased, setHasReleased] = useState(false);
    const [angle, setAngle] = useState(0); // Current angle of the stone in degrees
    const [hitTarget, setHitTarget] = useState<boolean | null>(null);
    const requestRef = useRef<number>(0);
    const angleRef = useRef(0);
    const center = { x: 150, y: 150 };
    const radius = 80;

    // The precise angle where the tagent hits the target.
    // Assuming target is directly above the center (e.g., x: 150, y: 20)
    // The stone must be released exactly at 0 degrees (right side, moving counter-clockwise -> velocity points up)
    // Wait, standard math: 0 deg = right, 90 deg = bottom (if y is down), etc.
    // Let's define: center is 150,150. Orbit radius 80.
    // Stone position: x = 150 + 80*cos(a), y = 150 + 80*sin(a).
    // If it spins counter-clockwise (a decreases over time).
    // Velocity vector is tangent: [-sin(a), cos(a)].
    // Target is located at x=150, y=20.
    // We want the stone to fly straight up!
    // To fly straight up (-y direction), velocity vector must be [0, -1].
    // So -sin(a) = 0 and cos(a) = -1  => but that means a = 180 degrees (left side).
    // Wait, if a=180, pos is (70, 150). Tangent points straight up. But target is at x=150.
    // If position is (150, 150) + radius * (cos a, sin a).
    // Let's set a simpler game logic for a kid:
    // Target is on the RIGHT. (x: 280, y: 150).
    // To hit a target on the right, the stone needs to fly horizontally (+x direction).
    // Stone is at top (a= -90 deg -> x: 150, y: 70). Tangent velocity goes right!
    // So release point = TOP of circle.

    const targetPos = { x: 280, y: 70 }; // Horizontally aligned with the top of the circle
    const releaseTolerance = 20; // degrees

    const startSpinning = () => {
        setIsSpinning(true);
        setHasReleased(false);
        setHitTarget(null);
    };

    const animate = () => {
        if (isSpinning) {
            angleRef.current = (angleRef.current - 4) % 360; // Counter-clockwise spinning
            setAngle(angleRef.current);
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (isSpinning) {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(requestRef.current!);
    }, [isSpinning]);

    const releaseStone = () => {
        if (!isSpinning) return;
        setIsSpinning(false);
        setHasReleased(true);
        cancelAnimationFrame(requestRef.current!);

        // Normalize angle to positive 0-360
        let currentAngle = angleRef.current % 360;
        if (currentAngle < 0) currentAngle += 360;

        // Top of the circle is 270 degrees in JS Math (if 0 is right, 90 is bottom)
        // Wait, standard: 0 = right, 90 = bottom, 180 = left, 270 = top.
        // We want them to release at 270 degrees.
        const idealReleaseAngle = 270;
        const diff = Math.abs(currentAngle - idealReleaseAngle);
        // check shortest distance (e.g., 350 to 10 is 20)
        let shortestDiff = diff;
        if (diff > 180) {
            shortestDiff = 360 - diff;
        }

        if (shortestDiff <= releaseTolerance) {
            setHitTarget(true);
        } else {
            setHitTarget(false);
        }
    };

    // Calculate Stone Position
    const stoneRad = (angle * Math.PI) / 180;
    let stoneX = center.x + radius * Math.cos(stoneRad);
    let stoneY = center.y + radius * Math.sin(stoneRad);

    // If released, where does the stone go?
    // It shoots out along the tangent.
    // We can use framer motion to shoot it out from its current `stoneX`, `stoneY` along `-sin`, `cos`.
    const flyDistance = 300;
    const endX = stoneX + flyDistance * (-Math.sin(stoneRad));
    const endY = stoneY + flyDistance * (Math.cos(stoneRad));

    return (
        <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="w-full md:w-1/3 relative z-10 text-center md:text-left">
                <span className="bg-rose-500/20 text-rose-400 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block border border-rose-500/30">Physics Mini-Game</span>
                <h3 className="text-3xl font-black text-white mb-4">The Tangent Target</h3>
                <p className="text-slate-400 font-medium mb-8">
                    An object moving in a circle will fly off in a straight straight line if the centripetal force holding it is removed. <strong>Press and hold</strong> "Spin", then release exactly when the stone is at the top of the circle to hit the target!
                </p>

                <button
                    onMouseDown={startSpinning}
                    onMouseUp={releaseStone}
                    onMouseLeave={() => { if (isSpinning) releaseStone() }}
                    onTouchStart={(e) => { e.preventDefault(); startSpinning(); }}
                    onTouchEnd={(e) => { e.preventDefault(); releaseStone(); }}
                    className="w-full select-none bg-rose-500 hover:bg-rose-400 active:bg-rose-600 active:scale-95 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all flex justify-center items-center gap-2"
                >
                    {isSpinning ? <RotateCcw className="animate-spin-slow" /> : <Target />}
                    {isSpinning ? "RELEASE TO SHOOT!" : "HOLD TO SPIN"}
                </button>

                {hasReleased && (
                    <div className="mt-6 flex justify-center">
                        <button onClick={() => { setHasReleased(false); setHitTarget(null); setAngle(0); angleRef.current = 0; }} className="text-slate-400 hover:text-white font-bold flex items-center gap-2 text-sm transition-colors">
                            <RotateCcw size={16} /> Reset Simulation
                        </button>
                    </div>
                )}
            </div>

            <div className="w-full md:w-2/3 h-[300px] relative z-10 flex justify-center items-center bg-slate-800/50 rounded-3xl border border-slate-700 overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 350 300" className="overflow-visible">
                    {/* The Target */}
                    <circle cx={targetPos.x} cy={targetPos.y} r="15" fill="none" stroke="#ef4444" strokeWidth="4" className={hitTarget ? 'animate-pulse' : ''} />
                    <circle cx={targetPos.x} cy={targetPos.y} r="8" fill="#ef4444" className={hitTarget ? 'animate-pulse' : ''} />
                    <text x={targetPos.x + 25} y={targetPos.y + 5} fill="#ef4444" fontSize="12" fontWeight="bold">TARGET</text>

                    {/* Hand / Center Pivot */}
                    <circle cx={center.x} cy={center.y} r="6" fill="#94a3b8" />

                    {/* Orbit Path Guide */}
                    <circle cx={center.x} cy={center.y} r={radius} fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />

                    {!hasReleased ? (
                        <>
                            {/* The Thread */}
                            <line
                                x1={center.x}
                                y1={center.y}
                                x2={stoneX}
                                y2={stoneY}
                                stroke="#94a3b8"
                                strokeWidth="3"
                            />
                            {/* The Stone */}
                            <circle cx={stoneX} cy={stoneY} r="12" fill="#e2e8f0" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </>
                    ) : (
                        <>
                            {/* Released Stone Flying */}
                            <motion.circle
                                r="12"
                                fill="#e2e8f0"
                                initial={{ cx: stoneX, cy: stoneY }}
                                animate={{ cx: endX, cy: endY }}
                                transition={{ duration: 0.8, ease: "linear" }}
                                className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            />
                            {/* Tangent Trajectory Line */}
                            <motion.line
                                x1={stoneX} y1={stoneY} x2={endX} y2={endY}
                                stroke="#f8fafc" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8 }}
                            />
                        </>
                    )}
                </svg>

                {/* Status Overlay */}
                {hitTarget !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`absolute bottom-6 px-6 py-3 rounded-2xl font-black text-white shadow-2xl ${hitTarget ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    >
                        {hitTarget ? "BULLSEYE! Perfect Tangent!" : "MISSED! Try releasing at the Top."}
                    </motion.div>
                )}
            </div>

        </div>
    );
}
