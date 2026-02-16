import React from 'react';
import {
    Settings as SettingsIcon,
    Moon,
    Sun,
    Shield,
    Bell,
    Smartphone,
    ChevronRight,
    Monitor,
    Layout
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/utils/cn';

const Settings: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const sections = [
        {
            title: "Appearance",
            description: "Customize how MaxHub looks on your device.",
            items: [
                {
                    icon: theme === 'dark' ? Moon : Sun,
                    label: "Dark Mode",
                    description: "Switch between light and dark themes",
                    action: (
                        <button
                            onClick={toggleTheme}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-primary transition-colors focus:outline-none"
                        >
                            <span className={cn(
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                theme === 'dark' ? "translate-x-6" : "translate-x-1"
                            )} />
                        </button>
                    )
                },
                {
                    icon: Layout,
                    label: "Compact Mode",
                    description: "Fit more information on your screen",
                    action: <ChevronRight className="w-5 h-5 text-slate-400" />
                }
            ]
        },
        {
            title: "Security",
            description: "Manage your account security and authentication.",
            items: [
                {
                    icon: Shield,
                    label: "Password",
                    description: "Change your account password",
                    action: <ChevronRight className="w-5 h-5 text-slate-400" />
                },
                {
                    icon: Smartphone,
                    label: "Two-Factor Auth",
                    description: "Add an extra layer of security",
                    action: <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">Disabled</span>
                }
            ]
        },
        {
            title: "Notifications",
            description: "Control which alerts you receive.",
            items: [
                {
                    icon: Bell,
                    label: "Email Alerts",
                    description: "Receive updates about your orders",
                    action: <ChevronRight className="w-5 h-5 text-slate-400" />
                }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
            <header className="space-y-1">
                <div className="flex items-center gap-3 text-primary mb-2">
                    <SettingsIcon className="w-6 h-6" />
                    <span className="text-sm font-black uppercase tracking-[0.2em]">Preferences</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white transition-colors">Settings</h1>
                <p className="text-slate-600 dark:text-slate-400 font-bold">Configure your application experience and security.</p>
            </header>

            <div className="space-y-8">
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#1F2937]/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl shadow-black/5">
                        <div className="mb-6">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">{section.title}</h3>
                            <p className="text-sm text-slate-500 font-bold">{section.description}</p>
                        </div>
                        <div className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">{item.label}</p>
                                            <p className="text-[11px] font-bold text-slate-500">{item.description}</p>
                                        </div>
                                    </div>
                                    <div>{item.action}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;
