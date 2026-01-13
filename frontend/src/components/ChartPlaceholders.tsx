import React from 'react';

export const BarChartPlaceholder = () => (
    <div className="w-full h-48 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-end gap-2 p-4">
        {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/40 rounded-t-lg transition-all hover:bg-primary" style={{ height: `${h}%` }} />
        ))}
    </div>
);

export const LineChartPlaceholder = () => (
    <div className="w-full h-64 relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 p-4">
        <svg viewBox="0 0 100 40" className="w-full h-full stroke-primary fill-none stroke-[0.5]">
            <path d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,10 T100,5" className="drop-shadow-lg" />
            <path d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,10 T100,5 L100,40 L0,40 Z" className="fill-primary/10 stroke-none" />
        </svg>
    </div>
);

export const DonutChartPlaceholder = () => (
    <div className="w-48 h-48 relative flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100 dark:stroke-white/5" strokeWidth="3" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="#FFCC00" strokeWidth="4" strokeDasharray="60, 100" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="#E60000" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-60" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="#003876" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-85" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-slate-900 dark:text-white">100%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total</span>
        </div>
    </div>
);
