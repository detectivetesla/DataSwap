import React, { useState, useEffect } from 'react';
import { Mail, Search, Filter, Trash2, Archive, Star, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import api from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

const Inboxes: React.FC = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await api.get('/messages');
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/messages/${id}/read`);
            fetchMessages();
        } catch (error) {
            console.error('Failed to mark message as read:', error);
        }
    };

    useEffect(() => {
        fetchMessages();

        // Real-time
        let channel: any = null;
        if (supabase && user) {
            channel = supabase
                .channel('inboxes-page')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `user_id=eq.${user.id}` }, () => fetchMessages())
                .subscribe();
        }

        return () => {
            if (channel) supabase?.removeChannel(channel);
        };
    }, [user?.id]);

    const filteredMessages = messages.filter(msg =>
        msg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    };
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Messages</h1>
                <p className="text-slate-500 font-bold mt-1">Direct communication and system alerts.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-4 pl-16 pr-6 outline-none transition-all font-bold text-sm shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500 hover:text-primary transition-all shadow-sm">
                        <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500 hover:text-red-500 transition-all shadow-sm">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Accessing Vault...</p>
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-6">
                        <Mail className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your inbox is clear</h3>
                    <p className="text-slate-500 font-bold max-w-sm">When you receive messages or important system notifications, they will appear here.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => !msg.is_read && markAsRead(msg.id)}
                                className={cn(
                                    "p-6 flex items-start gap-4 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5",
                                    !msg.is_read ? "bg-indigo-50/30 dark:bg-indigo-500/5 ring-1 ring-inset ring-indigo-500/10" : "opacity-80"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border",
                                    !msg.is_read ? "bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20" : "bg-white dark:bg-white/5 text-slate-400 border-slate-100 dark:border-white/10"
                                )}>
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={cn("font-black text-base tracking-tight truncate", !msg.is_read ? "text-slate-900 dark:text-white" : "text-slate-500")}>
                                            {msg.title}
                                        </h4>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 shrink-0">{formatTime(msg.created_at)}</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 mb-2 truncate">{msg.sender}</p>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inboxes;
