import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Settings, Mail, User, Command, PanelLeft, Menu, X, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import api from '@/utils/api';
import { supabase } from '@/utils/supabase';

interface HeaderProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isSidebarOpen: boolean;
    onToggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
    isCollapsed,
    onToggleCollapse,
    isSidebarOpen,
    onToggleMobileMenu
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showMessages, setShowMessages] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
    const messagesRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    const fetchCounts = async () => {
        if (!user) return;
        try {
            const [msgCount, notifCount, msgs, notifs] = await Promise.all([
                api.get('/messages/unread-count'),
                api.get('/notifications/unread-count'),
                api.get('/messages'),
                api.get('/notifications')
            ]);
            setUnreadMessages(msgCount.data.count);
            setUnreadNotifications(notifCount.data.count);
            setRecentMessages(msgs.data.messages.slice(0, 3));
            setRecentNotifications(notifs.data.notifications.slice(0, 3));
        } catch (error) {
            console.error('Failed to fetch header counts:', error);
        }
    };

    useEffect(() => {
        fetchCounts();

        // Real-time via Supabase
        let msgChannel: any = null;
        let notifChannel: any = null;

        if (supabase && user) {
            msgChannel = supabase
                .channel('user-messages')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `user_id=eq.${user.id}` }, () => fetchCounts())
                .subscribe();

            notifChannel = supabase
                .channel('user-notifications')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => fetchCounts())
                .subscribe();
        }

        return () => {
            if (msgChannel) supabase?.removeChannel(msgChannel);
            if (notifChannel) supabase?.removeChannel(notifChannel);
        };
    }, [user?.id]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
                setShowMessages(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 py-2 sm:py-4 px-1 sm:px-2 mb-4 md:mb-6 relative z-40">
            {/* Left Section: Toggles & Search */}
            <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleCollapse}
                        className="hidden lg:flex p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/10 shadow-sm"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <PanelLeft className={cn("w-5 h-5 transition-transform duration-300", isCollapsed && "rotate-180")} />
                    </button>

                    <button
                        onClick={onToggleMobileMenu}
                        className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/10 shadow-sm"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm dark:shadow-none focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10">
                        <Command className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400">K</span>
                    </div>
                </div>
            </div>

            {/* Action Icons & Profile */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto w-full md:w-auto justify-end">
                {/* Messages Dropdown */}
                <div className="relative" ref={messagesRef}>
                    <button
                        onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
                        className={cn(
                            "p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all relative group",
                            showMessages ? "bg-indigo-600 text-white" : "bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-500/20"
                        )}
                        title="Messages"
                    >
                        <Mail className="w-4 h-4 sm:w-5 h-5 group-hover:scale-110 transition-transform" />
                        {unreadMessages > 0 && <span className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-indigo-600 border-2 border-white dark:border-[#0B0F19]" />}
                    </button>

                    {showMessages && (
                        <div className="fixed sm:absolute right-4 sm:right-0 left-4 sm:left-auto mt-3 w-auto sm:w-80 bg-white dark:bg-[#0B0F19] border border-slate-100 dark:border-white/10 rounded-[2rem] shadow-2xl p-4 animate-in zoom-in-95 duration-200 z-50">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h4 className="font-black text-slate-900 dark:text-white tracking-tight">Messages</h4>
                                {unreadMessages > 0 && <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">{unreadMessages} New</span>}
                            </div>
                            <div className="space-y-1 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                                {recentMessages.length === 0 ? (
                                    <p className="p-4 text-[10px] text-center text-slate-400 font-bold uppercase">No messages yet</p>
                                ) : recentMessages.map((msg) => (
                                    <div key={msg.id} className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
                                        <p className={cn("text-xs font-black mb-1", msg.is_read ? "text-slate-500" : "text-slate-900 dark:text-white")}>{msg.title}</p>
                                        <p className="text-[10px] font-bold text-slate-500 line-clamp-1">{msg.content}</p>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/dashboard/inboxes"
                                onClick={() => setShowMessages(false)}
                                className="flex items-center justify-center gap-2 py-3 w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <span>View All Inboxes</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
                        className={cn(
                            "p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all relative group",
                            showNotifications ? "bg-orange-600 text-white" : "bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/20"
                        )}
                        title="Notifications"
                    >
                        <Bell className="w-4 h-4 sm:w-5 h-5 group-hover:scale-110 transition-transform" />
                        {unreadNotifications > 0 && <span className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-600 border-2 border-white dark:border-[#0B0F19]" />}
                    </button>

                    {showNotifications && (
                        <div className="fixed sm:absolute right-4 sm:right-0 left-4 sm:left-auto mt-3 w-auto sm:w-80 bg-white dark:bg-[#0B0F19] border border-slate-100 dark:border-white/10 rounded-[2rem] shadow-2xl p-4 animate-in zoom-in-95 duration-200 z-50">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h4 className="font-black text-slate-900 dark:text-white tracking-tight">Notifications</h4>
                                <Link to="/dashboard/notifications" onClick={() => setShowNotifications(false)} className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">Mark Read</Link>
                            </div>
                            <div className="space-y-1 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                                {recentNotifications.length === 0 ? (
                                    <p className="p-4 text-[10px] text-center text-slate-400 font-bold uppercase">All caught up!</p>
                                ) : recentNotifications.map((notif) => (
                                    <div key={notif.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
                                        <div className={cn(
                                            "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                                            notif.type === 'success' ? "bg-emerald-500/10 text-emerald-500" :
                                                notif.type === 'error' ? "bg-red-500/10 text-red-500" :
                                                    "bg-blue-500/10 text-blue-500"
                                        )}>
                                            {notif.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className={cn("text-xs font-black mb-0.5", notif.is_read ? "text-slate-500" : "text-slate-900 dark:text-white")}>{notif.title}</p>
                                            <p className="text-[10px] font-bold text-slate-500 line-clamp-2">{notif.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/dashboard/notifications"
                                onClick={() => setShowNotifications(false)}
                                className="flex items-center justify-center gap-2 py-3 w-full rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/20 transition-all font-mono"
                            >
                                <span>Show all activity</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <button
                    onClick={() => navigate('/dashboard/settings')}
                    className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 shadow-sm hover:shadow-md hover:bg-violet-200 dark:hover:bg-violet-500/20 hover:translate-y-[-1px] transition-all group"
                    title="Settings"
                >
                    <Settings className="w-4 h-4 sm:w-5 h-5 text-violet-600 dark:text-violet-400 group-hover:rotate-45 transition-transform" />
                </button>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

                <div
                    onClick={() => navigate('/dashboard/profile')}
                    className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 group cursor-pointer"
                >
                    <div className="flex flex-col items-end hidden xs:flex">
                        <span className="text-[10px] font-black text-primary uppercase tracking-tighter leading-none mb-0.5">{user?.role || 'Customer'}</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{user?.fullName?.split(' ')[0]}</span>
                    </div>
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-slate-900 border-2 border-white dark:border-white/10 shadow-lg overflow-hidden shrink-0 group-hover:scale-105 transition-all active:scale-95">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random`}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
