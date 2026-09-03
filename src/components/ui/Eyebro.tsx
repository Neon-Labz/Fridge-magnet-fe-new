export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[1.8px] text-[#D80000]">
      <span className="h-px w-8 bg-[#EF3A3A]" />
      <span>{children}</span>
      <span className="h-px w-8 bg-[#EF3A3A]" />
    </div>
  );
}