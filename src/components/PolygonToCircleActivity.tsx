import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Circle, Square, Octagon } from 'lucide-react';

export default function PolygonToCircleActivity() {
    const [sides, setSides] = useState<number>(4);

    // To animate a dot along the path, we use framer-motion path drawing principles
    // but in a more experiential way. We will define SVG paths based on the number of sides.
    const getPolygonPath = (numSides: number, radius: number, cx: number, cy: number) => {
        if (numSides > 30) {
            // Treat as circle
            return `M ${cx - radius}, ${cy} a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`;
        }

        let path = '';
        for (let i = 0; i <= numSides; i++) {
            // Start from top, go clockwise
            const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            if (i === 0) {
                path += `M ${x} ${y} `;
            } else {
                path += `L ${x} ${y} `;
            }
        }
        return path;
    };

    const radius = 120;
    const center = 150;
    const currentPath = getPolygonPath(sides, radius, center, center);

    return (
        <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl border-4 border-slate-100 flex flex-col md:flex-row items-center gap-12">

            <div className="w-full md:w-1/2">
                <span className="bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block">Interactive Visualizer</span>
                <h3 className="text-3xl font-black text-slate-800 mb-4">Geometry of Motion</h3>
                <p className="text-slate-600 font-medium mb-8">
                    An object moving in a circle is essentially moving along a polygon with an <strong>infinite number of sides</strong>. Slide the control to see how increasing the sides smoothing turns the path into a perfect circle.
                </p>

                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-slate-500 uppercase text-sm tracking-wide">Number of Sides</span>
                        <span className="font-black text-2xl text-sky-500">{sides > 30 ? '∞' : sides}</span>
                    </div>

                    <input
                        type="range"
                        min="4"
                        max="32"
                        step="2"
                        value={sides}
                        onChange={(e) => setSides(Number(e.target.value))}
                        className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500 mb-6"
                    />

                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-slate-400">
                        <div className={`p-2 rounded-xl border-2 transition-colors ${sides === 4 ? 'bg-sky-50 border-sky-300 text-sky-600' : 'border-transparent'}`}><Square className="w-6 h-6 mx-auto mb-1" />Square</div>
                        <div className={`p-2 rounded-xl border-2 transition-colors ${sides === 6 ? 'bg-sky-50 border-sky-300 text-sky-600' : 'border-transparent'}`}><Hexagon className="w-6 h-6 mx-auto mb-1" />Hexagon</div>
                        <div className={`p-2 rounded-xl border-2 transition-colors ${sides === 8 ? 'bg-sky-50 border-sky-300 text-sky-600' : 'border-transparent'}`}><Octagon className="w-6 h-6 mx-auto mb-1" />Octagon</div>
                        <div className={`p-2 rounded-xl border-2 transition-colors ${sides > 30 ? 'bg-sky-50 border-sky-300 text-sky-600' : 'border-transparent'}`}><Circle className="w-6 h-6 mx-auto mb-1" />Circle</div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center relative">
                {/* Visualizer Grid Background */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none rounded-full overflow-hidden">
                    {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-slate-400"></div>)}
                </div>

                <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-xl relative z-10 overflow-visible">
                    {/* The Track Base */}
                    <path
                        d={currentPath}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out"
                    />
                    {/* The Inner Track Line */}
                    <path
                        d={currentPath}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out"
                    />

                    {/* The Animated Athlete (Car/Dot) tracing the path */}
                    <motion.path
                        d={currentPath}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="12"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    />

                    {/* Center Point */}
                    <circle cx={center} cy={center} r="4" fill="#64748b" />

                    {/* Radius line indicator for circle mode */}
                    {sides > 30 && (
                        <motion.line
                            x1={center} y1={center} x2={center} y2={center - radius}
                            stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        />
                    )}
                </svg>

                {/* Corner annotations */}
                <div className="absolute top-0 right-0 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg transform translate-x-4 -translate-y-4">
                    Direction Changes: {sides > 30 ? 'Infinite' : sides}
                </div>
            </div>

        </div>
    );
}
