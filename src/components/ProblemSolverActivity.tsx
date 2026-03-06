import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

export default function ProblemSolverActivity() {
    const [caseStudy, setCaseStudy] = useState<'case1' | 'case2'>('case1');

    const data = {
        case1: {
            title: "Case 1: Speeding Up! 🚀",
            description: "Rahul starts from a stationary position and attains a velocity of 6 m/s.",
            u: 0,
            v: 6,
            t: 30,
            color: "blue",
            icon: TrendingUp
        },
        case2: {
            title: "Case 2: Slowing Down! 🛑",
            description: "Rahul applies brakes, and his velocity drops from 6 m/s to 4 m/s.",
            u: 6,
            v: 4,
            t: 5,
            color: "rose",
            icon: TrendingDown
        }
    };

    const current = data[caseStudy];
    const acceleration = ((current.v - current.u) / current.t).toFixed(2);

    return (
        <div className="w-full bg-white rounded-[3.5rem] border-8 border-slate-100 shadow-2xl p-8 md:p-12 my-12 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h3 className="text-4xl font-black text-slate-800 flex items-center gap-3">
                        <Calculator className="w-10 h-10 text-indigo-500" />
                        Smart Solver: Rahul's Bicycle
                    </h3>
                    <p className="text-slate-500 font-medium mt-2">Interact with the data to see how acceleration is calculated.</p>
                </div>

                <div className="flex bg-slate-100 p-2 rounded-3xl gap-2 border-2 border-slate-200">
                    <button
                        onClick={() => setCaseStudy('case1')}
                        className={`px-6 py-3 rounded-2xl font-black transition-all ${caseStudy === 'case1' ? 'bg-white shadow-md text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        CASE 1
                    </button>
                    <button
                        onClick={() => setCaseStudy('case2')}
                        className={`px-6 py-3 rounded-2xl font-black transition-all ${caseStudy === 'case2' ? 'bg-white shadow-md text-rose-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        CASE 2
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Visual Representation */}
                <div className="space-y-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={caseStudy}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`p-8 rounded-[2.5rem] bg-${current.color}-50 border-4 border-${current.color}-100`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-4 bg-${current.color}-500 rounded-2xl text-white`}>
                                    <current.icon className="w-8 h-8" />
                                </div>
                                <h4 className={`text-2xl font-black text-${current.color}-700`}>{current.title}</h4>
                            </div>
                            <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                {current.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="grid grid-cols-3 gap-4">
                        <DataCard label="u (Initial)" value={`${current.u} m/s`} color={current.color} />
                        <DataCard label="v (Final)" value={`${current.v} m/s`} color={current.color} />
                        <DataCard label="t (Time)" value={`${current.t} s`} color={current.color} />
                    </div>
                </div>

                {/* The Math breakdown */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Calculator className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-sm">
                            <span className="w-8 h-[2px] bg-indigo-500"></span>
                            Step-by-Step Solution
                        </div>

                        <div className="space-y-8 font-mono">
                            <motion.div
                                key={`formula-${caseStudy}`}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-2xl"
                            >
                                <span className="text-slate-500">1. Formula:</span>
                                <div className="mt-2 text-3xl font-black text-indigo-300">
                                    a = (v - u) / t
                                </div>
                            </motion.div>

                            <motion.div
                                key={`sub-${caseStudy}`}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                className="text-2xl"
                            >
                                <span className="text-slate-500">2. Substitution:</span>
                                <div className="mt-2 text-3xl font-black">
                                    a = ({current.v} - {current.u}) / {current.t}
                                </div>
                            </motion.div>

                            <motion.div
                                key={`res-${caseStudy}`}
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                                className={`p-6 rounded-3xl border-4 border-${current.color}-500/30 bg-${current.color}-500/10`}
                            >
                                <span className="text-slate-500">3. Result:</span>
                                <div className={`mt-2 text-5xl font-black text-${current.color}-400 flex items-baseline gap-2`}>
                                    {acceleration}
                                    <span className="text-xl text-slate-400">m s⁻²</span>
                                </div>
                            </motion.div>
                        </div>

                        {caseStudy === 'case2' && (
                            <div className="flex items-center gap-3 bg-rose-500/20 text-rose-300 p-4 rounded-2xl border border-rose-500/30">
                                <AlertCircle className="w-6 h-6 shrink-0" />
                                <p className="text-sm font-bold italic">Note the negative sign! This is called Deceleration or Retardation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DataCard({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="bg-slate-50 border-2 border-slate-100 p-4 rounded-3xl text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-xl font-black text-${color}-600`}>{value}</p>
        </div>
    );
}
