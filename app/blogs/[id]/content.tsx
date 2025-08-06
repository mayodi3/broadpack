"use client";

interface ContentProps {
  initialHTML: string;
}

export default function Content({ initialHTML }: ContentProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: initialHTML }}
    />
  );
}
