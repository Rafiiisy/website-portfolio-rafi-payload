import type React from "react";

type LinkValue = {
  label?: string | null;
  url?: string | null;
  newTab?: boolean | null;
};

type LinkAnchorProps = {
  link?: LinkValue | null;
  className?: string;
  children?: React.ReactNode;
};

export function LinkAnchor({ link, className, children }: LinkAnchorProps) {
  if (!link?.url) return null;

  const target = link.newTab ? "_blank" : undefined;
  const rel = link.newTab ? "noreferrer" : undefined;

  return (
    <a className={className} href={link.url} target={target} rel={rel}>
      {children || link.label}
    </a>
  );
}
