import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutGrid, Users, Database, Terminal,
    Activity, Settings, LogOut, ArrowLeft,
    Shield, Globe, ShoppingBag, BarChart2,
    Ticket, Mail, ArrowLeftRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar: React.FC = () => {
    const { logout } = useAuth();

    const sections = [
        {
            title: 'General',
            items: [
                { icon: LayoutGrid, label: 'Overview', path: '/admin', color: 'text-primary', end: true },
                { icon: BarChart2, label: 'Analytics', path: '/admin/analytics', color: 'text-indigo-500' },
            ]
        },
        {
            title: 'Management',
            items: [
                { icon: Users, label: 'Manage Users', path: '/admin/users', color: 'text-blue-500' },
                { icon: ShoppingBag, label: 'Manage Orders', path: '/admin/orders', color: 'text-orange-500' },
                { icon: Database, label: 'Data Plans', path: '/admin/bundles', color: 'text-emerald-500' },
            ]
        },
        {
            title: 'Finance',
            items: [
                { icon: ArrowLeftRight, label: 'Transactions', path: '/admin/transactions', color: 'text-amber-500' },
                { icon: Ticket, label: 'Discounts', path: '/admin/discounts', color: 'text-purple-500' },
            ]
        },
        {
            title: 'System',
            items: [
                { icon: Globe, label: 'Networks', path: '/admin/networks', color: 'text-cyan-500' },
                { icon: Terminal, label: 'API Settings', path: '/admin/developer', color: 'text-slate-500' },
                { icon: Activity, label: 'System Logs', path: '/admin/logs', color: 'text-emerald-400' },
            ]
        },
        {
            title: 'Communication',
            items: [
                { icon: Mail, label: 'Send Email', path: '/admin/email', color: 'text-pink-500' },
                { icon: Settings, label: 'System Settings', path: '/admin/settings', color: 'text-slate-400' },
            ]
        }
    ];

    return (
        <aside className="w-72 bg-white dark:bg-[#0B0F19] border-r border-slate-100 dark:border-white/5 flex flex-col fixed inset-y-0 z-50">
            {/* Branding Section */}
            <div className="p-8 pb-4">
                <Link to="/admin" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900 dark:text-white leading-none">Admin.</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Control Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Menus */}
            <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
                {sections.map((section) => (
                    <div key={section.title} className="space-y-1">
                        <div className="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">
                            {section.title}
                        </div>
                        {section.items.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={(item as any).end}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-4 px-6 py-3 rounded-2xl transition-all duration-300 group",
                                    isActive
                                        ? "bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white shadow-sm border border-slate-100 dark:border-white/10"
                                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                {({ isActive: isItemActive }) => (
                                    <>
                                        <div className={cn(
                                            "p-2 rounded-xl transition-all group-hover:scale-110",
                                            item.color,
                                            "bg-current/10"
                                        )}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                        {isItemActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            {/* Bottom Utility Section */}
            <div className="p-8 pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-black text-xs uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>User Dashboard</span>
                </Link>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-6 py-3 rounded-2xl text-red-500 hover:bg-red-500/5 transition-all font-black text-xs uppercase tracking-widest"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
