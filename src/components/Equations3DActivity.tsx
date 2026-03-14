import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
function DriverPOVCar({ speed }: { speed: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const steeringRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current && speed > 0) {
            // Subtle vibration shake
            groupRef.current.position.y = Math.sin(Date.now() * 0.02) * 0.003 * Math.min(speed, 30);
            groupRef.current.position.x = Math.sin(Date.now() * 0.015) * 0.002 * Math.min(speed, 30);
        }
        if (steeringRef.current && speed > 0) {
            // Slight steering micro-movement
            steeringRef.current.rotation.z = Math.sin(Date.now() * 0.003) * 0.03;
        }
    });

    const bodyColor = "#c0392b"; // Metallic red
    const dashColor = "#1a1a2e";
    const trimColor = "#2d3748";

    return (
        <group ref={groupRef}>
            {/* ===== BONNET / HOOD ===== */}
            <mesh position={[0, 0.55, -2.8]} rotation={[-0.08, 0, 0]}>
                <boxGeometry args={[2.8, 0.08, 3.5]} />
                <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Hood center line ridge */}
            <mesh position={[0, 0.6, -2.8]} rotation={[-0.08, 0, 0]}>
                <boxGeometry args={[0.06, 0.03, 3.2]} />
                <meshStandardMaterial color="#a93226" metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Hood edge trim left */}
            <mesh position={[-1.42, 0.56, -2.8]} rotation={[-0.08, 0, 0]}>
                <boxGeometry args={[0.04, 0.06, 3.5]} />
                <meshStandardMaterial color="#7f8c8d" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Hood edge trim right */}
            <mesh position={[1.42, 0.56, -2.8]} rotation={[-0.08, 0, 0]}>
                <boxGeometry args={[0.04, 0.06, 3.5]} />
                <meshStandardMaterial color="#7f8c8d" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* ===== WINDSHIELD GLASS ===== */}
            <mesh position={[0, 1.35, -1.1]} rotation={[-0.35, 0, 0]}>
                <planeGeometry args={[3.2, 1.8]} />
                <meshStandardMaterial color="#b0d4f1" transparent opacity={0.15} metalness={0.3} roughness={0.1} side={THREE.DoubleSide} />
            </mesh>

            {/* ===== WINDSHIELD FRAME ===== */}
            {/* Top bar */}
            <mesh position={[0, 2.15, -1.42]} rotation={[-0.35, 0, 0]}>
                <boxGeometry args={[3.5, 0.18, 0.18]} />
                <meshStandardMaterial color={trimColor} />
            </mesh>
            {/* Bottom windshield bar */}
            <mesh position={[0, 0.62, -0.85]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[3.2, 0.12, 0.2]} />
                <meshStandardMaterial color={trimColor} />
            </mesh>
            {/* Left A-Pillar */}
            <mesh position={[-1.65, 1.38, -1.15]} rotation={[-0.35, 0, -0.25]}>
                <boxGeometry args={[0.14, 2.0, 0.16]} />
                <meshStandardMaterial color={trimColor} />
            </mesh>
            {/* Right A-Pillar */}
            <mesh position={[1.65, 1.38, -1.15]} rotation={[-0.35, 0, 0.25]}>
                <boxGeometry args={[0.14, 2.0, 0.16]} />
                <meshStandardMaterial color={trimColor} />
            </mesh>

            {/* ===== DASHBOARD ===== */}
            <mesh position={[0, 0.35, -0.6]} rotation={[-0.05, 0, 0]}>
                <boxGeometry args={[3.2, 0.45, 0.9]} />
                <meshStandardMaterial color={dashColor} roughness={0.85} />
            </mesh>
            {/* Dashboard top surface */}
            <mesh position={[0, 0.58, -0.7]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[3.2, 0.06, 0.7]} />
                <meshStandardMaterial color="#111122" roughness={0.9} />
            </mesh>

            {/* Instrument cluster cowl (behind steering) */}
            <mesh position={[-0.55, 0.6, -0.75]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[0.9, 0.25, 0.5]} />
                <meshStandardMaterial color="#0d0d1a" />
            </mesh>
            {/* Speedometer dial */}
            <mesh position={[-0.55, 0.58, -0.49]} rotation={[-0.3, 0, 0]}>
                <circleGeometry args={[0.14, 32]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-0.55, 0.59, -0.48]} rotation={[-0.3, 0, 0]}>
                <torusGeometry args={[0.13, 0.012, 8, 32, Math.PI * 1.5]} />
                <meshStandardMaterial color="#fb923c" emissive="#f97316" emissiveIntensity={1.5} />
            </mesh>
            {/* RPM dial */}
            <mesh position={[-0.25, 0.58, -0.49]} rotation={[-0.3, 0, 0]}>
                <circleGeometry args={[0.1, 32]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-0.25, 0.59, -0.48]} rotation={[-0.3, 0, 0]}>
                <torusGeometry args={[0.09, 0.01, 8, 32, Math.PI * 1.5]} />
                <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.2} />
            </mesh>

            {/* Center infotainment screen */}
            <group position={[0.4, 0.52, -0.5]}>
                <mesh>
                    <boxGeometry args={[0.65, 0.38, 0.04]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
                <mesh position={[0, 0, 0.025]}>
                    <planeGeometry args={[0.58, 0.32]} />
                    <meshStandardMaterial color="#1a4a2e" emissive="#166534" emissiveIntensity={0.6} />
                </mesh>
            </group>

            {/* Center air vents */}
            {[-0.05, 0.15].map((y, i) => (
                <mesh key={i} position={[0.4, 0.28 + y * 0.5, -0.34]}>
                    <boxGeometry args={[0.5, 0.04, 0.02]} />
                    <meshStandardMaterial color="#333344" />
                </mesh>
            ))}

            {/* Gear stick */}
            <group position={[0.3, 0.15, 0.1]}>
                <mesh>
                    <boxGeometry args={[0.25, 0.08, 0.25]} />
                    <meshStandardMaterial color="#111122" />
                </mesh>
                <mesh position={[0, 0.15, 0]} rotation={[-0.15, 0, 0]}>
                    <cylinderGeometry args={[0.018, 0.025, 0.25]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
                </mesh>
                <mesh position={[0, 0.3, -0.02]}>
                    <sphereGeometry args={[0.04]} />
                    <meshStandardMaterial color="#0f0f0f" metalness={0.6} roughness={0.3} />
                </mesh>
            </group>

            {/* ===== STEERING WHEEL ===== */}
            <group ref={steeringRef} position={[-0.35, 0.75, -0.35]} rotation={[-0.3, 0, 0]}>
                {/* Rim */}
                <mesh>
                    <torusGeometry args={[0.35, 0.035, 16, 48]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.2} />
                </mesh>
                {/* Center hub */}
                <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.03]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                {/* Horn pad / logo area */}
                <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.04]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                {/* 3 Spokes */}
                <mesh position={[0, -0.17, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
                    <boxGeometry args={[0.07, 0.025, 0.22]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[-0.15, 0.09, -0.02]} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
                    <boxGeometry args={[0.07, 0.025, 0.22]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[0.15, 0.09, -0.02]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
                    <boxGeometry args={[0.07, 0.025, 0.22]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                {/* Column behind wheel */}
                <mesh position={[0, -0.15, 0.15]} rotation={[0.4, 0, 0]}>
                    <cylinderGeometry args={[0.04, 0.05, 0.45]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
            </group>

            {/* ===== REAR VIEW MIRROR ===== */}
            <group position={[0, 2.0, -1.3]}>
                <mesh position={[0, 0.08, 0]} rotation={[0.3, 0, 0]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.15]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>
                <mesh>
                    <boxGeometry args={[0.5, 0.2, 0.04]} />
                    <meshStandardMaterial color={trimColor} />
                </mesh>
                <mesh position={[0, 0, 0.025]}>
                    <planeGeometry args={[0.45, 0.16]} />
                    <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.3} />
                </mesh>
            </group>

            {/* ===== LEFT SIDE MIRROR ===== */}
            <group position={[-1.75, 1.1, -0.9]}>
                <mesh rotation={[0, 0.6, 0]}>
                    <boxGeometry args={[0.35, 0.22, 0.04]} />
                    <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.3} />
                </mesh>
                <mesh position={[0.03, 0, 0.03]} rotation={[0, 0.6, 0]}>
                    <planeGeometry args={[0.3, 0.18]} />
                    <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.25} />
                </mesh>
            </group>

            {/* ===== RIGHT SIDE MIRROR ===== */}
            <group position={[1.75, 1.1, -0.9]}>
                <mesh rotation={[0, -0.6, 0]}>
                    <boxGeometry args={[0.35, 0.22, 0.04]} />
                    <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.3} />
                </mesh>
                <mesh position={[-0.03, 0, 0.03]} rotation={[0, -0.6, 0]}>
                    <planeGeometry args={[0.3, 0.18]} />
                    <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.25} />
                </mesh>
            </group>

            {/* ===== ROOF INTERIOR ===== */}
            <mesh position={[0, 2.25, 0.2]}>
                <boxGeometry args={[3.5, 0.06, 3.0]} />
                <meshStandardMaterial color="#e5e5e5" roughness={0.95} />
            </mesh>

            {/* ===== DOOR PANELS (sides) ===== */}
            <mesh position={[-1.7, 1.1, 0.1]}>
                <boxGeometry args={[0.08, 1.4, 2.0]} />
                <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
            </mesh>
            <mesh position={[1.7, 1.1, 0.1]}>
                <boxGeometry args={[0.08, 1.4, 2.0]} />
                <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
            </mesh>
            {/* Door armrests */}
            <mesh position={[-1.65, 0.85, 0.15]}>
                <boxGeometry args={[0.1, 0.08, 0.6]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[1.65, 0.85, 0.15]}>
                <boxGeometry args={[0.1, 0.08, 0.6]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
        </group>
    );
}

