import { motion } from 'framer-motion';
import ChapterFooter from './ChapterFooter';
import DataPlotterActivity from './DataPlotterActivity';
import GraphNavigatorActivity from './GraphNavigatorActivity';
import { LineChart, PieChart, Activity, Sparkles, TrendingUp, ChevronRight, Zap } from 'lucide-react';

function GraphsHeaderAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl mx-auto bg-white/40 backdrop-blur-3xl border-4 border-white/60 p-16 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] mb-16 relative overflow-hidden"
        >
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-200"
                >
                    <LineChart className="w-12 h-12" />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 font-outfit tracking-tighter mb-4">
                    MOTION
                </h1>
                <h2 className="text-8xl md:text-11xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-600 to-violet-600 font-outfit tracking-tighter drop-shadow-2xl">
                    GRAPHS
                </h2>

                <div className="mt-10 flex items-center gap-4 bg-white/80 border-2 border-white px-8 py-4 rounded-full shadow-lg backdrop-blur-xl">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-slate-600 font-black tracking-widest uppercase text-xs">Visualizing Physics In Real-Time</span>
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ChapterThreeOne() {
    return (
        <div className="w-full min-h-screen bg-slate-50/50 pb-20">
            {/* Nav Header Area */}
            <div className="pt-20 px-4">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-5xl mx-auto mb-10 pl-4"
                >
                    <div className="flex items-center gap-4 bg-white/90 border-2 border-white px-8 py-4 rounded-3xl w-fit shadow-xl backdrop-blur-md">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">3</div>
                        <div className="flex flex-col">
                            <h4 className="text-slate-400 font-black tracking-widest uppercase text-[10px] leading-tight">Module 3</h4>
                            <h4 className="text-slate-800 font-black text-lg leading-tight tracking-tight">Unit 1: Motion Graphs</h4>
                        </div>
                    </div>
                </motion.div>

                <GraphsHeaderAnimation />
            </div>

            <div className="max-w-7xl mx-auto px-4">

                {/* Intro Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center my-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-indigo-100">
                            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" /> Insight
                        </div>
                        <h3 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight italic">
                            "A picture is worth a thousand equations."
                        </h3>
                        <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                            Visualizing motion through graphs makes it easier to calculate <span className="text-blue-500 font-bold">speed</span>, <span className="text-rose-500 font-bold">distance</span>, and <span className="text-emerald-500 font-bold">acceleration</span> at a single glance. No more complex text—just lines telling the story of motion!
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-[4rem] blur-2xl opacity-20"></div>
                        <div className="relative bg-white p-6 rounded-[4rem] border-8 border-slate-100 shadow-2xl overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1551288049-bbda4e3a06ad?auto=format&fit=crop&q=80&w=1000" alt="Graph Visualization" className="w-full h-[500px] object-cover rounded-[3rem] transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-12">
                                <div>
                                    <p className="text-white text-3xl font-black mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Digital Analytics</p>
                                    <p className="text-indigo-200 font-bold">Nature is written in graphs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Distance-Time Graph Section */}
                <div className="my-40">
                    <div className="text-center mb-20">
                        <h2 className="text-6xl font-black text-slate-900 tracking-tight mb-6">Distance ⏤ Time Graphs</h2>
                        <div className="w-24 h-2 bg-indigo-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                        <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-100 shadow-xl space-y-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black text-slate-800">The Power of Slope</h4>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                The change in position of an object with time is represented here. Point to remember: <span className="text-blue-600 font-bold">The slope of a Distance-Time graph gives the Speed!</span>
                            </p>
                            <div className="pt-6 border-t-2 border-slate-50 italic text-slate-400 text-sm font-bold">
                                Time (x-axis) vs Distance (y-axis)
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] border-4 border-emerald-100 shadow-xl space-y-6">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                <Activity className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black text-slate-800">Uniform Speed</h4>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                When distance is directly proportional to time, we get a <span className="text-emerald-600 font-bold">straight line</span> passing through the origin.
                            </p>
                            <img src="https://login.skillizee.io/s/articles/69aa9b99afa59631b5110a5b/images/image-20260306144748-1.png" className="w-full rounded-2xl border border-slate-100 mt-4" alt="Uniform Graph" />
                        </div>

                        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl space-y-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16"></div>
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-blue-400">
                                <PieChart className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black">Non-Uniform Speed</h4>
                            <p className="text-lg text-slate-300 font-medium leading-relaxed">
                                Accelerated motion creates a <span className="text-indigo-400 font-bold underline decoration-2 cursor-help">CURVE</span>. This shows speed is constantly changing.
                            </p>
                            <img src="https://login.skillizee.io/s/articles/69aa9b99afa59631b5110a5b/images/image-20260306144748-3.png" className="w-full rounded-2xl brightness-90 mt-4" alt="Non-uniform Graph" />
                        </div>
                    </div>
                </div>

                <DataPlotterActivity />

                {/* Velocity-Time Graphs Section */}
                <div className="my-40">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">
                                Velocity ⏤ Time <br /> Graphs
                            </h2>
                            <p className="text-2xl text-slate-600 font-medium leading-relaxed">
                                Want to know how much distance a car covered just by looking at an image? In a V-T graph, the <span className="text-indigo-600 font-black italic">AREA under the curve</span> is the distance moved!
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center gap-6 group hover:border-indigo-500 transition-all cursor-default">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-1">Slope Represents</h5>
                                        <p className="text-xl font-black text-indigo-600 leading-none">Acceleration</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center gap-6 group hover:border-emerald-500 transition-all cursor-default">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-1">Area Represents</h5>
                                        <p className="text-xl font-black text-emerald-600 leading-none">Displacement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-white p-6 rounded-[4rem] border-8 border-slate-100 shadow-2xl">
                                <img src="https://login.skillizee.io/s/articles/69aa9b99afa59631b5110a5b/images/image-20260306144748-7.png" className="w-full rounded-[3rem]" alt="Velocity-Time" />
                            </div>
                        </div>
                    </div>
                </div>

                <GraphNavigatorActivity />

                {/* Summary Table Section */}
                <div className="my-40 max-w-5xl mx-auto">
                    <div className="bg-white rounded-[4rem] border-4 border-slate-100 shadow-2xl p-16 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600"></div>
                        <h3 className="text-4xl font-black text-slate-900 mb-10 text-center uppercase tracking-tighter italic">Summary of Graph Interpretations</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { type: "Distance-Time", feat: "SLOPE", quant: "SPEED" },
                                { type: "Velocity-Time", feat: "SLOPE", quant: "ACCELERATION" },
                                { type: "Velocity-Time", feat: "AREA UNDER CURVE", quant: "DISPLACEMENT" }
                            ].map((row, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100 text-center group hover:bg-slate-900 hover:text-white transition-all duration-300">
                                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-indigo-400">{row.type}</h5>
                                    <p className="text-lg font-black leading-tight mb-2 italic">"{row.feat}"</p>
                                    <div className="w-8 h-1 bg-slate-200 mx-auto my-4 group-hover:bg-indigo-500"></div>
                                    <p className="text-2xl font-black text-indigo-600 group-hover:text-emerald-400 transition-colors uppercase tracking-tighter">{row.quant}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Questions Section */}
                <div className="my-32 space-y-12">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="h-0.5 flex-1 bg-slate-200"></div>
                        <h3 className="text-4xl font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Knowledge Check</h3>
                        <div className="h-0.5 flex-1 bg-slate-200"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div whileHover={{ y: -10 }} className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl group cursor-help">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-1 rounded-full text-[10px] tracking-widest uppercase">Q1</span>
                                <ChevronRight className="text-slate-200 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 leading-tight">
                                What is the nature of the D-T graphs for uniform and non-uniform motion?
                            </h4>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl group cursor-help">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-emerald-100 text-emerald-700 font-bold px-4 py-1 rounded-full text-[10px] tracking-widest uppercase">Q2</span>
                                <ChevronRight className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 leading-tight">
                                What can you say about motion if the D-T graph is parallel to the time axis?
                            </h4>
                        </motion.div>
                    </div>
                </div>
            </div>

            <ChapterFooter chapterName="Graphs of Motion" />
        </div>
    );
}
