import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function VectorArrow() {
    const targetRef = useRef<THREE.Mesh>(null);
    const [position, setPosition] = useState(new THREE.Vector3(3, 2, 0));
    const [dragging, setDragging] = useState(false);

    // We animate the vector target slightly when not dragging
    // to show it's "alive" and to demonstrate real-time magnitude changes
    useFrame((state) => {
        if (!dragging && targetRef.current) {
            const time = state.clock.getElapsedTime();
            // Gentle orbit
            const x = Math.sin(time * 0.5) * 4;
            const z = Math.cos(time * 0.5) * 4;
            const y = 2 + Math.sin(time) * 1.5;

            targetRef.current.position.set(x, y, z);
            setPosition(new THREE.Vector3(x, y, z));
        }
    });

    // Calculate magnitude
    const magnitude = position.length().toFixed(1);

    return (
        <group>
            {/* Origin Marker */}
            <Sphere args={[0.2, 16, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#ef4444" />
                <Html position={[0, -0.5, 0]} center>
                    <span className="font-bold text-red-600 bg-white/80 px-2 py-1 rounded shadow-sm text-xs">Origin (0,0)</span>
                </Html>
            </Sphere>

            {/* The Vector Arrow */}
            <arrowHelper
                args={[
                    position.clone().normalize(),
                    new THREE.Vector3(0, 0, 0),
                    position.length(),
                    0x8b5cf6, // Violet-500
                    0.6,
                    0.4
                ]}
            />

            {/* The moving target/tip */}
            <mesh
                ref={targetRef}
                position={position}
                onPointerOver={() => setDragging(true)} // Pause animation on hover
                onPointerOut={() => setDragging(false)} // Resume animation
            >
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.5} />

                {/* Floating Stats Label */}
                <Html position={[0, 1, 0]} center zIndexRange={[100, 0]}>
                    <div className="bg-violet-900/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border-2 border-violet-400 pointer-events-none transform transition-transform hover:scale-105 flex flex-col items-center gap-1 w-48">
                        <span className="text-violet-200 text-xs font-bold uppercase tracking-wider">Vector Status</span>
                        <div className="flex justify-between w-full border-b border-violet-700 pb-1 mb-1">
                            <span className="text-white font-medium">Magnitude:</span>
                            <span className="text-green-400 font-bold font-mono">{magnitude}u</span>
                        </div>
                        <div className="flex justify-between w-full text-xs">
                            <span className="text-violet-300">Dir [X,Y,Z]:</span>
                            <span className="text-yellow-300 font-mono">
                                [{position.x.toFixed(1)}, {position.y.toFixed(1)}, {position.z.toFixed(1)}]
                            </span>
                        </div>
                    </div>
                </Html>
            </mesh>

            {/* Projection Lines to Ground */}
            <Line
                points={[
                    new THREE.Vector3(position.x, position.y, position.z),
                    new THREE.Vector3(position.x, 0, position.z)
                ]}
                color="#cbd5e1"
                dashed
                dashSize={0.2}
                dashScale={1}
                gapSize={0.1}
            />
        </group>
    );
}

export default function Vector3DModel() {
    return (
        <div className="w-full flex justify-center mt-12 mb-16">
            <div className="w-full max-w-4xl p-8 bg-indigo-50/50 rounded-[3rem] border-[6px] border-indigo-200 shadow-[0_12px_30px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center">

                <h3 className="text-3xl font-extrabold text-indigo-900 mb-2 text-center">Interactive 3D Model: Displacement Vector</h3>
                <p className="text-lg text-indigo-700 font-medium mb-6 text-center max-w-2xl">
                    Hover over the glowing purple tip to pause the vector! Notice how both the <b>Magnitude</b> (length) and <b>Direction</b> (X,Y,Z coords) update in real-time.
                </p>

                <div className="w-full h-[450px] rounded-[2rem] overflow-hidden bg-gradient-to-tr from-slate-900 to-indigo-900 border-4 border-indigo-100 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] cursor-move relative">
                    <Canvas shadows camera={{ position: [6, 4, 8], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} castShadow intensity={1} />

                        {/* Floor */}
                        <gridHelper args={[20, 20, 0x4f46e5, 0x312e81]} position={[0, 0, 0]} />
                        <axesHelper args={[5]} />

                        <VectorArrow />

                        <OrbitControls
                            enablePan={false}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI / 2}
                            minDistance={5}
                            maxDistance={15}
                            autoRotate
                            autoRotateSpeed={0.5}
                        />
                    </Canvas>

                    {/* Legend Overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-xs">
                        <div className="flex items-center gap-2 text-red-400 mb-1"><span className="w-3 h-0.5 bg-red-400"></span> X-Axis</div>
                        <div className="flex items-center gap-2 text-green-400 mb-1"><span className="w-3 h-0.5 bg-green-400"></span> Y-Axis (Up)</div>
                        <div className="flex items-center gap-2 text-blue-400"><span className="w-3 h-0.5 bg-blue-400"></span> Z-Axis</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
