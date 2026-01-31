import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { APP_CONFIG } from '@/config/constants';

interface WhatsAppWidgetProps {
    phoneNumber?: string;
    message?: string;
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
    phoneNumber = APP_CONFIG.SUPPORT_WHATSAPP,
    message = APP_CONFIG.SUPPORT_MESSAGE
}) => {
    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] group">
            {/* Glow Rings */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-40 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700 animate-pulse" />
            <div className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-[2] transition-all duration-1000 animate-ping" />

            <button
                onClick={handleClick}
                className={cn(
                    "relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90",
                    "hover:shadow-[0_0_30px_rgba(37,211,102,0.6)]"
                )}
            >
                <MessageCircle className="w-8 h-8 fill-current" />

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap hidden sm:block">
                    Chat with Us
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </div>
            </button>
        </div>
    );
};

export default WhatsAppWidget;
