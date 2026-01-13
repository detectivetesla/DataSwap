import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Menu, X, Cloud, Zap, PanelLeft } from 'lucide-react';
import { cn } from '@/utils/cn';

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300 font-sans p-2 lg:p-3 gap-3 lg:gap-4">
            {/* Sidebar for Desktop */}
            <Sidebar
                isCollapsed={isCollapsed}
                className={cn(
                    "hidden lg:flex h-[calc(100vh-3rem)] sticky top-6 rounded-[2.5rem] shadow-xl shadow-black/5 transition-all duration-300 ease-in-out overflow-hidden",
                    isCollapsed ? "w-24" : "w-64"
                )}
            />

            {/* Mobile Sidebar Overlay */}
            <div className={cn(
                "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
                isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                <Sidebar
                    className={cn(
                        "relative w-72 h-full transition-transform duration-300 transform",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Unified Global Header */}
                <Header
                    isCollapsed={isCollapsed}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                    isSidebarOpen={isSidebarOpen}
                    onToggleMobileMenu={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-y-auto pt-2">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
