import React, { useState } from 'react';

const DETAIL_TEXT = (
  <>
    <p><strong>What we store</strong><br />A random ID (like <code>f47ac10b-…</code>) saved in your browser's local storage.</p>
    <p className="mt-3"><strong>Why</strong><br />We test different product orders to learn what's most useful for the group. Your device is assigned to one version so you see a consistent list each visit.</p>
    <p className="mt-3"><strong>How it relates to your order</strong><br />If you place an order, that random ID is stored alongside it. We can technically link the ID to your name within our own systems, but experiment results are always analyzed as group totals — never by individual.</p>
    <p className="mt-3"><strong>What we never do</strong></p>
    <ul className="list-disc list-inside mt-1 space-y-1">
      <li>Share your data with any third party</li>
      <li>Use the link to profile or target you individually</li>
      <li>Build a record of your browsing or buying habits</li>
    </ul>
    <p className="mt-3"><strong>Opting out</strong><br />Click Decline, or clear your browser's local storage at any time. If no consent is found we serve the default product list and record nothing.</p>
  </>
);

export default function ConsentBanner({ isMobile, onAccept, onDecline }) {
  const [expanded, setExpanded] = useState(false);

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-end justify-center"
        style={{ background: 'rgba(26,21,20,0.48)' }}
      >
        <div
          className="bg-white rounded-t-2xl w-full max-w-[480px] max-h-[88dvh] overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="px-6 py-5 border-b border-brand-border flex-shrink-0">
            <h2 className="font-display text-xl font-bold text-brand-text-primary">About product experiments</h2>
            <p className="mt-1 text-sm text-brand-warm-gray leading-relaxed">
              Panpan uses a random device ID to run product experiments. Data is anonymous and never shared.
            </p>
          </div>
          <div className="overflow-y-auto flex-1 px-6 py-4 text-sm text-brand-text-primary leading-relaxed">
            {DETAIL_TEXT}
          </div>
          <div className="flex flex-col gap-3 px-6 py-4 border-t border-brand-border flex-shrink-0">
            <button
              onClick={onAccept}
              className="w-full py-3 rounded-lg bg-brand-rose text-white text-sm font-semibold hover:bg-brand-terracotta"
            >
              Accept
            </button>
            <button
              onClick={onDecline}
              className="w-full py-3 rounded-lg border border-brand-border text-sm font-medium text-brand-warm-gray bg-white hover:bg-brand-off-white"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block fixed bottom-0 left-0 right-0 z-[200] bg-brand-off-white border-t border-brand-border shadow-[0_-2px_12px_rgba(26,21,20,0.08)]">
      {expanded && (
        <div className="max-w-[800px] mx-auto px-6 pt-4 pb-2 text-sm text-brand-text-primary leading-relaxed border-b border-brand-border">
          {DETAIL_TEXT}
        </div>
      )}
      <div className="flex items-center justify-center gap-4 px-6 py-3 max-w-[800px] mx-auto">
        <p className="text-sm text-brand-text-primary flex-1">
          Panpan uses a random device ID to run product experiments. Data is anonymous and never shared.{' '}
          <button
            onClick={() => setExpanded(e => !e)}
            className="underline text-brand-warm-gray hover:text-brand-text-primary"
          >
            {expanded ? 'Show less' : 'Learn more'}
          </button>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onDecline}
            className="px-4 py-2 rounded-lg border border-brand-border text-sm font-medium text-brand-warm-gray bg-white hover:bg-brand-off-white"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 rounded-lg bg-brand-rose text-white text-sm font-semibold hover:bg-brand-terracotta"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
