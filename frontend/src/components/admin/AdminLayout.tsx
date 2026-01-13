import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-white dark:bg-[#0B0F19] flex relative"
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
                <AdminSidebar />

                <main className="flex-1 ml-72 flex flex-col min-w-0">
                    <AdminHeader />

                    <div className="p-8 lg:p-12 overflow-y-auto">
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
