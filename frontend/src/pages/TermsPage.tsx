import React from 'react';
import Navbar from '@/components/Navbar';

const TermsPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Terms of Service</h1>
                <div className="prose prose-invert text-slate-400 space-y-4">
                    <p>Last updated: January 2026</p>
                    <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
                    <p>By accessing and using EmWeb, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

                    <h2 className="text-xl font-bold text-white">2. Use of Service</h2>
                    <p>You must be at least 18 years old to use our service. You are responsible for maintaining the confidentiality of your account credentials.</p>

                    <h2 className="text-xl font-bold text-white">3. Data Purchases</h2>
                    <p>All data purchases are final. Please double-check the recipient phone number before completing a transaction. We are not responsible for data sent to incorrect numbers entered by the user.</p>

                    <h2 className="text-xl font-bold text-white">4. Wallet Balance</h2>
                    <p>Funds added to the wallet are non-refundable and can only be used for purchasing services on our platform.</p>
                </div>
            </main>
        </div>
    );
};

export default TermsPage;