// Simple Tree Component
function Tree({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.3, 2]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 3, 0]} castShadow>
                <coneGeometry args={[1.5, 3, 8]} />
                <meshStandardMaterial color="#15803d" roughness={0.8} />
            </mesh>
            <mesh position={[0, 4.5, 0]} castShadow>
                <coneGeometry args={[1.2, 2.5, 8]} />
                <meshStandardMaterial color="#16a34a" roughness={0.8} />
            </mesh>
        </group>
    );
}

function GridRoad({ speed }: { speed: number }) {
    const gridRef = useRef<THREE.GridHelper>(null);
    const treesRef = useRef<THREE.Group>(null);
    const initialTrees = Array.from({ length: 40 }).map((_, i) => {
        // Distribute trees on both sides of the road
        const side = Math.random() > 0.5 ? 1 : -1;
        const xOffset = side * (5 + Math.random() * 10);
        const zOffset = -Math.random() * 200;
        return { x: xOffset, z: zOffset, key: i };
    });
    
    const [trees] = useState(initialTrees);

    useFrame((_, delta) => {
        if (gridRef.current) {
            gridRef.current.position.z += speed * delta;
            if (gridRef.current.position.z > 10) {
                gridRef.current.position.z -= 10;
            }
        }
        
        // Move trees backward
        if (treesRef.current) {
            treesRef.current.children.forEach((tree) => {
                tree.position.z += speed * delta;
                if (tree.position.z > 20) {
                    tree.position.z = -180 - Math.random() * 20; // reset far ahead
                }
            });
        }
    });

    return (
        <group>
            {/* Grass Terrain */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
                <planeGeometry args={[200, 400]} />
                <meshStandardMaterial color="#22c55e" /> {/* green-500 */}
            </mesh>
            
            {/* Solid Cartoonish Road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[10, 400]} />
                <meshStandardMaterial color="#be8e7a" /> {/* brownish warm road like image */}
            </mesh>
            
            {/* Road Edges */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.01, 0]}>
                <planeGeometry args={[0.3, 400]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.01, 0]}>
                <planeGeometry args={[0.3, 400]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Moving Grid Lines for Speed Illusion (optional, kept for effect on road) */}
            <gridHelper ref={gridRef} args={[10, 10, '#8c6a5a', '#be8e7a']} position={[0, 0.01, 0]} />

            {/* Moving Center Line */}
            {Array.from({ length: 20 }).map((_, i) => (
                <mesh key={i} position={[0, 0.02, -100 + i * 10]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.2, 4]} />
                    <meshStandardMaterial color="#fbbf24" />
                </mesh>
            ))}
            
            {/* Trees */}
            <group ref={treesRef}>
                {trees.map((t) => (
                    <Tree key={t.key} position={[t.x, 0, t.z]} />
                ))}
            </group>
        </group>
    );
}

