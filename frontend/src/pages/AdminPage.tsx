import React from 'react';
import {
    Users, Database, Activity, AlertCircle,
    Zap, ChevronRight, BarChart3, TrendingUp,
    Clock, ShieldCheck, Server, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const AdminPage: React.FC = () => {
    const stats = [
        { label: 'Total Users', value: '1,248', growth: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Active Bundles', value: '42', growth: 'Stable', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Daily Revenue', value: '₵12,450', growth: '+8.4%', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'System Uptime', value: '99.9%', growth: 'Optimal', icon: Server, color: 'text-primary', bg: 'bg-primary/10' },
    ];

    const recentActivities = [
        { id: 1, type: 'user', title: 'New User Registered', desc: 'martin@example.com joined as a Dealer', time: '2 mins ago', icon: Users, iconColor: 'text-blue-500' },
        { id: 2, type: 'order', title: 'Large Order Completed', desc: 'MTN 50GB Bundle purchased - ₵240', time: '15 mins ago', icon: Zap, iconColor: 'text-emerald-500' },
        { id: 3, type: 'system', title: 'Maintenance Mode', desc: 'Status updated to: ACTIVE (Normal)', time: '1 hour ago', icon: Settings, iconColor: 'text-slate-500' },
        { id: 4, type: 'security', title: 'Admin Login', desc: 'Auth successful from IP 192.168.1.1', time: '2 hours ago', icon: ShieldCheck, iconColor: 'text-primary' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
                    <p className="text-slate-500 font-bold mt-1">Real-time metrics and system control center.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5 border-4 border-white dark:border-[#0B0F19] flex items-center justify-center text-[10px] font-black">
                                AD
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-[10px] font-black border-4 border-white dark:border-[#0B0F19]">
                            +5
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("p-4 rounded-3xl", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <span className={cn(
                                "text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider",
                                stat.growth.startsWith('+') ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 dark:bg-white/10 text-slate-500"
                            )}>
                                {stat.growth}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
                        <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Trends Chart Placeholder */}
                <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <TrendingUp className="w-64 h-64 text-white" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between min-h-[400px]">
                        <div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Performance Analytics</span>
                            <h2 className="text-3xl font-black text-white mt-2">Transaction Volume</h2>
                            <p className="text-slate-400 font-bold mt-1">Growth of data sales over the last 30 days.</p>
                        </div>

                        {/* Mock Chart Area */}
                        <div className="flex items-end gap-3 h-48 mt-8">
                            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 100, 60, 85].map((h, i) => (
                                <div
                                    key={i}
                                    style={{ height: `${h}%` }}
                                    className="flex-1 bg-white/10 rounded-t-xl group/bar relative"
                                >
                                    <div className="absolute inset-0 bg-primary scale-x-0 group-hover/bar:scale-x-100 transition-transform duration-500 rounded-t-xl origin-bottom opacity-50" />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-8 text-white/40 text-[10px] font-black uppercase tracking-widest">
                            <span>01 Jan 2026</span>
                            <span>13 Jan 2026 (Today)</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[3rem] p-10 space-y-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Recent Activity</h2>
                        <Link to="/admin/logs" className="p-2 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-slate-50 transition-colors">
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex gap-4 group cursor-pointer">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform",
                                    activity.iconColor
                                )}>
                                    <activity.icon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">{activity.title}</h4>
                                    <p className="text-xs font-bold text-slate-500 mb-1">{activity.desc}</p>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                        <Clock className="w-3 h-3" />
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link to="/admin/users" className="block w-full py-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-center text-xs uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:translate-y-[-2px] transition-all">
                        View All Activity
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

