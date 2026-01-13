import React from 'react';
import { ArrowLeftRight, ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

const Transactions: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-black dark:text-white transition-colors">Transaction History</h1>
                    <p className="text-slate-700 dark:text-slate-400 font-bold">Keep track of all credits and debits on your account.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Transaction ID..."
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
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Type</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Description</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-5 font-black text-slate-700 dark:text-slate-400 text-xs uppercase tracking-wider">Reference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                            {[{ id: 1, status: 'Completed', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
                            { id: 2, status: 'Pending', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' },
                            { id: 3, status: 'Failed', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
                            { id: 4, status: 'Completed', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
                            { id: 5, status: 'Completed', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' }].map((item) => (
                                <tr key={item.id} className="hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {item.id % 2 === 0 ? (
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                                                    <ArrowDownLeft className="w-5 h-5" />
                                                </div>
                                            )}
                                            <span className="font-black text-black dark:text-slate-300">{item.id % 2 === 0 ? 'Credit' : 'Debit'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-black dark:text-slate-300 font-black">
                                        {item.id % 2 === 0 ? 'Wallet Funding via Paystack' : 'Data Bundle Purchase - MTN'}
                                        <div className="mt-1">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                                                item.color
                                            )}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-black">
                                        <span className={item.id % 2 === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                                            {item.id % 2 === 0 ? '+' : '-'} GH₵ {(50 * item.id).toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-tight">2026-01-11 10:30 AM</td>
                                    <td className="px-6 py-5 font-mono text-sm text-slate-400 dark:text-slate-600">TRX-7742189{item.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
