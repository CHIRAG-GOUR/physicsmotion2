import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// A moving car/box
function MovingObject() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [speed] = useState(2); // units per second

    useFrame((state) => {
        if (meshRef.current) {
            // Move back and forth along X axis
            const time = state.clock.getElapsedTime();
            meshRef.current.position.x = Math.sin(time * speed) * 4;
        }
    });

    return (
        <group>
            <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[1.5, 1, 2]} />
                <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.5} />

                {/* Floating Label tracking the object */}
                <Html position={[0, 1.2, 0]} center sprite transform={false}>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border-2 border-blue-200 pointer-events-none whitespace-nowrap animate-pulse">
                        <span className="text-blue-700 font-bold">🚍 Bus (Moving)</span>
                    </div>
                </Html>
            </mesh>
        </group>
    );
}

// A stationary reference point
function ReferencePoint() {
    return (
        <group position={[-2, 0, 2]}>
            <mesh position={[0, 1, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 2]} />
                <meshStandardMaterial color="#8b5cf6" />
                <Html position={[0, 1.2, 0]} center>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border-2 border-purple-200 pointer-events-none whitespace-nowrap">
                        <span className="text-purple-700 font-bold">📍 Reference Point (Rest)</span>
                    </div>
                </Html>
            </mesh>
            {/* Base of pole */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.2]} />
                <meshStandardMaterial color="#4c1d95" />
            </mesh>
        </group>
    );
}

export default function Motion3DModel() {
    return (
        <div className="w-full flex justify-center mb-16">
            <div className="w-full max-w-4xl p-8 bg-blue-50/50 rounded-[3rem] border-[6px] border-blue-200 shadow-[0_12px_30px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center">

                <h3 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">Interactive 3D Model: Relative Motion</h3>
                <p className="text-lg text-blue-700 font-medium mb-6 text-center max-w-2xl">
                    Drag around to change your camera angle! Notice how the <b>Moving Bus</b> constantly changes its distance from the <b>Stationary Reference Point</b>.
                </p>

                {/* 3D Canvas Container */}
                <div className="w-full h-[400px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-blue-100 to-white border-4 border-white shadow-inner cursor-move">
                    <Canvas shadows camera={{ position: [5, 5, 8], fov: 40 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} castShadow intensity={1} shadow-mapSize={1024} />

                        {/* The Grid / Floor */}
                        <gridHelper args={[20, 20, 0x93c5fd, 0xeff6ff]} position={[0, -0.01, 0]} />

                        <MovingObject />
                        <ReferencePoint />

                        {/* Beautiful baked shadows */}
                        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />

                        <OrbitControls
                            enablePan={false}
                            minPolarAngle={Math.PI / 6}
                            maxPolarAngle={Math.PI / 2 - 0.05}
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
