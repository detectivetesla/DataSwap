import React from 'react';
import Button from '@/components/Button';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Bundle {
    id: string;
    name: string;
    data: string;
    price: number;
}

interface BundleModalProps {
    network: string;
    isOpen: boolean;
    onClose: () => void;
}

const BundleModal: React.FC<BundleModalProps> = ({ network, isOpen, onClose }) => {
    const [step, setStep] = React.useState<'select' | 'confirm' | 'success'>('select');
    const [selectedBundle, setSelectedBundle] = React.useState<Bundle | null>(null);
    const [phone, setPhone] = React.useState('');

    const bundles: Bundle[] = [
        { id: '1', name: 'Lite Bundle', data: '1GB', price: 10 },
        { id: '2', name: 'Standard Bundle', data: '5GB', price: 25 },
        { id: '3', name: 'Mega Bundle', data: '15GB', price: 60 },
        { id: '4', name: 'Unlimited Day', data: 'Unlimited', price: 15 },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose} />

            <div className="glass w-full max-w-lg rounded-3xl relative z-10 overflow-hidden shadow-2xl border border-white/10">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{network} Data Bundles</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 'select' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                                {bundles.map((b) => (
                                    <div
                                        key={b.id}
                                        onClick={() => setSelectedBundle(b)}
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                                            selectedBundle?.id === b.id ? "bg-primary/10 border-primary" : "bg-white/5 border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div>
                                            <h3 className="font-bold">{b.name}</h3>
                                            <p className="text-sm text-slate-400">{b.data} Data</p>
                                        </div>
                                        <p className="text-lg font-black text-primary">GH₵ {b.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <Button
                                className="w-full py-4 mt-4"
                                disabled={!selectedBundle}
                                onClick={() => setStep('confirm')}
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    )}

                    {step === 'confirm' && (
                        <div className="space-y-6">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4 shadow-inner">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Bundle</span>
                                    <span className="font-bold">{selectedBundle?.name} ({selectedBundle?.data})</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Network</span>
                                    <span className="font-bold">{network}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-white/10 text-lg">
                                    <span className="font-bold">Total Price</span>
                                    <span className="font-black text-primary">GH₵ {selectedBundle?.price.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Recipient Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="024 XXX XXXX"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setStep('select')}>Back</Button>
                                <Button className="flex-[2]" onClick={() => setStep('success')} disabled={phone.length < 10}>
                                    Pay GH₵ {selectedBundle?.price.toFixed(2)}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Purchase Successful!</h3>
                                <p className="text-slate-400 mt-2">
                                    {selectedBundle?.data} data has been sent to <br />
                                    <span className="text-white font-mono">{phone}</span>
                                </p>
                            </div>
                            <Button className="w-full py-4" onClick={onClose}>Done</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BundleModal;
