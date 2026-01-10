import React from 'react';
import { Mail, Calendar } from 'lucide-react';

export const StickyFooter: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-brand-surface border-t border-black/5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-3 z-50 md:hidden">
            <div className="flex gap-3">
                <a
                    href="https://reversal.jp/kagoshima"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-surface-alt text-brand-muted font-bold py-3 rounded-md flex flex-col items-center justify-center text-xs gap-1 border border-black/5"
                >
                    <Mail className="w-5 h-5" />
                    資料請求
                </a>
                <a
                    href="https://reversal.jp/kagoshima"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] bg-brand-orange text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 shadow-sm"
                >
                    <Calendar className="w-5 h-5" />
                    無料見学・体験を予約
                </a>
            </div>
        </div>
    );
};
