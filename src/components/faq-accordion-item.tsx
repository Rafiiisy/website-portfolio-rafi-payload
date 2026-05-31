"use client";

import { useId, useState } from "react";

type Props = {
  question: string;
  answer?: string | null;
  itemKey: string;
};

export function FaqAccordionItem({ question, answer, itemKey }: Props) {
  const uid = useId().replace(/:/g, "");
  const panelId = `faq-panel-${itemKey}-${uid}`;
  const triggerId = `faq-trigger-${itemKey}-${uid}`;
  const [open, setOpen] = useState(false);

  if (!answer) {
    return (
      <div className="faq-item faq-item--static">
        <div className="faq-item__label" id={triggerId}>
          {question}
        </div>
      </div>
    );
  }

  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`} data-state={open ? "open" : "closed"}>
      <button
        type="button"
        className="faq-item__trigger"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        suppressHydrationWarning
        onClick={() => setOpen((v) => !v)}
      >
        {question}
      </button>
      <div id={panelId} className="faq-item__panel-clip" role="region" aria-labelledby={triggerId}>
        <div className="faq-item__panel-inner">
          <div className="faq-answer">{answer}</div>
        </div>
      </div>
    </div>
  );
}
