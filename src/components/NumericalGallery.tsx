import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trophy, Sparkles } from 'lucide-react';

type Challenge = {
    id: number;
    question: string;
    answer: string;
    category: string;
};

const puzzles: Challenge[] = [
    { id: 1, category: "Practical", question: "A bus decreases its speed from 80 km h⁻¹ to 60 km h⁻¹ in 5 s. Find the acceleration.", answer: "v = 60 km/h = 16.66 m/s, u = 80 km/h = 22.22 m/s. a = (16.66 - 22.22) / 5 = -1.11 m s⁻²" },
    { id: 2, category: "Logic", question: "What is the quantity measured by the area occupied below the velocity-time graph?", answer: "The magnitude of displacement (distance)." },
    { id: 3, category: "Concept", question: "When is a body said to be in uniform acceleration?", answer: "When velocity changes by equal amounts in equal intervals of time along a straight line." },
    { id: 4, category: "Math", question: "A train starting from a station and moving with uniform acceleration attains 40 km/h in 10 mins. Find its acceleration.", answer: "v = 40 km/h = 11.11 m/s, t = 600s, u = 0. a = 11.11 / 600 = 0.0185 m s⁻²" },
    { id: 5, category: "Strategy", question: "A bus starting from rest moves with a uniform acceleration of 0.1 m s⁻² for 2 minutes. Find the distance travelled.", answer: "u=0, a=0.1, t=120s. s = ut + ½at² = 0 + 0.5 * 0.1 * (120)² = 720 meters." },
    { id: 6, category: "Stopping", question: "A train travelling at 90 km/h applies brakes producing -0.5 m/s² acceleration. How far will it go to rest?", answer: "u=25m/s, v=0, a=-0.5. s = (v² - u²) / 2a = (0 - 625) / -1 = 625 meters." },
    { id: 7, category: "Sliding", question: "A trolley on an incline has an acceleration of 2 cm s⁻². What's its velocity 3s after start?", answer: "u=0, a=2 cm/s², t=3s. v = u + at = 0 + 6 = 6 cm/s." },
    { id: 8, category: "Racing", question: "A racing car has a uniform acceleration of 4 m s⁻². What distance will it cover in 10s after start?", answer: "u=0, a=4, t=10. s = ½at² = 0.5 * 4 * 100 = 200 meters." },
    { id: 9, category: "Space", question: "Starting from rest, an object moves for 10s with 2m/s² acceleration. Find speed acquired.", answer: "v = u + at = 0 + 2*10 = 20 m s⁻¹." },
    { id: 10, category: "Gravity", question: "A stone is thrown up with 5 m/s. Downward acceleration is 10 m/s². What is the max height?", answer: "u=5, v=0, a=-10. s = (v² - u²) / 2a = -25 / -20 = 1.25 meters." }
];

export default function NumericalGallery() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="w-full my-24 px-4">
            <div className="text-center mb-16">
                <span className="bg-amber-100 text-amber-700 px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase">The Physics Arena</span>
                <h3 className="text-5xl font-black text-slate-900 mt-4 mb-4">Numerical Challenge Elite 10</h3>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto">Master the equations of motion by solving these legendary problems. Click any card to reveal the secret solution!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {puzzles.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        onClick={() => setSelected(selected === item.id ? null : item.id)}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`cursor-pointer group relative bg-white rounded-[2.5rem] border-4 transition-all duration-300 overflow-hidden ${selected === item.id
                            ? 'border-indigo-500 shadow-indigo-100 shadow-2xl p-10 ring-4 ring-indigo-50 leading-relaxed'
                            : 'border-slate-100 hover:border-indigo-200 shadow-xl p-8 hover:shadow-2xl'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors px-4 py-1.5 rounded-2xl font-black text-[10px] tracking-widest uppercase border border-slate-100">
                                {item.category}
                            </span>
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 font-black">
                                {item.id}
                            </div>
                        </div>

                        <h4 className={`text-xl font-bold leading-tight transition-colors ${selected === item.id ? 'text-indigo-900 mb-6' : 'text-slate-700'}`}>
                            {item.question}
                        </h4>

                        <AnimatePresence>
                            {selected === item.id ? (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-6 border-t-2 border-indigo-100"
                                >
                                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-3">
                                        <Sparkles className="w-4 h-4" />
                                        Step-by-Step Solution
                                    </div>
                                    <p className="text-slate-600 font-mono text-lg font-bold leading-relaxed bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                                        {item.answer}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                        <Trophy className="w-4 h-4" /> Well Done, Physicist!
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="mt-6 flex items-center gap-2 text-indigo-400 group-hover:text-indigo-600 font-black text-xs uppercase tracking-widest transition-colors">
                                    Reveal Solution <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
