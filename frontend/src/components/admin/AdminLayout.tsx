import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/utils/cn';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div
            className="min-h-screen bg-white dark:bg-[#0B0F19] flex relative overflow-x-hidden"
            style={{
                backgroundImage: 'url("/images/admin/bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-sm pointer-events-none" />

            <div className="relative flex w-full">
                {/* Mobile Sidebar Overlay */}
                <div className={cn(
                    "fixed inset-0 z-[60] lg:hidden transition-opacity duration-300",
                    isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                </div>

                <AdminSidebar
                    className={cn(
                        "lg:translate-x-0 transition-transform duration-300",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    )}
                />

                <main className="flex-1 lg:ml-72 flex flex-col min-w-0 relative z-10">
                    <AdminHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                    <div className="p-4 sm:p-8 lg:p-12 overflow-y-auto">
                        <div className="max-w-[1600px] mx-auto w-full">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
