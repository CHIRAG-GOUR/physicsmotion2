import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, Line, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Points for the winding path (Distance)
const pathPoints = [
    new THREE.Vector3(-3, 0.1, 2),   // Start
    new THREE.Vector3(-2, 0.1, 0),
    new THREE.Vector3(0, 0.1, 1.5),
    new THREE.Vector3(1, 0.1, -1),
    new THREE.Vector3(3, 0.1, -1.5)  // Finish
];

function WindingPath() {
    return (
        <group>
            {/* The winding Distance line */}
            <Line
                points={pathPoints}
                color="#ec4899" // Pink-500
                lineWidth={5}
                dashed={false}
            />
            {/* Floating Label for Distance */}
            <Html position={[0, 0.5, 1.5]} center>
                <div className="bg-pink-50/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border-2 border-pink-200 pointer-events-none whitespace-nowrap">
                    <span className="text-pink-600 font-bold text-sm">〰️ Distance (Total Path)</span>
                </div>
            </Html>
        </group>
    );
}

function DisplacementArrow() {
    const start = pathPoints[0];
    const end = pathPoints[pathPoints.length - 1];

    // Calculate direction and length
    const direction = end.clone().sub(start);
    const length = direction.length();

    return (
        <group>
            {/* The straight Displacement arrow */}
            <arrowHelper
                args={[direction.normalize(), start, length, 0x3b82f6, 0.5, 0.3]}
            />
            {/* Floating Label for Displacement */}
            <Html position={[0, 0.5, 0.25]} center>
                <div className="bg-blue-50/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border-2 border-blue-200 pointer-events-none whitespace-nowrap">
                    <span className="text-blue-600 font-bold text-sm">➡️ Displacement (Shortcut)</span>
                </div>
            </Html>
        </group>
    );
}

function MovingCar() {
    const carRef = useRef<THREE.Group>(null);

    // Create a smooth curve from points for the animation
    const curve = useMemo(() => new THREE.CatmullRomCurve3(pathPoints), []);

    useFrame((state) => {
        if (carRef.current) {
            // Loop from 0 to 1 over 5 seconds
            const t = (state.clock.elapsedTime % 5) / 5;
            const position = curve.getPoint(t);
            carRef.current.position.copy(position);

            // Make car face the direction of movement
            const tangent = curve.getTangent(t);
            const lookAtTarget = position.clone().add(tangent);
            carRef.current.lookAt(lookAtTarget);
        }
    });

    return (
        <group ref={carRef}>
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[0.8, 0.5, 0.4]} />
                <meshStandardMaterial color="#fcd34d" roughness={0.2} metalness={0.8} /> {/* Yellow Car */}
            </mesh>
            <Html position={[0, 1, 0]} center>
                <div className="text-2xl animate-bounce">🏎️</div>
            </Html>
        </group>
    );
}

// Markers for Start and End
function LocationMarkers() {
    return (
        <group>
            <group position={pathPoints[0]}>
                <Sphere args={[0.3, 16, 16]} position={[0, 0.3, 0]}>
                    <meshStandardMaterial color="#22c55e" /> {/* Green Start */}
                </Sphere>
                <Html position={[0, 0.8, 0]} center>
                    <span className="font-bold text-green-700 bg-white/80 px-2 py-0.5 rounded shadow-sm text-xs uppercase tracking-wider">Start A</span>
                </Html>
            </group>

            <group position={pathPoints[pathPoints.length - 1]}>
                <Sphere args={[0.3, 16, 16]} position={[0, 0.3, 0]}>
                    <meshStandardMaterial color="#ef4444" /> {/* Red Finish */}
                </Sphere>
                <Html position={[0, 0.8, 0]} center>
                    <span className="font-bold text-red-700 bg-white/80 px-2 py-0.5 rounded shadow-sm text-xs uppercase tracking-wider">Finish B</span>
                </Html>
            </group>
        </group>
    );
}

export default function Distance3DModel() {
    return (
        <div className="w-full flex justify-center mb-16">
            <div className="w-full max-w-4xl p-8 bg-purple-50/50 rounded-[3rem] border-[6px] border-purple-200 shadow-[0_12px_30px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center">

                <h3 className="text-3xl font-extrabold text-purple-900 mb-2 text-center">Interactive 3D Model: Distance vs Displacement</h3>
                <p className="text-lg text-purple-700 font-medium mb-6 text-center max-w-2xl">
                    Drag around to inspect! The car takes the winding <b>pink path (Distance)</b>, but the <b>blue arrow (Displacement)</b> points straight from Start to Finish.
                </p>

                <div className="w-full h-[400px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-purple-100 to-white border-4 border-white shadow-inner cursor-move">
                    <Canvas shadows camera={{ position: [0, 8, 8], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} castShadow intensity={1} shadow-mapSize={1024} />

                        {/* Floor */}
                        <gridHelper args={[20, 20, 0xc084fc, 0xf3e8ff]} position={[0, -0.01, 0]} />

                        <WindingPath />
                        <DisplacementArrow />
                        <LocationMarkers />
                        <MovingCar />

                        <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={20} blur={2} far={4.5} />

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
