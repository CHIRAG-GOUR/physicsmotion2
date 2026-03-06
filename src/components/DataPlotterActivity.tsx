import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, RefreshCcw, Info } from 'lucide-react';

const ferozData = [
    { time: 0, dist: 0 },
    { time: 5, dist: 1.0 },
    { time: 10, dist: 1.9 },
    { time: 15, dist: 2.8 },
    { time: 20, dist: 3.6 },
    { time: 25, dist: 4.5 },
];

const saniaData = [
    { time: 0, dist: 0 },
    { time: 5, dist: 0.8 },
    { time: 10, dist: 1.6 },
    { time: 15, dist: 2.3 },
    { time: 20, dist: 3.0 },
    { time: 25, dist: 3.6 },
];

export default function DataPlotterActivity() {
    const [step, setStep] = useState(0);
    const maxSteps = ferozData.length;

    const reset = () => setStep(0);
    const nextStep = () => setStep(prev => Math.min(prev + 1, maxSteps));

    // SVG scaling constants
    const w = 400;
    const h = 300;
    const padding = 40;
    const xScale = (w - padding * 2) / 25;
    const yScale = (h - padding * 2) / 5;

    const getX = (t: number) => padding + t * xScale;
    const getY = (d: number) => h - padding - d * yScale;

    return (
        <div className="my-16 bg-white rounded-[3.5rem] border-4 border-slate-100 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-3xl font-black mb-2">Bicycle Race Data Plotter 🚲</h3>
                        <p className="text-blue-100 font-medium italic">Feroz and Sania are cycling to school. Let's map their journey!</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/30 flex gap-4">
                        <button onClick={reset} className="hover:scale-110 transition-transform">
                            <RefreshCcw className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={step === maxSteps}
                            className="bg-white text-blue-600 px-6 py-2 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-50 disabled:opacity-50 transition-all"
                        >
                            <PlayCircle className="w-5 h-5" /> {step === 0 ? "Start Plotting" : "Plot Next Point"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 p-10 gap-12">
                {/* Statistics Table */}
                <div className="space-y-6">
                    <div className="overflow-hidden rounded-3xl border-2 border-slate-100">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-4 font-black text-slate-400 uppercase text-[10px] tracking-widest">Time (Min)</th>
                                    <th className="p-4 font-black text-blue-600 uppercase text-[10px] tracking-widest text-center">Feroz (km)</th>
                                    <th className="p-4 font-black text-rose-500 uppercase text-[10px] tracking-widest text-center">Sania (km)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {ferozData.map((d, idx) => (
                                    <motion.tr
                                        key={idx}
                                        animate={{ opacity: idx < step ? 1 : 0.3 }}
                                        className={idx < step ? "bg-white" : "bg-slate-50/50"}
                                    >
                                        <td className="p-4 font-bold text-slate-700">{d.time} min</td>
                                        <td className="p-4 font-mono font-black text-blue-600 text-center">{d.dist}</td>
                                        <td className="p-4 font-mono font-black text-rose-500 text-center">{saniaData[idx].dist}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-[2.5rem] flex gap-4">
                        <Info className="w-8 h-8 text-blue-500 shrink-0" />
                        <div>
                            <h4 className="font-black text-blue-900 mb-1 leading-none uppercase text-xs tracking-widest">Analysis</h4>
                            <p className="text-blue-800 font-medium text-sm">
                                {step === 0 ? "Click 'Start Plotting' to see how the graph takes shape based on the table data." :
                                    step < maxSteps ? "Look at how the lines are diverging. Who is moving faster?" :
                                        "Both started at the same time, but Feroz covered more distance in 25 minutes. His slope is steeper!"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Graph Visualization */}
                <div className="bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 p-8 flex flex-col items-center justify-center relative">
                    <svg width={w} height={h} className="overflow-visible">
                        {/* Grids */}
                        {[0, 1, 2, 3, 4, 5].map(tick => (
                            <line key={tick} x1={padding} y1={getY(tick)} x2={w - padding} y2={getY(tick)} stroke="#e2e8f0" strokeWidth="1" />
                        ))}
                        {[0, 5, 10, 15, 20, 25].map(tick => (
                            <line key={tick} x1={getX(tick)} y1={padding} x2={getX(tick)} y2={h - padding} stroke="#e2e8f0" strokeWidth="1" />
                        ))}

                        {/* Axis */}
                        <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="#1e293b" strokeWidth="3" markerEnd="url(#arrow)" />
                        <line x1={padding} y1={padding} x2={padding} y2={h - padding} stroke="#1e293b" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x={w - padding} y={h - padding + 20} textAnchor="end" className="fill-slate-400 font-black text-xs uppercase tracking-widest">Time (min)</text>
                        <text x={padding - 35} y={padding} textAnchor="start" transform={`rotate(-90, ${padding - 35}, ${padding})`} className="fill-slate-400 font-black text-xs uppercase tracking-widest">Distance (km)</text>

                        {/* Labels */}
                        {[0, 1.25, 2.5, 3.75, 5].map(val => (
                            <text key={val} x={padding - 10} y={getY(val)} textAnchor="end" className="fill-slate-400 font-bold text-[10px]">{val}</text>
                        ))}
                        {[0, 5, 10, 15, 20, 25].map(val => (
                            <text key={val} x={getX(val)} y={h - padding + 15} textAnchor="middle" className="fill-slate-400 font-bold text-[10px]">{val}</text>
                        ))}

                        {/* Lines */}
                        <motion.polyline
                            points={ferozData.slice(0, step).map(d => `${getX(d.time)},${getY(d.dist)}`).join(' ')}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <motion.polyline
                            points={saniaData.slice(0, step).map(d => `${getX(d.time)},${getY(d.dist)}`).join(' ')}
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data Points */}
                        {ferozData.slice(0, step).map((d, i) => (
                            <circle key={`f-${i}`} cx={getX(d.time)} cy={getY(d.dist)} r="5" fill="#2563eb" stroke="white" strokeWidth="2" />
                        ))}
                        {saniaData.slice(0, step).map((d, i) => (
                            <circle key={`s-${i}`} cx={getX(d.time)} cy={getY(d.dist)} r="5" fill="#f43f5e" stroke="white" strokeWidth="2" />
                        ))}
                    </svg>

                    <div className="absolute top-8 right-8 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-1 bg-blue-600 rounded-full" />
                            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Feroz</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-1 bg-rose-500 rounded-full" />
                            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Sania</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
