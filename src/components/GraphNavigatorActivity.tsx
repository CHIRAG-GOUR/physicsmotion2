import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

export default function GraphNavigatorActivity() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [mode, setMode] = useState<'uniform' | 'non-uniform'>('uniform');
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const animate = (t: number) => {
        if (lastTimeRef.current !== undefined) {
            const deltaTime = (t - lastTimeRef.current) / 1000;
            if (isPlaying) {
                setTime(prev => Math.min(prev + deltaTime * 2, 10));
            }
        }
        lastTimeRef.current = t;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying]);

    useEffect(() => {
        if (time >= 10) setIsPlaying(false);
    }, [time]);

    const getDistance = (t: number) => {
        if (mode === 'uniform') return t * 20; // Constant speed
        return 0.5 * 4 * t * t; // Acceleration
    };

    const getVelocity = (t: number) => {
        if (mode === 'uniform') return 20;
        return 4 * t;
    };

    // Graph scaling
    const w = 400;
    const h = 200;
    const padding = 30;

    const renderGraph = (type: 'dist' | 'vel') => {
        const points: string[] = [];
        for (let i = 0; i <= time; i += 0.1) {
            const val = type === 'dist' ? getDistance(i) : getVelocity(i);
            const maxVal = type === 'dist' ? 200 : 40;
            const x = padding + (i / 10) * (w - padding * 2);
            const y = h - padding - (val / maxVal) * (h - padding * 2);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    };

    return (
        <div className="my-16 bg-white rounded-[3.5rem] border-4 border-slate-100 shadow-2xl p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">The Real-Time Navigator 📊</h3>
                    <p className="text-slate-500 font-medium">Watch graphs generate as the car moves!</p>
                </div>
                <div className="flex gap-4 bg-slate-50 p-3 rounded-3xl border-2 border-slate-100">
                    <button
                        onClick={() => { setMode('uniform'); setTime(0); }}
                        className={`px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'uniform' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Uniform
                    </button>
                    <button
                        onClick={() => { setMode('non-uniform'); setTime(0); }}
                        className={`px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'non-uniform' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Accelerated
                    </button>
                </div>
            </div>

            {/* Road/Car Simulation */}
            <div className="w-full h-32 bg-slate-900 rounded-[2.5rem] mb-12 relative overflow-hidden flex items-center border-b-8 border-slate-800 shadow-inner">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute h-1 w-12 bg-white top-1/2 left-0" style={{ marginLeft: `${i * 10}%`, opacity: 0.5 }} />
                    ))}
                </div>

                <motion.div
                    className="relative z-10 flex flex-col items-center"
                    style={{ left: `${(time / 10) * 85}%` }}
                >
                    <div className="text-4xl">🏎️</div>
                    <div className="mt-2 bg-indigo-500 text-white px-3 py-1 rounded-full font-black text-[10px] whitespace-nowrap shadow-lg">
                        {Math.round(getDistance(time))}m
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distance Graph */}
                <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-slate-100">
                    <div className="flex items-center gap-2 mb-4 text-indigo-600 font-black text-xs uppercase tracking-widest">
                        <Activity className="w-4 h-4" /> Distance-Time Graph
                    </div>
                    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
                        <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="#cbd5e1" strokeWidth="2" />
                        <line x1={padding} y1={padding} x2={padding} y2={h - padding} stroke="#cbd5e1" strokeWidth="2" />
                        <polyline points={renderGraph('dist')} fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
                        {time > 0 && <circle cx={padding + (time / 10) * (w - padding * 2)} cy={h - padding - (getDistance(time) / 200) * (h - padding * 2)} r="4" fill="#6366f1" />}
                    </svg>
                </div>

                {/* Velocity Graph */}
                <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-slate-100">
                    <div className="flex items-center gap-2 mb-4 text-emerald-600 font-black text-xs uppercase tracking-widest">
                        <Activity className="w-4 h-4" /> Velocity-Time Graph
                    </div>
                    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
                        <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="#cbd5e1" strokeWidth="2" />
                        <line x1={padding} y1={padding} x2={padding} y2={h - padding} stroke="#cbd5e1" strokeWidth="2" />
                        <polyline points={renderGraph('vel')} fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                        {time > 0 && <circle cx={padding + (time / 10) * (w - padding * 2)} cy={h - padding - (getVelocity(time) / 40) * (h - padding * 2)} r="4" fill="#10b981" />}
                    </svg>
                </div>
            </div>

            <div className="mt-10 flex justify-center gap-6">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${isPlaying ? 'bg-amber-100 text-amber-600' : 'bg-emerald-600 text-white hover:scale-105 active:scale-95'}`}
                >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
                <button
                    onClick={() => { setTime(0); setIsPlaying(false); }}
                    className="w-20 h-20 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-all shadow-lg active:scale-95"
                >
                    <RotateCcw className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}
