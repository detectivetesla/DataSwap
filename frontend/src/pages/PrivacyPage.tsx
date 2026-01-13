import React from 'react';
import Navbar from '@/components/Navbar';

const PrivacyPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
                <div className="prose prose-invert text-slate-400 space-y-4">
                    <p>Last updated: January 2026</p>
                    <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as your name, email, and phone number when you create an account.</p>

                    <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
                    <p>We use your information to facilitate data purchases, process payments via Paystack, and communicate account-related updates.</p>

                    <h2 className="text-xl font-bold text-white">3. Data Security</h2>
                    <p>We implement industry-standard security measures to protect your personal data. Payment information is securely handled by Paystack according to PCI-DSS standards.</p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPage;
