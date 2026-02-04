import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock, Trash2, Settings, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import api from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

const Notifications: React.FC = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/notifications');
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.patch('/notifications/read-all');
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const deleteNotification = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await api.delete(`/notifications/${id}`);
            fetchNotifications();
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Real-time
        let channel: any = null;
        if (supabase && user) {
            channel = supabase
                .channel('notifications-page')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => fetchNotifications())
                .subscribe();
        }

        return () => {
            if (channel) supabase?.removeChannel(channel);
        };
    }, [user?.id]);

    const filteredNotifications = notifications.filter(notif => {
        if (activeCategory === 'All') return true;
        // Basic mapping for categories, can be improved
        if (activeCategory === 'Orders' && (notif.title.includes('Order') || notif.title.includes('Purchase'))) return true;
        if (activeCategory === 'Payments' && (notif.title.includes('Wallet') || notif.title.includes('Funded'))) return true;
        return false;
    });

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });
    };
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Notifications</h1>
                    <p className="text-slate-500 font-bold mt-1">Stay updated with your account activity.</p>
                </div>
                <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold text-sm hover:bg-slate-50 transition-all text-slate-600 dark:text-slate-400"
                >
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>Mark all as read</span>
                </button>
            </div>

            {/* Notification Categories */}
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-black/20 rounded-2xl w-fit">
                {['All', 'Orders', 'Payments', 'Security'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            activeCategory === cat ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Updating Stream...</p>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="font-black text-slate-900 dark:text-white mb-1">No notifications found</h4>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stay tuned for updates</p>
                    </div>
                ) : filteredNotifications.map((notif) => (
                    <div
                        key={notif.id}
                        onClick={() => !notif.is_read && markAsRead(notif.id)}
                        className={cn(
                            "bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-all cursor-pointer group",
                            !notif.is_read ? "ring-2 ring-primary/20 bg-primary/5 shadow-lg shadow-primary/5" : "opacity-70"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                            notif.type === 'success' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500" :
                                notif.type === 'error' ? "bg-red-50 dark:bg-red-500/10 text-red-500" :
                                    "bg-blue-50 dark:bg-blue-500/10 text-blue-500"
                        )}>
                            {notif.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                                <h4 className="font-black text-slate-900 dark:text-white tracking-tight">{notif.title}</h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">{formatTime(notif.created_at)}</span>
                                    <button
                                        onClick={(e) => deleteNotification(notif.id, e)}
                                        className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-500">{notif.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="pt-8 flex justify-center">
                <button className="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>View Older Notifications</span>
                </button>
            </div>
        </div>
    );
};

export default Notifications;
