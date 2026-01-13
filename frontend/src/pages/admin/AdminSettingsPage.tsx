import React, { useState } from 'react';
import {
    Settings, AlertCircle, Save, Power,
    Bell, Shield, Monitor, Layout,
    Lock, CheckCircle2, Server, Terminal,
    Database, Activity
} from 'lucide-react';
import { cn } from '@/utils/cn';

const AdminSettingsPage: React.FC = () => {
    const [maintenance, setMaintenance] = useState(false);
    const [publicRegistration, setPublicRegistration] = useState(true);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <header>
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Control</h1>
                </div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] ml-14">Master Configuration Engine</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side - Settings Categories */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[3rem] p-10 space-y-8 shadow-sm h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-[24deg] transition-transform duration-700">
                            <Monitor className="w-64 h-64 text-slate-400" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Configuration</h3>
                                <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">Global State Management</p>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { icon: Layout, label: 'Standard UI', active: true },
                                    { icon: Shield, label: 'Security Protocols' },
                                    { icon: Bell, label: 'Notifications Hub' },
                                    { icon: Lock, label: 'Access Control' },
                                    { icon: Cloud, label: 'Data Sync' }
                                ].map((item, i) => (
                                    <button
                                        key={item.label}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-4 rounded-2xl font-black text-sm transition-all",
                                            item.active
                                                ? "bg-slate-900 text-white shadow-xl shadow-black/10 translate-x-1"
                                                : "text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5", item.active ? "text-primary" : "text-slate-400")} />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Right Side - Settings Panels */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Critical Controls */}
                    <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[3rem] p-10 space-y-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-500">
                            <Power className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span>Critical Infrastructure</span>
                                <div className="px-2 py-0.5 rounded bg-red-500/10 text-[10px] uppercase font-black text-red-500 tracking-widest border border-red-500/20">High Risk</div>
                            </h2>
                            <p className="text-sm font-bold text-slate-500 mt-1">Direct control over user availability and system state.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            {/* Maintenance Toggle */}
                            <div className={cn(
                                "p-8 rounded-[2rem] border-2 transition-all duration-500",
                                maintenance
                                    ? "bg-red-500/10 border-red-500/30 ring-4 ring-red-500/5 shadow-2xl shadow-red-500/10"
                                    : "bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5"
                            )}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                        maintenance ? "bg-red-500 text-white shadow-xl shadow-red-500/30" : "bg-slate-200 dark:bg-white/5 text-slate-400"
                                    )}>
                                        <Server className="w-6 h-6" />
                                    </div>
                                    <button
                                        onClick={() => setMaintenance(!maintenance)}
                                        className={cn(
                                            "w-16 h-8 rounded-full transition-all duration-500 relative bg-slate-200 dark:bg-white/10 overflow-hidden group",
                                            maintenance && "bg-red-500"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-500",
                                            maintenance && "translate-x-8"
                                        )} />
                                    </button>
                                </div>
                                <h4 className="text-lg font-black text-slate-900 dark:text-white">Maintenance Mode</h4>
                                <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed">
                                    When active, the user system will be restricted to "Maintenance" status and all non-admin sessions will be temporarily suspended.
                                </p>
                            </div>

                            {/* Registration Toggle */}
                            <div className={cn(
                                "p-8 rounded-[2rem] border-2 transition-all duration-500",
                                !publicRegistration
                                    ? "bg-amber-500/10 border-amber-500/30 ring-4 ring-amber-500/5 shadow-2xl shadow-amber-500/10"
                                    : "bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5"
                            )}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                        !publicRegistration ? "bg-amber-500 text-white shadow-xl shadow-amber-500/30" : "bg-slate-200 dark:bg-white/5 text-slate-400"
                                    )}>
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <button
                                        onClick={() => setPublicRegistration(!publicRegistration)}
                                        className={cn(
                                            "w-16 h-8 rounded-full transition-all duration-500 relative bg-slate-200 dark:bg-white/10 overflow-hidden group",
                                            !publicRegistration && "bg-amber-500"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-500",
                                            !publicRegistration && "translate-x-8"
                                        )} />
                                    </button>
                                </div>
                                <h4 className="text-lg font-black text-slate-900 dark:text-white">Public Onboarding</h4>
                                <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed">
                                    Control whether new users can register on the landing page. If disabled, new accounts must be manually created by admins.
                                </p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100 dark:border-white/5 relative z-10">
                            <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                <Save className="w-5 h-5 text-primary" />
                                <span>Synchronize State</span>
                            </button>
                        </div>
                    </div>

                    {/* Operational Settings */}
                    <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[3rem] p-10 space-y-8 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Operation Engine</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: 'Webhooks', icon: Activity, status: 'Active' },
                                { icon: Database, label: 'Backup Engine', status: 'Healthy' },
                                { icon: Terminal, label: 'Portal02 Link', status: 'Optimal' },
                            ].map((op) => (
                                <div key={op.label} className="p-6 rounded-2xl bg-slate-50 dark:bg-black/10 border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-3 group hover:border-primary/30 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                        <op.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{op.label}</p>
                                        <div className="flex items-center justify-center gap-1.5 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider font-mono">{op.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;

import { Cloud } from 'lucide-react';
