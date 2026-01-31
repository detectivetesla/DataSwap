import React from 'react';
import { cn } from '@/utils/cn';

interface NetworkCardProps {
    name: string;
    logo: string;
    color: 'yellow' | 'red' | 'blue';
    isActive?: boolean;
    onClick?: () => void;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ name, logo, color, isActive, onClick }) => {
    const logoBgs = {
        yellow: 'bg-yellow-400',
        red: 'bg-red-500',
        blue: 'bg-blue-600'
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                'cursor-pointer flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                isActive
                    ? `border-${color}-500 shadow-xl shadow-${color}-500/20`
                    : "border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10"
            )}
        >
            <div className={cn(
                "w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mb-4 p-2 shadow-sm border border-slate-100 dark:border-white/10 group-hover:scale-110 transition-transform",
                logoBgs[color]
            )}>
                {logo ? (
                    <img
                        src={logo}
                        alt={name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=random`;
                        }}
                    />
                ) : (
                    <span className="text-2xl font-bold uppercase text-slate-900 dark:text-white">{name[0]}</span>
                )}
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-slate-400 mt-1">Select Network</p>
        </div>
    );
};

export default NetworkCard;
