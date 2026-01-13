import React from 'react';
import {
    Wallet,
    Zap,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Search,
    Bell,
    Settings,
    MoreHorizontal,
    ArrowUpRight,
    ArrowLeftRight,
    Plus,
    Download
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import { LineChartPlaceholder, DonutChartPlaceholder } from '@/components/ChartPlaceholders';

const Overview: React.FC = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Wallet Balance', value: 'GH₵ 1,250.00', icon: Wallet, color: 'bg-orange-500', trend: '+12.5%' },
        { label: 'Total Orders', value: '145', icon: ShoppingBag, color: 'bg-emerald-500', trend: '+14' },
        { label: 'Pending Orders', value: '3', icon: Clock, color: 'bg-blue-500', trend: '-2' },
        { label: 'Completed Orders', value: '142', icon: CheckCircle2, color: 'bg-purple-500', trend: '+15' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Greeting */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-black text-black dark:text-white mb-1">
                    Good Morning, <span className="text-primary">{user?.fullName?.split(' ')[0] || 'Member'}!</span>
                </h1>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-400 font-bold">Here's what's happening with your account today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Stats and Chart */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-5 md:p-6 rounded-[2rem] bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition-all group border border-slate-100 dark:border-white/10 hover:border-primary/20 relative overflow-hidden">
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="space-y-3 md:space-y-4">
                                        <div className={cn(
                                            "w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                                            stat.color
                                        )}>
                                            <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-2xl md:text-4xl font-black text-black dark:text-white tracking-tight">{stat.value}</p>
                                            <p className="text-[10px] md:text-sm font-black text-slate-700 dark:text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-[10px] font-black tracking-tighter",
                                            stat.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                                        )}>
                                            {stat.trend}
                                        </span>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1 whitespace-nowrap opacity-60">This Month</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart Section */}
                    <div className="p-5 md:p-8 rounded-[2.5rem] bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg md:text-xl font-black text-black dark:text-white">Order Overview</h3>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-bold">Transaction volume (last 30 days)</p>
                            </div>
                            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors shrink-0">
                                <MoreHorizontal className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <LineChartPlaceholder />
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                            <span>04 Jan</span>
                            <span>08 Jan</span>
                            <span>12 Jan</span>
                            <span>16 Jan</span>
                            <span>20 Jan</span>
                            <span>24 Jan</span>
                            <span>28 Jan</span>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="p-5 md:p-8 rounded-[2.5rem] bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 space-y-6">
                        <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
                            <h3 className="text-lg md:text-xl font-black text-black dark:text-white flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-emerald-500" />
                                <span>Recent Orders</span>
                            </h3>
                            <button className="text-[10px] md:text-xs font-black text-primary uppercase tracking-widest hover:underline text-left">View History</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-white/5">
                                        <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Order ID</th>
                                        <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Network / Bundle</th>
                                        <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Recipient</th>
                                        <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                    {[
                                        { id: '#DS-1024', network: 'MTN', logo: '/logos/mtn.png', bundle: '10GB Monthly', recipient: '0244123456', status: 'Completed', statusColor: 'emerald' },
                                        { id: '#DS-1025', network: 'Telecel', logo: '/logos/telecel.png', bundle: '5GB Weekly', recipient: '0207894561', status: 'Pending', statusColor: 'yellow' },
                                        { id: '#DS-1026', network: 'AirtelTigo', logo: '/logos/airteltigo.png', bundle: '2GB Daily', recipient: '0261234567', status: 'Failed', statusColor: 'red' },
                                    ].map((order, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 font-mono text-xs text-slate-400">#DS-102{i + 4}</td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-sm border border-slate-100 flex-shrink-0">
                                                        <img src={order.logo} alt={order.network} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-black dark:text-white">{order.network}</p>
                                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-500">{order.bundle}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{order.recipient}</td>
                                            <td className="py-4 text-right">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                    order.statusColor === 'emerald' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/10" :
                                                        order.statusColor === 'yellow' ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/10" :
                                                            "bg-red-500/10 text-red-600 border-red-500/10"
                                                )}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Side: Distribution and Recent Items */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Distribution Chart */}
                    <div className="p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg md:text-xl font-black text-black dark:text-white">Network Distribution</h3>
                            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                <MoreHorizontal className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="flex justify-center py-4">
                            <DonutChartPlaceholder />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'MTN Ghana', color: 'bg-[#FFCC00]', percent: '60%' },
                                { name: 'Telecel', color: 'bg-[#E60000]', percent: '25%' },
                                { name: 'AirtelTigo', color: 'bg-[#003876]', percent: '15%' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-900 dark:text-white">{item.percent}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Deposits */}
                    <div className="p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg md:text-xl font-black text-black dark:text-white flex items-center gap-2">
                                <Download className="w-5 h-5 text-primary" />
                                <span>Recent Funding</span>
                            </h3>
                            <button className="text-[10px] md:text-xs font-black text-primary uppercase tracking-widest hover:underline">See All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { amount: '100.00', time: '10:30 AM', logo: '/logos/mtn.png', name: 'MTN Mobile Money', bgColor: 'bg-[#FFCC00]' },
                                { amount: '250.00', time: 'Yesterday', logo: '/logos/telecel.png', name: 'Telecel Cash', bgColor: 'bg-[#E60000]' },
                                { amount: '50.00', time: '2 Days Ago', logo: '/logos/airteltigo.png', name: 'AT Money', bgColor: 'bg-[#003876]' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center p-2 shadow-sm border border-slate-100",
                                            item.bgColor
                                        )}>
                                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-black dark:text-white">GH₵ {item.amount}</p>
                                            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-tighter">{item.name}</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Refined Quick Access / Bottom Bar */}
            <div className="p-6 md:p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                    <Zap className="w-64 h-64 fill-white" />
                </div>

                <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center xl:text-left">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight">Quick Actions</h3>
                        <p className="text-slate-400 text-sm md:text-base font-medium max-w-md">Manage your wallet and orders instantly with our streamlined shortcuts.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full xl:w-auto">
                        <button className="flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-primary text-white rounded-[1.5rem] font-black shadow-lg hover:translate-y-[-2px] active:translate-y-0 transition-all group/btn">
                            <Plus className="w-5 h-5 transition-transform group-hover/btn:rotate-90" />
                            <span className="text-sm md:text-base">New Order</span>
                        </button>

                        <button className="flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-white/10 hover:bg-white/20 text-white rounded-[1.5rem] font-black border border-white/10 transition-all hover:translate-y-[-2px] active:translate-y-0">
                            <Download className="w-5 h-5" />
                            <span className="text-sm md:text-base">Fund Wallet</span>
                        </button>

                        <button className="flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-[1.5rem] font-black border border-white/5 transition-all hover:translate-y-[-2px] active:translate-y-0 sm:col-span-2 lg:col-span-1">
                            <ArrowLeftRight className="w-5 h-5" />
                            <span className="text-sm md:text-base">Transactions</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
