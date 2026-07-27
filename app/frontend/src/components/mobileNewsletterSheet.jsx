import React, { useEffect, useState } from "react";
import { fetchNewsletter } from '../api/fetchItems';
import parse from 'html-react-parser';

export default function MobileNewsletterSheet({ show, onClose }) {
  const [newsletterContent, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadNewsletter() {
      setIsLoading(true);
      const data = await fetchNewsletter();
      if (data) setContent(JSON.parse(data).Body);
      setIsLoading(false);
    }
    loadNewsletter();
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center md:hidden"
      style={{ background: 'rgba(26,21,20,0.48)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl w-full max-w-[480px] max-h-[88dvh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center flex-shrink-0">
          <h2 className="font-display text-xl font-bold text-brand-text-primary">Newsletter</h2>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-brand-warm-gray"
            style={{ background: '#F0E8E4', border: 'none', lineHeight: 1 }}
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {isLoading ? (
            <p className="text-center text-brand-warm-gray py-10">Loading…</p>
          ) : newsletterContent ? (
            <div className="prose prose-sm max-w-none">
              {parse(newsletterContent)}
            </div>
          ) : (
            <p className="text-center text-brand-warm-gray py-10">No newsletter available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