export default function Equations3DActivity() {
    const [u, setU] = useState<number>(0);
    const [a, setA] = useState<number>(2);
    const [t, setT] = useState<number>(5);
    const [customT, setCustomT] = useState<string>('');

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentV, setCurrentV] = useState(u);
    const [currentS, setCurrentS] = useState(0);

    // Run the physical simulation
    useEffect(() => {
        let animationFrame: number;
        let lastTime = performance.now();

        const updateSimulation = (now: number) => {
            if (!isPlaying) return;

            const delta = (now - lastTime) / 1000;
            lastTime = now;

            setCurrentTime((prev) => {
                const newTime = prev + delta;
                if (newTime >= t) {
                    setIsPlaying(false);
                    return t; // Cap at max time
                }
                return newTime;
            });

            animationFrame = requestAnimationFrame(updateSimulation);
        };

        if (isPlaying) {
            lastTime = performance.now();
            animationFrame = requestAnimationFrame(updateSimulation);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying, t]);

    // Recalculate kinematics based on current time
    useEffect(() => {
        const v = u + (a * currentTime);
        const s = (u * currentTime) + (0.5 * a * currentTime * currentTime);
        setCurrentV(v);
        setCurrentS(s);
    }, [currentTime, u, a]);

    const handleStart = () => {
        setCurrentTime(0);
        setCurrentV(u);
        setCurrentS(0);
        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setCurrentV(u);
        setCurrentS(0);
    };

    // Calculate Final Goal for Display
    const finalV = u + (a * t);
    const finalS = (u * t) + (0.5 * a * t * t);

    return (
        <div className="w-full bg-slate-900 rounded-[3rem] border-8 border-slate-700 shadow-2xl my-16 overflow-hidden flex flex-col md:flex-row h-[700px]">

            {/* Control Panel (Left) */}
            <div className="w-full md:w-1/3 bg-slate-800 p-8 flex flex-col gap-6 text-slate-200 shadow-xl z-10 border-r-4 border-slate-700">
                <h3 className="text-2xl font-black text-rose-400 uppercase tracking-widest mb-2 font-mono">Control Desk</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Initial Velocity (u) m/s</label>
                        <input type="range" min="0" max="50" step="1" value={u} onChange={(e) => { setU(Number(e.target.value)); handleReset(); }} disabled={isPlaying} className="w-full accent-rose-500" />
                        <div className="text-right font-mono text-xl">{u}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Acceleration (a) m/s²</label>
                        <input type="range" min="-10" max="20" step="1" value={a} onChange={(e) => { setA(Number(e.target.value)); handleReset(); }} disabled={isPlaying} className="w-full accent-emerald-500" />
                        <div className="text-right font-mono text-xl">{a}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Time Goal (t) sec</label>
                        <div className="flex gap-2">
                            <input type="range" min="1" max="20" step="1" value={t} onChange={(e) => { setT(Number(e.target.value)); setCustomT(''); handleReset(); }} disabled={isPlaying} className="w-full accent-sky-500" />
                            <input 
                                type="number" 
                                placeholder="sec"
                                value={customT}
                                onChange={(e) => {
                                    setCustomT(e.target.value);
                                    const num = Number(e.target.value);
                                    if (num > 0) {
                                        setT(num);
                                        handleReset();
                                    }
                                }}
                                disabled={isPlaying}
                                className="w-16 h-8 bg-slate-900 border border-slate-600 rounded text-center text-sm font-bold text-white outline-sky-500 hide-arrows"
                            />
                        </div>
                        <div className="text-right font-mono text-xl">{t}</div>
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={isPlaying ? handleReset : handleStart}
                        className={`flex-1 py-4 rounded-xl font-black text-xl uppercase transition-colors ${isPlaying ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'}`}
                    >
                        {isPlaying ? 'STOP' : 'DRIVE'}
                    </button>
                    {!isPlaying && currentTime > 0 && (
                        <button onClick={handleReset} className="px-6 bg-slate-600 hover:bg-slate-500 rounded-xl font-bold uppercase">Reset</button>
                    )}
                </div>

                <div className="mt-auto bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-2">Equations Check</p>
                    <p className="font-mono text-sm mb-1"><span className="text-emerald-400">v</span> = {u} + ({a})({t}) = <strong className="text-emerald-400">{finalV.toFixed(1)}</strong></p>
                    <p className="font-mono text-sm"><span className="text-sky-400">s</span> = {u}({t}) + ½({a})({t})² = <strong className="text-sky-400">{finalS.toFixed(1)}</strong></p>
                </div>
            </div>

            {/* 3D Simulation Canvas (Right) */}
            <div className="w-full md:w-2/3 h-full relative">

                {/* HUD Overlay */}
                <div className="absolute top-6 left-6 z-10 flex gap-4 pointer-events-none">
                    <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase">Time (t)</p>
                        <p className="text-3xl font-mono font-black text-white">{currentTime.toFixed(1)} <span className="text-sm">s</span></p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase">Velocity (v)</p>
                        <p className="text-3xl font-mono font-black text-emerald-400">{currentV.toFixed(1)} <span className="text-sm">m/s</span></p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase">Distance (s)</p>
                        <p className="text-3xl font-mono font-black text-sky-400">{currentS.toFixed(1)} <span className="text-sm">m</span></p>
                    </div>
                </div>

                <Canvas shadows>
                    {/* Driver eye-level camera — looking forward through windshield */}
                    <PerspectiveCamera makeDefault position={[0, 1.45, 0.5]} rotation={[-0.12, 0, 0]} fov={68} />
                    <color attach="background" args={['#87ceeb']} />
                    <fog attach="fog" args={['#87ceeb', 40, 180]} />

                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 25, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
                    <Environment preset="city" />

                    <GridRoad speed={currentV} />
                    <DriverPOVCar speed={currentV} />

                </Canvas>
            </div>
        </div>
    );
}
