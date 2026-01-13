import React from 'react';
import { Bell, Search, Command, Shield, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const AdminHeader: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-24 px-8 flex items-center justify-between bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 dark:border-white/5">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search users, transactions, logs..."
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm text-slate-900 dark:text-white"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                        <Command className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase">K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        {theme === 'light' ? (
                            <Moon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                        ) : (
                            <Sun className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                        )}
                    </div>
                </button>

                <button className="relative p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                    <Bell className="w-5 h-5 text-slate-500 group-hover:scale-110 transition-transform" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-[#0B0F19]" />
                </button>

                <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-xs font-black text-primary uppercase tracking-wider leading-none mb-1">Administrator</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.fullName || 'Admin User'}</span>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center text-white ring-4 ring-slate-100 dark:ring-white/5 shadow-xl">
                        <Shield className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
