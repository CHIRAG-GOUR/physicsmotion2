import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

// Constant Velocity Car
function UniformCar() {
    const carRef = useRef<THREE.Group>(null);
    const speed = 2; // Constant speed

    useFrame((state) => {
        if (carRef.current) {
            // Loop from -4 to 4
            const time = state.clock.getElapsedTime();
            const xPos = -4 + ((time * speed) % 8);
            carRef.current.position.x = xPos;
        }
    });

    return (
        <group ref={carRef} position={[-4, 0.3, -1]}>
            <mesh castShadow>
                <boxGeometry args={[0.8, 0.4, 0.4]} />
                <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.8} /> {/* Blue Car */}
            </mesh>
            <Html position={[0, 0.8, 0]} center zIndexRange={[100, 0]}>
                <div className="bg-blue-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border-2 border-blue-400 pointer-events-none flex flex-col items-center">
                    <span className="text-white text-xs font-bold uppercase">Uniform Car</span>
                    <span className="text-blue-300 font-mono text-sm leading-tight">20 m/s</span>
                </div>
            </Html>
        </group>
    );
}

// Accelerating Car
function AcceleratingCar() {
    const carRef = useRef<THREE.Group>(null);
    const speedRef = useRef(0);

    useFrame((state, delta) => {
        if (carRef.current) {
            // Calculate a looping acceleration
            const time = state.clock.getElapsedTime() % 4; // 4 second loop

            // Starts slow, speeds up rapidly
            const currentSpeed = time * 1.5;
            speedRef.current = currentSpeed;

            // Position based on integral of speed (0.5 * a * t^2)
            const xPos = -4 + (0.5 * 1.5 * time * time);
            carRef.current.position.x = Math.min(xPos, 4); // Cap at edge
        }
    });

    return (
        <group ref={carRef} position={[-4, 0.3, 1]}>
            <mesh castShadow>
                <boxGeometry args={[0.8, 0.4, 0.4]} />
                <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.8} /> {/* Red Car */}
            </mesh>
            <Html position={[0, 0.8, 0]} center zIndexRange={[100, 0]}>
                <div className="bg-red-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border-2 border-red-400 pointer-events-none flex flex-col items-center">
                    <span className="text-white text-xs font-bold uppercase transition-transform">Accelerating</span>
                    {/* Using a custom hook/state for high-freq updates in Html is heavy, 
                        so we rely on CSS or static representations. Let's show "Changing Speed" */}
                    <span className="text-red-300 font-mono text-sm leading-tight animate-pulse">Variable m/s</span>
                </div>
            </Html>
        </group>
    );
}

function Racetrack() {
    return (
        <group>
            {/* Track base */}
            <mesh position={[0, -0.05, 0]} receiveShadow>
                <planeGeometry args={[10, 4]} />
                <meshStandardMaterial color="#334155" /> {/* Dark Slate */}
            </mesh>

            {/* Center line (dashed) */}
            {[-4, -2, 0, 2, 4].map((x, i) => (
                <mesh key={i} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[1, 0.1]} />
                    <meshBasicMaterial color="#fcd34d" />
                </mesh>
            ))}

            {/* Start Line */}
            <mesh position={[-4, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 4]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <Text position={[-4.5, 0.1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.4} color="white">
                START
            </Text>

            {/* Finish Line */}
            <mesh position={[4, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 4]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <Text position={[4.5, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.4} color="white">
                FINISH
            </Text>
        </group>
    );
}

export default function Velocity3DModel() {
    return (
        <div className="w-full flex justify-center mt-12 mb-16">
            <div className="w-full max-w-5xl p-8 bg-emerald-50/50 rounded-[3rem] border-[6px] border-emerald-200 shadow-[0_12px_30px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center">

                <h3 className="text-3xl font-extrabold text-emerald-900 mb-2 text-center">Interactive 3D Model: Uniform vs Variable Velocity</h3>
                <p className="text-lg text-emerald-700 font-medium mb-6 text-center max-w-3xl">
                    The <b>Blue Car</b> maintains a constant, uniform speed. The <b>Red Car</b> accelerates from rest, meaning its velocity is constantly changing!
                </p>

                <div className="w-full h-[350px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-sky-200 to-emerald-100 border-4 border-white shadow-inner cursor-move relative">
                    <Canvas shadows camera={{ position: [0, 6, 6], fov: 40 }}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[5, 10, 5]} castShadow intensity={1.5} shadow-mapSize={1024} />

                        <Racetrack />
                        <UniformCar />
                        <AcceleratingCar />

                        <ContactShadows position={[0, -0.04, 0]} opacity={0.5} scale={20} blur={2} far={4.5} />

                        <OrbitControls
                            enablePan={false}
                            minPolarAngle={Math.PI / 8}
                            maxPolarAngle={Math.PI / 2 - 0.1}
                            minDistance={5}
                            maxDistance={15}
                        />
                        <Environment preset="city" />
                    </Canvas>
                </div>
            </div>
        </div>
    );
}
