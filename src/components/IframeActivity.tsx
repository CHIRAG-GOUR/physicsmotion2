import { ExternalLink } from 'lucide-react';

interface IframeActivityProps {
    title: string;
    description: string;
    url: string;
}

export default function IframeActivity({ title, description, url }: IframeActivityProps) {
    return (
        <div className="w-full bg-white rounded-[3.5rem] p-8 md:p-12 border-8 border-slate-100 shadow-xl my-16 overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <span className="bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block shadow-sm border border-sky-200">Interactive Lab</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">{title}</h3>
                    <p className="text-xl text-slate-600 font-medium max-w-3xl leading-relaxed">
                        {description}
                    </p>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sky-600 font-black hover:text-sky-700 hover:bg-sky-100 transition-colors bg-sky-50 px-6 py-4 rounded-2xl border-4 border-sky-100 shadow-sm whitespace-nowrap"
                >
                    <ExternalLink size={24} /> Fullscreen
                </a>
            </div>

            <div className="w-full h-[600px] md:h-[750px] rounded-[2.5rem] overflow-hidden border-8 border-slate-200 shadow-inner relative bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold loading-text animate-pulse">
                    Loading Engine...
                </div>
                <iframe
                    src={url}
                    className="w-full h-full border-0 absolute inset-0 z-10 bg-transparent"
                    allowFullScreen
                    title={title}
                />
            </div>
        </div>
    );
}
