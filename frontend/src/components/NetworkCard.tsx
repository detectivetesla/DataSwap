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
    const colors = {
        yellow: 'border-yellow-500/20 hover:border-yellow-500/50 bg-yellow-500/5',
        active_yellow: 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
        red: 'border-red-500/20 hover:border-red-500/50 bg-red-500/5',
        active_red: 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
        blue: 'border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5',
        active_blue: 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    };

    const activeKey = `active_${color}` as keyof typeof colors;

    const logoBgs = {
        yellow: 'bg-[#FFCC00]',
        red: 'bg-[#E60000]',
        blue: 'bg-[#003876]'
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                'cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300',
                isActive ? colors[activeKey] : colors[color]
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
