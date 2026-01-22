import React from 'react';
import { ShoppingBag, Search, Filter, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

const Orders: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-black dark:text-white transition-colors">My Orders</h1>
                    <p className="text-slate-700 dark:text-slate-400 font-bold">Track and manage your data bundle purchases.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Order ID or number..."
                            className="pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 focus:border-slate-400 dark:focus:border-primary outline-none transition-all w-full md:w-64 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>
            </header>

            <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden transition-all duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Network</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Bundle</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Recipient</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                            {[{ id: 1, status: 'Completed', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
                            { id: 2, status: 'Processing', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' },
                            { id: 3, status: 'Failed', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
                            { id: 4, status: 'Completed', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
                            { id: 5, status: 'Completed', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' }].map((item) => (
                                <tr key={item.id} className="hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5 font-mono text-sm font-black text-black dark:text-slate-400">#ORD-942{item.id}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                                            <span className="font-black text-black dark:text-slate-300">MTN</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-black text-black dark:text-white">10GB Data - Monthly</td>
                                    <td className="px-6 py-5 text-black dark:text-slate-400 font-black">024412345{item.id}</td>
                                    <td className="px-6 py-5">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border",
                                            item.color
                                        )}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
